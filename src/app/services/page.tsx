import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Reveal } from "@/components/motion";
import { CtaBand, ImagePanel, PageHero, SectionTitle } from "@/components/page-parts";
import { services } from "@/lib/site-data";

export const metadata = { title: "Legal Services UAE | NOBEL Legal Consultancy" };

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Legal Services" title="Expertise aligned with the decision in front of you." copy="Comprehensive legal consultancy for businesses and individuals navigating the UAE market." image="/images/contract-review.png" />
      <section className="py-24 md:py-32"><div className="section-shell"><SectionTitle eyebrow="Our Expertise" title="Clear advice across the legal lifecycle." copy="From formation and contracting to risk, compliance, and dispute strategy, our services are structured around practical outcomes." /><div className="mt-14 grid gap-px border border-black/8 bg-black/8 md:grid-cols-2">{services.map((service, index) => { const Icon = service.icon; return <Reveal key={service.title} delay={(index % 2) * .05}><article className="group min-h-72 bg-white p-8 transition-colors hover:bg-[#650018] hover:text-white"><div className="flex items-start justify-between"><Icon className="size-7 text-[#6a001a] group-hover:text-[#d8aeba]" strokeWidth={1.4} /><span className="font-display text-4xl text-black/5 group-hover:text-white/10">{String(index + 1).padStart(2, "0")}</span></div><h2 className="font-display mt-10 text-2xl">{service.title}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-black/50 group-hover:text-white/55">{service.text}</p><ArrowRight className="mt-7 size-4 opacity-0 transition-opacity group-hover:opacity-100" /></article></Reveal>; })}</div></div></section>
      <section className="bg-[#eeeae6] py-24 md:py-32"><div className="section-shell grid gap-12 lg:grid-cols-2 lg:items-center"><ImagePanel src="/images/office-team.jpeg" alt="NOBEL legal team" className="aspect-[4/3]" /><div><SectionTitle eyebrow="How We Work" title="From legal question to controlled action." /><div className="mt-9 space-y-6">{["Understand the facts, objective, and commercial context.", "Assess legal exposure, documents, and available options.", "Present a clear strategy with priorities and practical next steps.", "Support implementation and remain available as matters evolve."].map((item, index) => <div key={item} className="flex gap-4"><CheckCircle2 className="mt-1 size-5 shrink-0 text-[#6a001a]" /><div><p className="text-xs font-bold tracking-[.12em] text-black/35">STEP {index + 1}</p><p className="mt-1 text-sm leading-7 text-black/60">{item}</p></div></div>)}</div></div></div></section>
      <CtaBand />
    </>
  );
}
