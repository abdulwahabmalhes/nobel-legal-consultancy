import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";

export function PageHero({ eyebrow, title, copy, image }: { eyebrow: string; title: string; copy: string; image: string }) {
  return (
    <section className="relative flex min-h-[650px] items-end overflow-hidden bg-[#171012] pb-20 pt-32 text-white md:min-h-[720px] md:pb-28">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,8,10,.92),rgba(16,8,10,.63)_48%,rgba(16,8,10,.2))]" />
      <div className="noise absolute inset-0 opacity-10" />
      <div className="section-shell relative">
        <Reveal className="max-w-3xl">
          <span className="eyebrow !text-[#dfadba]">{eyebrow}</span>
          <h1 className="font-display mt-6 text-balance text-5xl leading-[1.04] md:text-7xl">{title}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 md:text-lg">{copy}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return <Reveal className="max-w-3xl"><span className={`eyebrow ${light ? "!text-[#dfadba]" : ""}`}>{eyebrow}</span><h2 className={`font-display mt-5 text-balance text-4xl leading-[1.08] md:text-5xl ${light ? "text-white" : ""}`}>{title}</h2>{copy && <p className={`mt-6 max-w-2xl text-base leading-8 ${light ? "text-white/55" : "text-black/52"}`}>{copy}</p>}</Reveal>;
}

export function ImagePanel({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <div className={`relative overflow-hidden ${className}`}><Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" /></div>;
}

export function CtaBand() {
  return <section className="bg-[#6a001a] py-20 text-white"><div className="section-shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="text-xs font-semibold tracking-[0.2em] text-white/55">CONFIDENTIAL CONSULTATION</p><h2 className="font-display mt-3 text-3xl md:text-4xl">Clarity begins with a conversation.</h2></div><Button asChild variant="light" size="lg"><Link href="/contact#consultation">Book a Consultation <ArrowRight className="size-4" /></Link></Button></div></section>;
}
