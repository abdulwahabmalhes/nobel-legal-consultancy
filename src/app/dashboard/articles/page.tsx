"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { Check, Edit3, ImagePlus, Loader2, Lock, Plus, Send, Sparkles, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { articles as initialArticles, type Article } from "@/lib/articles";

type PublishState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

type FormValues = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
};

const emptyForm = (date: string): FormValues => ({
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "Legal Insight",
  author: "Abdulwahab Malhes",
  date,
  readTime: "5 min read",
  image: "",
});

export default function ArticleDashboardPage() {
  const [password, setPassword] = useState("");
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [state, setState] = useState<PublishState>({ status: "idle" });

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [formValues, setFormValues] = useState<FormValues>(() => emptyForm(today));
  const isEditing = Boolean(formValues.slug);

  function updateField(field: keyof FormValues, value: string) {
    setFormValues((current) => ({ ...current, [field]: value }));
  }

  function resetForm() {
    setFormValues(emptyForm(today));
    setImageDataUrl("");
    setImageName("");
    setState({ status: "idle" });
  }

  function editArticle(article: Article) {
    setFormValues({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      author: article.author,
      date: article.date,
      readTime: article.readTime,
      image: article.image,
    });
    setImageDataUrl("");
    setImageName("");
    setState({ status: "idle" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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

    try {
      const response = await fetch("/api/admin/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          ...formValues,
          imageDataUrl,
          imageName,
        }),
      });
      const result = (await response.json()) as { message?: string; article?: Article };

      if (!response.ok) {
        throw new Error(result.message || "Publishing failed.");
      }

      if (result.article) {
        setArticles((current) => [result.article!, ...current.filter((item) => item.slug !== result.article!.slug)]);
      }

      setState({
        status: "success",
        message: result.message || "Article saved. Vercel will redeploy from GitHub.",
      });
      resetForm();
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Publishing failed.",
      });
    }
  }

  async function deleteArticle(article: Article) {
    if (!password) {
      setState({ status: "error", message: "Enter the dashboard password first." });
      return;
    }

    const confirmed = window.confirm(`Delete "${article.title}"? This will publish the deletion to GitHub.`);

    if (!confirmed) {
      return;
    }

    setState({ status: "loading" });

    try {
      const response = await fetch(`/api/admin/articles?slug=${encodeURIComponent(article.slug)}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Delete failed.");
      }

      setArticles((current) => current.filter((item) => item.slug !== article.slug));
      if (formValues.slug === article.slug) {
        resetForm();
      }
      setState({ status: "success", message: result.message || "Article deleted." });
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Delete failed.",
      });
    }
  }

  return (
    <section className="min-h-screen bg-[#11090b] pb-24 pt-36 text-white">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <span className="eyebrow !text-[#dfadba]">NOBEL Dashboard</span>
            <h1 className="font-display mt-5 text-5xl leading-[1.05] md:text-6xl">
              Manage legal articles.
            </h1>
            <p className="mt-6 text-sm leading-7 text-white/55">
              Add, edit, or delete articles. Each saved change updates GitHub and Vercel redeploys the live site.
            </p>
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-sm leading-7 text-white/55">
              <p className="flex items-center gap-2 font-semibold text-white">
                <Sparkles className="size-4 text-[#dfadba]" />
                Publishing requirements
              </p>
              <p className="mt-4">
                Vercel needs <code>ADMIN_PASSWORD</code> and <code>GITHUB_TOKEN</code>. The password protects this panel;
                the token lets the dashboard commit article changes.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold tracking-[0.18em] text-white/60">CURRENT ARTICLES</h2>
                <button type="button" onClick={resetForm} className="inline-flex items-center gap-2 text-xs font-semibold text-[#dfadba]">
                  <Plus className="size-4" />
                  New
                </button>
              </div>
              {articles.map((article) => (
                <article key={article.slug} className="grid grid-cols-[88px_1fr] gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="relative h-24 overflow-hidden rounded-2xl bg-black/30">
                    <Image src={article.image} alt={article.title} fill sizes="88px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-[0.6rem] font-bold tracking-[0.16em] text-[#dfadba]">{article.category.toUpperCase()}</p>
                    <h3 className="mt-2 text-sm font-semibold leading-5 text-white">{article.title}</h3>
                    <p className="mt-1 text-xs text-white/35">{article.date}</p>
                    <div className="mt-3 flex gap-2">
                      <button type="button" onClick={() => editArticle(article)} className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white">
                        <Edit3 className="size-3" />
                        Edit
                      </button>
                      <button type="button" onClick={() => deleteArticle(article)} className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-3 py-2 text-xs font-semibold text-red-200">
                        <Trash2 className="size-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="rounded-[2rem] bg-[#f7f6f3] p-6 text-[#11090b] shadow-[0_30px_120px_rgba(0,0,0,.35)] md:p-9">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-[#4a0012]/60">
                  {isEditing ? "EDIT ARTICLE" : "NEW ARTICLE"}
                </p>
                <h2 className="font-display mt-2 text-3xl">{isEditing ? "Update article" : "Publish article"}</h2>
              </div>
              {isEditing && (
                <button type="button" onClick={resetForm} className="grid size-10 place-items-center rounded-full border border-black/10">
                  <X className="size-4" />
                </button>
              )}
            </div>

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
                <input required value={formValues.title} onChange={(event) => updateField("title", event.target.value)} className="form-field" placeholder="Example: New UAE Commercial Law Update" />
              </label>
              <label className="form-label">
                Category
                <input required value={formValues.category} onChange={(event) => updateField("category", event.target.value)} className="form-field" />
              </label>
              <label className="form-label">
                Date
                <input required type="date" value={formValues.date} onChange={(event) => updateField("date", event.target.value)} className="form-field" />
              </label>
              <label className="form-label">
                Author
                <input required value={formValues.author} onChange={(event) => updateField("author", event.target.value)} className="form-field" />
              </label>
              <label className="form-label">
                Read time
                <input required value={formValues.readTime} onChange={(event) => updateField("readTime", event.target.value)} className="form-field" />
              </label>
              <label className="form-label md:col-span-2">
                Article image {isEditing && <span className="text-black/35">(optional when editing)</span>}
                <div className="mt-2 grid gap-4 border border-dashed border-black/20 bg-white p-4 md:grid-cols-[140px_1fr]">
                  <div className="relative h-32 overflow-hidden bg-[#11090b]">
                    {(imageDataUrl || formValues.image) && (
                      <Image src={imageDataUrl || formValues.image} alt="" fill sizes="140px" className="object-cover" />
                    )}
                  </div>
                  <div className="flex min-h-32 cursor-pointer flex-col items-center justify-center text-center">
                    <ImagePlus className="size-8 text-[#4a0012]" />
                    <span className="mt-3 text-sm font-semibold">{imageName || "Upload article image"}</span>
                    <span className="mt-1 text-xs text-black/40">PNG, JPG, or WebP</span>
                    <input required={!isEditing} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImage} className="sr-only" />
                  </div>
                </div>
              </label>
              <label className="form-label md:col-span-2">
                Short summary
                <textarea required value={formValues.excerpt} onChange={(event) => updateField("excerpt", event.target.value)} rows={3} className="form-field resize-none py-4" />
              </label>
              <label className="form-label md:col-span-2">
                Full article text
                <textarea required value={formValues.content} onChange={(event) => updateField("content", event.target.value)} rows={10} className="form-field resize-none py-4" />
              </label>
            </div>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button type="submit" size="lg" disabled={state.status === "loading"}>
                {state.status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                {isEditing ? "Save Changes" : "Publish Article"}
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
