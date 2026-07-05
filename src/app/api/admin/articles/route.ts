import { NextResponse } from "next/server";

import type { Article } from "@/lib/articles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type GithubContent = {
  content: string;
  sha: string;
};

type ArticlePayload = {
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author?: string;
  date?: string;
  readTime?: string;
  imageDataUrl?: string;
  imageName?: string;
};

const articlesPath = "src/content/articles.json";

export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const providedPassword = request.headers.get("x-admin-password");

  if (!adminPassword) {
    return NextResponse.json(
      { message: "ADMIN_PASSWORD is not configured on Vercel." },
      { status: 500 },
    );
  }

  if (!providedPassword || providedPassword !== adminPassword) {
    return NextResponse.json({ message: "Invalid dashboard password." }, { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT;
  const owner = process.env.GITHUB_OWNER || "abdulwahabmalhes";
  const repo = process.env.GITHUB_REPO || "nobel-legal-consultancy";
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token) {
    return NextResponse.json(
      { message: "GITHUB_TOKEN is not configured on Vercel." },
      { status: 500 },
    );
  }

  const payload = (await request.json()) as ArticlePayload;
  const required = ["title", "excerpt", "content", "category", "author", "date", "readTime"] as const;

  for (const key of required) {
    if (!payload[key]?.trim()) {
      return NextResponse.json({ message: `Missing field: ${key}` }, { status: 400 });
    }
  }

  if (!payload.imageDataUrl?.startsWith("data:image/")) {
    return NextResponse.json({ message: "Article image is required." }, { status: 400 });
  }

  const slug = createSlug(payload.title!);
  const image = await publishImage({
    token,
    owner,
    repo,
    branch,
    slug,
    dataUrl: payload.imageDataUrl,
    imageName: payload.imageName,
  });

  const articlesFile = await getGithubFile({ token, owner, repo, branch, path: articlesPath });
  const currentArticles = JSON.parse(
    Buffer.from(articlesFile.content, "base64").toString("utf8"),
  ) as Article[];

  const article: Article = {
    slug,
    title: payload.title!.trim(),
    excerpt: payload.excerpt!.trim(),
    content: payload.content!.trim(),
    category: payload.category!.trim(),
    author: payload.author!.trim(),
    date: payload.date!.trim(),
    readTime: payload.readTime!.trim(),
    image,
  };

  const nextArticles = [article, ...currentArticles.filter((item) => item.slug !== slug)];

  await putGithubFile({
    token,
    owner,
    repo,
    branch,
    path: articlesPath,
    sha: articlesFile.sha,
    message: `Publish article: ${article.title}`,
    content: Buffer.from(`${JSON.stringify(nextArticles, null, 2)}\n`, "utf8").toString("base64"),
  });

  return NextResponse.json({
    message: "Article published to GitHub. Vercel will deploy the updated site.",
    slug,
  });
}

function createSlug(title: string) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);

  return `${base || "article"}-${new Date().toISOString().slice(0, 10)}`;
}

async function publishImage({
  token,
  owner,
  repo,
  branch,
  slug,
  dataUrl,
}: {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  slug: string;
  dataUrl: string;
  imageName?: string;
}) {
  const match = dataUrl.match(/^data:image\/(png|jpeg|jpg|webp);base64,(.+)$/);

  if (!match) {
    throw new Error("Unsupported image type.");
  }

  const extension = match[1] === "jpeg" ? "jpg" : match[1];
  const content = match[2];
  const path = `public/images/articles/${slug}.${extension}`;

  await putGithubFile({
    token,
    owner,
    repo,
    branch,
    path,
    message: `Upload article image: ${slug}`,
    content,
  });

  return `/images/articles/${slug}.${extension}`;
}

async function getGithubFile({
  token,
  owner,
  repo,
  branch,
  path,
}: {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  path: string;
}) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
    {
      headers: githubHeaders(token),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Could not read ${path} from GitHub.`);
  }

  return (await response.json()) as GithubContent;
}

async function putGithubFile({
  token,
  owner,
  repo,
  branch,
  path,
  message,
  content,
  sha,
}: {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  path: string;
  message: string;
  content: string;
  sha?: string;
}) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: githubHeaders(token),
    body: JSON.stringify({
      message,
      content,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Could not publish ${path}. ${body}`);
  }
}

function githubHeaders(token: string) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}
