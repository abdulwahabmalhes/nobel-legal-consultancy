"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, Menu, MessageCircle, Send, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navigation } from "@/lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#171012]/90 py-3 text-white backdrop-blur-xl">
        <div className="section-shell flex items-center justify-between">
          <Link href="/" className="relative h-16 w-24 shrink-0" aria-label="NOBEL Legal Consultancy home">
            <Image
              src="/images/nobel-logo-transparent.png"
              alt="NOBEL Legal Consultancy"
              fill
              priority
              sizes="96px"
              className="object-contain"
            />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[0.67rem] font-semibold tracking-[0.12em] transition-colors ${
                  pathname === item.href ? "text-[#dfadba]" : "text-white/68 hover:text-white"
                }`}
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
          </nav>
          <Button asChild size="sm" variant="light" className="hidden lg:inline-flex">
            <Link href="/contact#consultation">BOOK A CONSULTATION</Link>
          </Button>
          <button onClick={() => setOpen(true)} className="grid size-11 place-items-center rounded-full border border-white/20 lg:hidden" aria-label="Open menu">
            <Menu className="size-5" />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[90] bg-[#15090c] text-white" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.4 }}>
            <div className="section-shell flex h-full flex-col py-6">
              <div className="flex justify-between">
                <span className="font-display text-2xl">NOBEL</span>
                <button onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-full border border-white/20" aria-label="Close menu"><X className="size-5" /></button>
              </div>
              <nav className="my-auto flex flex-col gap-5">
                {navigation.map((item, index) => (
                  <motion.div key={item.href} initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                    <Link href={item.href} onClick={() => setOpen(false)} className="font-display text-4xl">{item.label}</Link>
                  </motion.div>
                ))}
              </nav>
              <Button asChild size="lg"><Link href="/contact#consultation" onClick={() => setOpen(false)}>Book a Consultation</Link></Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#151515] pt-20 text-white">
      <div className="section-shell grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_1fr_1fr]">
          <div>
            <div className="relative h-48 w-40">
              <Image
                src="/images/nobel-logo-transparent.png"
                alt="NOBEL Legal Consultancy"
                fill
                sizes="160px"
                className="object-contain"
              />
            </div>
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/42">Strategic legal guidance for businesses and individuals across the UAE.</p>
          <p className="font-display mt-4 text-lg italic text-[#c9a6af]">Excellence Defined by Law</p>
        </div>
        <FooterGroup title="Company" items={navigation.slice(1)} />
        <FooterGroup title="Expertise" items={[{ label: "Corporate Advisory", href: "/services" }, { label: "Contracts", href: "/services" }, { label: "Commercial Law", href: "/services" }, { label: "Compliance", href: "/services" }]} />
        <div>
          <h3 className="text-xs font-bold tracking-[0.16em] text-white/72">CONTACT</h3>
          <div className="mt-6 space-y-4 text-sm leading-6 text-white/42">
            <p>SPC Free Zone<br />Sharjah, UAE</p>
            <a href="tel:+971552270676" className="block hover:text-white">+971 55 227 0676</a>
            <a href="mailto:info@nobellegal.ae" className="block hover:text-white">info@nobellegal.ae</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/8"><div className="section-shell flex flex-col gap-3 py-6 text-[0.65rem] text-white/30 sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} NOBEL Legal Consultancy.</p><p>English · Arabic-ready architecture</p></div></div>
    </footer>
  );
}

function FooterGroup({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return <div><h3 className="text-xs font-bold tracking-[0.16em] text-white/72">{title.toUpperCase()}</h3><div className="mt-6 space-y-3">{items.map((item) => <Link key={item.label} href={item.href} className="block text-sm text-white/42 hover:text-white">{item.label}</Link>)}</div></div>;
}

export function FloatingActions() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); event.currentTarget.reset(); setSent(true); };

  return (
    <>
      <button onClick={() => setInquiryOpen(true)} className="fixed bottom-24 right-5 z-40 flex items-center gap-2 rounded-full bg-[#1c1c1c] px-4 py-3 text-xs font-semibold text-white shadow-2xl md:bottom-6 md:right-24"><Sparkles className="size-4 text-[#d9aab6]" /><span className="hidden sm:inline">Legal Inquiry</span></button>
      <a href="https://wa.me/971552270676" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl"><MessageCircle className="size-6" /></a>
      <AnimatePresence>
        {inquiryOpen && (
          <motion.div className="fixed inset-0 z-[100] flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={() => setInquiryOpen(false)} aria-label="Close inquiry" />
            <motion.aside className="relative h-full w-full max-w-lg overflow-y-auto bg-[#f7f6f3] p-7 md:p-10" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}>
              <div className="flex justify-between"><div><span className="eyebrow">Legal Inquiry</span><h2 className="font-display mt-5 text-3xl">How can we assist?</h2></div><button onClick={() => setInquiryOpen(false)} className="grid size-10 place-items-center rounded-full border border-black/10"><X className="size-4" /></button></div>
              <p className="mt-6 bg-[#eee9e5] p-4 text-xs leading-6 text-black/55">Share the general nature of your matter. Avoid sending highly sensitive details at this stage.</p>
              <form onSubmit={submit} className="mt-8 grid gap-5">
                <label className="form-label">Full name<input required className="form-field" /></label>
                <label className="form-label">Email or phone<input required className="form-field" /></label>
                <label className="form-label">Your inquiry<textarea required rows={7} className="form-field resize-none py-4" /></label>
                <Button type="submit" size="lg">Submit Inquiry <Send className="size-4" /></Button>
                {sent && <p className="flex items-center gap-2 text-sm font-semibold text-[#6a001a]"><Check className="size-4" /> Inquiry received.</p>}
              </form>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return <><SiteHeader /><main>{children}</main><SiteFooter /><FloatingActions /></>;
}
