import { ArrowUpRight, BookOpen } from "lucide-react";

import { Reveal } from "@/components/motion";
import { CtaBand, PageHero, SectionTitle } from "@/components/page-parts";
import { insights } from "@/lib/site-data";

export const metadata = { title: "Legal Insights UAE | NOBEL Legal Consultancy" };

export default function InsightsPage() {
  return (
    <>
      <PageHero eyebrow="Legal Insights" title="Perspective for better decisions." copy="Practical observations on legal, regulatory, and business issues affecting the UAE market." image="/images/legal-insights.png" />
      <section className="py-24 md:py-32"><div className="section-shell"><SectionTitle eyebrow="Latest Thinking" title="Clarity beyond the headline." copy="Our insights are designed for decision-makers who need the practical significance, not only the legal update." /><div className="mt-14 grid gap-px border border-black/8 bg-black/8 md:grid-cols-2 lg:grid-cols-3">{insights.map((article, index) => <Reveal key={article.title} delay={(index % 3) * .06}><article className="group flex min-h-[370px] flex-col bg-white p-8 transition-colors hover:bg-[#650018] hover:text-white"><div className="flex items-center justify-between"><span className="text-[.62rem] font-bold tracking-[.16em] text-[#6a001a] group-hover:text-[#d8aeba]">{article.category.toUpperCase()}</span><BookOpen className="size-5 text-black/20 group-hover:text-white/30" strokeWidth={1.4} /></div><h2 className="font-display mt-12 text-2xl leading-8">{article.title}</h2><p className="mt-4 text-sm leading-7 text-black/48 group-hover:text-white/55">{article.excerpt}</p><div className="mt-auto flex items-center justify-between pt-8 text-xs text-black/38 group-hover:text-white/45"><span>{article.read}</span><ArrowUpRight className="size-4" /></div></article></Reveal>)}</div></div></section>
      <section className="bg-[#eeeae6] py-24"><div className="section-shell"><div className="mx-auto max-w-3xl text-center"><SectionTitle eyebrow="NOBEL Briefing" title="Legal perspective, delivered with purpose." copy="A future publication channel for concise UAE legal updates, business risk observations, and practical guidance." /><form className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row"><input type="email" required placeholder="Business email address" className="form-field flex-1" /><button className="h-12 bg-[#6a001a] px-6 text-sm font-semibold text-white">Subscribe</button></form></div></div></section>
      <CtaBand />
    </>
  );
}
