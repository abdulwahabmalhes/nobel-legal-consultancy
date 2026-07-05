import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";

import { CtaBand } from "@/components/page-parts";
import { articles, formatArticleDate, getArticleBySlug } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | NOBEL Legal Consultancy`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <article className="bg-[#f7f6f3] pb-24 pt-40 md:pb-32">
        <div className="section-shell">
          <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-semibold text-black/45 hover:text-[#4a0012]">
            <ArrowLeft className="size-4" />
            Back to articles
          </Link>
          <div className="mt-10 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="relative aspect-[4/4.4] overflow-hidden bg-[#11090b] shadow-[0_30px_90px_rgba(17,9,11,.16)]">
              <Image src={article.image} alt={article.title} fill priority sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover" />
            </div>
            <div>
              <span className="eyebrow">{article.category}</span>
              <h1 className="font-display mt-6 text-balance text-4xl leading-[1.08] text-[#11090b] md:text-6xl">
                {article.title}
              </h1>
              <div className="mt-7 flex flex-wrap items-center gap-4 text-xs font-semibold tracking-[0.08em] text-black/38">
                <span className="flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  {formatArticleDate(article.date)}
                </span>
                <span>{article.readTime}</span>
                <span>By {article.author}</span>
              </div>
              <p className="mt-9 text-xl leading-9 text-black/58">{article.excerpt}</p>
              <div className="mt-10 border-t border-black/10 pt-10 text-base leading-8 text-black/62">
                {article.content.split("\n").map((paragraph) => (
                  <p key={paragraph} className="mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
