"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { Check, ImagePlus, Loader2, Lock, Send, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

type PublishState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export default function ArticleDashboardPage() {
  const [password, setPassword] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [state, setState] = useState<PublishState>({ status: "idle" });

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  async function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setImageDataUrl("");
      setImageName("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageDataUrl(String(reader.result));
      setImageName(file.name);
    };
    reader.readAsDataURL(file);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "loading" });

    const form = new FormData(event.currentTarget);
    const payload = {
      title: String(form.get("title") || ""),
      excerpt: String(form.get("excerpt") || ""),
      content: String(form.get("content") || ""),
      category: String(form.get("category") || "Legal Insight"),
      author: String(form.get("author") || "NOBEL Legal Consultancy"),
      date: String(form.get("date") || today),
      readTime: String(form.get("readTime") || "5 min read"),
      imageDataUrl,
      imageName,
    };

    try {
      const response = await fetch("/api/admin/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Publishing failed.");
      }

      setState({
        status: "success",
        message: result.message || "Article published. Vercel will redeploy from GitHub.",
      });
      event.currentTarget.reset();
      setImageDataUrl("");
      setImageName("");
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Publishing failed.",
      });
    }
  }

  return (
    <section className="min-h-screen bg-[#11090b] pb-24 pt-36 text-white">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <span className="eyebrow !text-[#dfadba]">NOBEL Dashboard</span>
            <h1 className="font-display mt-5 text-5xl leading-[1.05] md:text-6xl">
              Publish legal articles with a premium structure.
            </h1>
            <p className="mt-6 text-sm leading-7 text-white/55">
              Add a title, image, date, category, short summary, and full article text. The permanent publishing
              workflow commits the article to GitHub, then Vercel redeploys the site.
            </p>
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-sm leading-7 text-white/55">
              <p className="flex items-center gap-2 font-semibold text-white">
                <Sparkles className="size-4 text-[#dfadba]" />
                Required environment variables
              </p>
              <p className="mt-4">
                Set <code>ADMIN_PASSWORD</code> and <code>GITHUB_TOKEN</code> on Vercel. Optional defaults:
                <code> GITHUB_OWNER</code>, <code>GITHUB_REPO</code>, <code>GITHUB_BRANCH</code>.
              </p>
            </div>
          </div>

          <form onSubmit={submit} className="rounded-[2rem] bg-[#f7f6f3] p-6 text-[#11090b] shadow-[0_30px_120px_rgba(0,0,0,.35)] md:p-9">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="form-label md:col-span-2">
                Dashboard password
                <div className="relative mt-2">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-black/30" />
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="form-field pl-11"
                    placeholder="ADMIN_PASSWORD"
                  />
                </div>
              </label>
              <label className="form-label md:col-span-2">
                Article title
                <input required name="title" className="form-field" placeholder="Example: New UAE Commercial Law Update" />
              </label>
              <label className="form-label">
                Category
                <input required name="category" className="form-field" placeholder="Commercial Law" />
              </label>
              <label className="form-label">
                Date
                <input required name="date" type="date" defaultValue={today} className="form-field" />
              </label>
              <label className="form-label">
                Author
                <input required name="author" defaultValue="Abdulwahab Malhes" className="form-field" />
              </label>
              <label className="form-label">
                Read time
                <input required name="readTime" defaultValue="5 min read" className="form-field" />
              </label>
              <label className="form-label md:col-span-2">
                Article image
                <div className="mt-2 flex min-h-36 cursor-pointer flex-col items-center justify-center border border-dashed border-black/20 bg-white p-6 text-center">
                  <ImagePlus className="size-8 text-[#4a0012]" />
                  <span className="mt-3 text-sm font-semibold">{imageName || "Upload article image"}</span>
                  <span className="mt-1 text-xs text-black/40">PNG, JPG, or WebP</span>
                  <input required type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImage} className="sr-only" />
                </div>
              </label>
              <label className="form-label md:col-span-2">
                Short summary
                <textarea required name="excerpt" rows={3} className="form-field resize-none py-4" placeholder="A short SEO-friendly summary for the article card." />
              </label>
              <label className="form-label md:col-span-2">
                Full article text
                <textarea required name="content" rows={10} className="form-field resize-none py-4" placeholder="Write the article body here. Use a new line for each paragraph." />
              </label>
            </div>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button type="submit" size="lg" disabled={state.status === "loading"}>
                {state.status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                Publish Article
              </Button>
              {state.status === "success" && (
                <p className="flex items-center gap-2 text-sm font-semibold text-[#4a0012]">
                  <Check className="size-4" />
                  {state.message}
                </p>
              )}
              {state.status === "error" && <p className="text-sm font-semibold text-red-700">{state.message}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
