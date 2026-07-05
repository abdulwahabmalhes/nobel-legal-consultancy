import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";

import { Reveal } from "@/components/motion";
import { CtaBand, PageHero, SectionTitle } from "@/components/page-parts";
import { articles, formatArticleDate } from "@/lib/articles";

export const metadata = {
  title: "Legal Articles UAE | NOBEL Legal Consultancy",
  description:
    "Legal articles and practical UAE business guidance from NOBEL Legal Consultancy.",
};

export default function ArticlesPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal Articles"
        title="Useful legal thinking for UAE decision-makers."
        copy="Articles with practical guidance, dates, images, and structured content for stronger SEO visibility."
        image="/images/legal-insights.png"
      />
      <section className="bg-[#f7f6f3] py-24 md:py-32">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Publication Desk"
            title="Latest articles from NOBEL."
            copy="A premium article library designed for legal visibility, client education, and search performance."
          />
          <div className="mt-14 grid gap-7 lg:grid-cols-3">
            {articles.map((article, index) => (
              <Reveal key={article.slug} delay={(index % 3) * 0.06}>
                <Link
                  href={`/articles/${article.slug}`}
                  className="group flex h-full flex-col overflow-hidden bg-white shadow-[0_24px_70px_rgba(17,9,11,.08)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#11090b]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11090b]/65 to-transparent" />
                    <span className="absolute left-5 top-5 bg-white/90 px-3 py-2 text-[0.62rem] font-bold tracking-[0.15em] text-[#4a0012]">
                      {article.category.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.08em] text-black/38">
                      <CalendarDays className="size-4" />
                      {formatArticleDate(article.date)}
                    </div>
                    <h2 className="font-display mt-6 text-2xl leading-8 text-[#11090b]">
                      {article.title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-black/52">{article.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-6 text-xs font-semibold text-black/40">
                      <span>{article.author}</span>
                      <span className="flex items-center gap-2 text-[#4a0012]">
                        Read Article <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
