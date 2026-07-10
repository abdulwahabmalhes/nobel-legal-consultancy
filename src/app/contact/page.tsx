"use client";

import { FormEvent, useState } from "react";
import { CalendarDays, Check, Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { PageHero, SectionTitle } from "@/components/page-parts";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/site-data";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); event.currentTarget.reset(); setSent(true); };
  return (
    <>
      <PageHero eyebrow="Contact NOBEL" title="Start with a confidential conversation." copy="Tell us how we can assist. Our team will respond to arrange the right next step." image="/images/reception.jpeg" />
      <section className="py-24 md:py-32"><div className="section-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><SectionTitle eyebrow="Our Office" title="Professional guidance, within reach." /><div className="mt-10 space-y-7"><ContactLine icon={MapPin} label="Office Location" value="SPC Free Zone - Sharjah, UAE" /><ContactLine icon={Phone} label="Landline" value="+971 6 550 4556" href="tel:+97165504556" /><ContactLine icon={Mail} label="Email" value="info@nobellegal.ae" href="mailto:info@nobellegal.ae" /><ContactLine icon={Clock3} label="Working Hours" value="Monday - Friday, 8:00 AM - 6:00 PM" /></div><div className="mt-10 flex flex-wrap gap-3"><Button asChild><a href="tel:+97165504556"><Phone className="size-4" /> Call</a></Button><Button asChild variant="ghost" className="border border-black/10"><a href="https://wa.me/971552270676"><MessageCircle className="size-4" /> WhatsApp</a></Button></div></div><div id="consultation" className="scroll-mt-28 bg-[#eeeae6] p-6 md:p-10"><h2 className="font-display text-3xl">Free Consultation</h2><p className="mt-3 text-sm leading-7 text-black/50">Provide a brief outline and your preferred date. We will contact you to confirm availability.</p><form onSubmit={submit} className="mt-8 grid gap-4 md:grid-cols-2"><label className="form-label">Full name<input required className="form-field" /></label><label className="form-label">Phone number<input required type="tel" className="form-field" placeholder="+971" /></label><label className="form-label">Email address<input required type="email" className="form-field" /></label><label className="form-label">Preferred date<input required type="date" className="form-field" /></label><label className="form-label md:col-span-2">Area of support<select required defaultValue="" className="form-field"><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label><label className="form-label md:col-span-2">Brief summary<textarea rows={5} className="form-field resize-none py-4" /></label><div className="md:col-span-2"><Button type="submit" size="lg">Request Free Consultation <CalendarDays className="size-4" /></Button></div>{sent && <p className="flex items-center gap-2 text-sm font-semibold text-[#4a0012] md:col-span-2"><Check className="size-4" /> Thank you. Your request has been received.</p>}</form></div></div></section>
      <section className="h-[480px] bg-[#ddd]"><iframe title="NOBEL location" src="https://www.google.com/maps?q=SPC+Free+Zone+Sharjah+UAE&output=embed" width="100%" height="100%" className="border-0 grayscale-[.4]" loading="lazy" /></section>
    </>
  );
}

function ContactLine({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: string; href?: string }) {
  const content = <><Icon className="mt-1 size-6 text-[#4a0012]" strokeWidth={1.4} /><div><p className="text-[.62rem] font-bold tracking-[.15em] text-black/35">{label.toUpperCase()}</p><p className="mt-2 text-sm font-semibold">{value}</p></div></>;
  return href ? <a href={href} className="flex gap-4 hover:text-[#4a0012]">{content}</a> : <div className="flex gap-4">{content}</div>;
}
