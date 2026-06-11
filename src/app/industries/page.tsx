import { ArrowUpRight, Building, Factory, HeartPulse, Laptop, Rocket, ShoppingBag } from "lucide-react";

import { Reveal } from "@/components/motion";
import { CtaBand, ImagePanel, PageHero, SectionTitle } from "@/components/page-parts";
import { industries } from "@/lib/site-data";

export const metadata = { title: "Industries We Serve | NOBEL Legal Consultancy" };

export default function IndustriesPage() {
  return (
    <>
      <PageHero eyebrow="Industries We Serve" title="Legal thinking attuned to your market." copy="Sector awareness helps legal advice move beyond the document and into the commercial reality around it." image="/images/uae-business.png" />
      <section className="py-24 md:py-32"><div className="section-shell"><SectionTitle eyebrow="Sector Experience" title="Different industries. One disciplined standard." copy="We adapt our legal analysis to the operating model, pace, stakeholder pressures, and risk profile of each client." /><div className="mt-14 grid gap-px border border-black/8 bg-black/8 md:grid-cols-2">{industries.map(([title, text], index) => <Reveal key={title} delay={(index % 2) * .05}><article className="group flex min-h-56 flex-col bg-white p-7 transition-colors hover:bg-[#f0ebe8]"><div className="flex justify-between"><span className="font-display text-sm text-[#6a001a]/45">{String(index + 1).padStart(2, "0")}</span><ArrowUpRight className="size-4 text-[#6a001a] opacity-0 transition-opacity group-hover:opacity-100" /></div><h2 className="font-display mt-9 text-2xl">{title}</h2><p className="mt-3 text-sm leading-7 text-black/50">{text}</p></article></Reveal>)}</div></div></section>
      <section className="bg-[#1c1c1c] py-24 text-white md:py-32"><div className="section-shell grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div><SectionTitle light eyebrow="UAE Market Perspective" title="Local context is part of the legal answer." copy="Operating successfully in the UAE requires attention to legal form, commercial practice, regulatory expectations, and the pace of a rapidly developing market." /><div className="mt-10 grid grid-cols-2 gap-8">{[[Building, "Established enterprises"], [Rocket, "High-growth ventures"], [HeartPulse, "Regulated sectors"], [Laptop, "Digital businesses"]].map(([Icon, label]) => <div key={label as string}><Icon className="size-6 text-[#d8aeba]" strokeWidth={1.4} /><p className="mt-3 text-sm text-white/60">{label as string}</p></div>)}</div></div><ImagePanel src="/images/boardroom.png" alt="Corporate boardroom" className="aspect-[4/4.5]" /></div></section>
      <CtaBand />
    </>
  );
}
