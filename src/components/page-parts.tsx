import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";

export function PageHero({ eyebrow, title, copy, image }: { eyebrow: string; title: string; copy: string; image: string }) {
  return (
    <section className="relative flex min-h-[680px] items-end overflow-hidden bg-[#10090b] pb-16 pt-36 text-white md:min-h-[720px] md:pb-28 md:pt-32">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,5,6,.94),rgba(16,8,10,.72)_48%,rgba(16,8,10,.26))]" />
      <div className="noise absolute inset-0 opacity-10" />
      <div className="section-shell relative">
        <Reveal className="max-w-3xl">
          <span className="eyebrow !text-[#dfadba]">{eyebrow}</span>
          <h1 className="font-display mt-6 text-balance text-4xl leading-[1.06] sm:text-5xl md:text-7xl">{title}</h1>
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
  return <section className="relative overflow-hidden bg-[#4a0012] py-20 text-white"><div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.08),transparent_62%)] md:block" /><div className="section-shell relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="text-xs font-semibold tracking-[0.2em] text-white/55">FREE CONSULTATION</p><h2 className="font-display mt-3 text-3xl md:text-4xl">Clarity begins with a conversation.</h2></div><Button asChild variant="light" size="lg"><Link href="/contact#consultation">Free Consultation <ArrowRight className="size-4" /></Link></Button></div></section>;
}
