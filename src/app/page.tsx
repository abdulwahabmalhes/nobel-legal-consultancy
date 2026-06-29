import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Globe2, Handshake, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/motion";
import { CtaBand, ImagePanel, SectionTitle } from "@/components/page-parts";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#10090b] pt-28 text-white md:pt-24">
        <Image src="/images/boardroom.png" alt="Premium legal consultancy boardroom" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,5,6,.96),rgba(18,9,11,.78)_48%,rgba(18,9,11,.30))]" />
        <div className="noise absolute inset-0 opacity-10" />
        <div className="section-shell relative py-24">
          <Reveal className="max-w-3xl">
            <span className="eyebrow !text-[#dfadba]">Excellence Defined by Law</span>
            <h1 className="font-display mt-7 text-balance text-4xl leading-[1.04] sm:text-6xl lg:text-[5.2rem]">Strategic legal counsel for <span className="silver-text italic">decisive moments.</span></h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/65 md:text-lg">Trusted legal guidance for businesses and individuals in the UAE, built on experience, integrity, and results.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg"><Link href="/contact#consultation">Free Consultation <ArrowRight className="size-4" /></Link></Button><Button asChild size="lg" variant="outline"><Link href="/services">Explore Expertise</Link></Button></div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="section-shell grid gap-14 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <div>
            <SectionTitle eyebrow="NOBEL Legal Consultancy" title="Legal insight with a commercial point of view." copy="We help clients navigate the UAE legal environment with advice that is rigorous, practical, and built around the decision in front of them." />
            <Reveal delay={0.1}><Button asChild variant="ghost" className="mt-8 border border-black/10"><Link href="/about">Discover our approach <ArrowRight className="size-4" /></Link></Button></Reveal>
          </div>
          <ImagePanel src="/images/office-team.jpeg" alt="NOBEL office team" className="aspect-[4/3]" />
        </div>
      </section>

      <section className="bg-[#1c1c1c] py-24 text-white md:py-32">
        <div className="section-shell">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><SectionTitle light eyebrow="Core Expertise" title="Focused advice. Practical outcomes." copy="A selected view of our legal consultancy services for UAE businesses and individuals." /><Button asChild variant="outline"><Link href="/services">All services <ArrowRight className="size-4" /></Link></Button></div>
          <div className="mt-14 grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((service, index) => { const Icon = service.icon; return <Reveal key={service.title} delay={index * 0.06}><article className="group min-h-72 bg-[#1c1c1c] p-7 transition-colors hover:bg-[#4a0012]"><Icon className="size-7 text-[#d8aeba]" strokeWidth={1.4} /><h3 className="font-display mt-12 text-xl">{service.title}</h3><p className="mt-4 text-sm leading-7 text-white/45 group-hover:text-white/65">{service.text}</p></article></Reveal>; })}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="section-shell grid gap-6 lg:grid-cols-2">
          <ImagePanel src="/images/boardroom.png" alt="Executive legal boardroom" className="min-h-[520px]" />
          <div className="bg-[#eeeae6] p-8 md:p-14">
            <SectionTitle eyebrow="Why NOBEL" title="Counsel designed around confidence." />
            <div className="mt-10 grid gap-7 sm:grid-cols-2">
              {[[Globe2, "UAE Market Expertise"], [ShieldCheck, "Professional Integrity"], [Clock3, "Responsive Guidance"], [Handshake, "Long-Term Partnership"]].map(([Icon, title]) => <div key={title as string}><Icon className="size-6 text-[#4a0012]" strokeWidth={1.4} /><h3 className="font-display mt-4 text-lg">{title as string}</h3><p className="mt-2 text-sm leading-6 text-black/48">Clear legal thinking grounded in real commercial context.</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#4a0012] py-24 text-white">
        <div className="section-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <ImagePanel src="/images/hassan-al-wazir.jpeg" alt="Hassan Al Wazir" className="aspect-square" />
          <Reveal><p className="font-display text-3xl leading-[1.5] md:text-4xl">“Our commitment is not only to deliver professional consultancy services, but to become a trusted strategic partner for every client we serve.”</p><p className="mt-8 text-sm font-semibold tracking-[0.14em] text-white/55">HASSAN AL WAZIR · SENIOR LEGAL CONSULTANT</p></Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32"><div className="section-shell"><SectionTitle eyebrow="At a Glance" title="A relationship built for the long term." /><div className="mt-12 grid gap-px border border-black/8 bg-black/8 sm:grid-cols-2 lg:grid-cols-4">{[["15+", "Years of Experience"], ["450+", "Satisfied Clients"], ["1,200+", "Consultations"], ["180+", "Corporate Clients"]].map(([value, label]) => <div key={label} className="bg-white p-8"><p className="font-display text-4xl text-[#4a0012]">{value}</p><p className="mt-3 text-xs font-semibold tracking-[0.12em] text-black/45">{label.toUpperCase()}</p></div>)}</div></div></section>
      <CtaBand />
    </>
  );
}
