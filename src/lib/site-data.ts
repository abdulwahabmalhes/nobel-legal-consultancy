import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  FileCheck2,
  FilePenLine,
  Handshake,
  Landmark,
  ReceiptText,
  Scale,
  SearchCheck,
  Users,
} from "lucide-react";

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const services = [
  { icon: Building2, title: "Corporate Legal Consultancy", text: "Strategic counsel for governance, transactions, shareholder matters, and day-to-day corporate decisions." },
  { icon: BriefcaseBusiness, title: "Business Setup Advisory", text: "Practical guidance across UAE mainland, free zone, ownership, and operational structures." },
  { icon: FilePenLine, title: "Contract Review & Drafting", text: "Clear, commercially sound agreements designed to allocate risk and protect your position." },
  { icon: Landmark, title: "Commercial Law", text: "Measured advice for commercial relationships, obligations, transactions, and opportunities." },
  { icon: Scale, title: "Civil Law Consultation", text: "Confidential assessment of rights, liabilities, remedies, documentation, and next steps." },
  { icon: Users, title: "Labor Law Consultation", text: "UAE employment guidance for employers, executives, professionals, and internal HR teams." },
  { icon: FileCheck2, title: "Legal Documentation", text: "Accurate preparation and review of formal notices, policies, resolutions, and legal documents." },
  { icon: Handshake, title: "Dispute Resolution", text: "Commercially focused strategies that prioritize control, negotiation, and efficient resolution." },
  { icon: ReceiptText, title: "Judicial Enforcement & Debt Collection", text: "Support with enforcement files, debt recovery, execution procedures, settlement follow-up, and creditor protection." },
  { icon: BadgeCheck, title: "Regulatory Compliance", text: "Proactive support to align business operations with applicable UAE requirements." },
  { icon: SearchCheck, title: "Legal Risk Assessment", text: "Early identification of exposure with practical, prioritized mitigation strategies." },
];

export const industries = [
  ["Corporate Businesses", "Governance, contracts, compliance, expansion, and ongoing strategic legal support."],
  ["SMEs", "Practical advice calibrated to the pace, resources, and growth plans of established SMEs."],
  ["Startups", "Founder arrangements, commercial contracts, risk controls, and scalable legal foundations."],
  ["Investors", "Legal due diligence, transaction support, structuring considerations, and risk visibility."],
  ["Real Estate", "Commercial arrangements, documentation, stakeholder obligations, and dispute strategy."],
  ["Construction", "Contract review, project risk, payment matters, notices, and commercial disputes."],
  ["Healthcare", "Operational agreements, employment matters, documentation, and compliance awareness."],
  ["Retail", "Supplier, lease, employment, consumer-facing, and commercial relationship support."],
  ["Technology", "SaaS, licensing, data-facing contracts, vendor terms, and emerging business models."],
  ["Professional Services", "Engagement terms, liability controls, governance, and client relationship frameworks."],
];

export const insights = [
  { category: "Corporate", author: "Abdulwahab Malhes", title: "Five Legal Considerations Before Expanding Your UAE Business", excerpt: "Expansion creates opportunity, but structure, authority, contracts, and compliance should move at the same pace.", read: "6 min read" },
  { category: "Contracts", author: "Abdulwahab Malhes", title: "Why Commercial Contracts Should Be Reviewed Before Renewal", excerpt: "A familiar contract can still carry outdated risks, unclear obligations, and terms that no longer fit the relationship.", read: "4 min read" },
  { category: "Debt Collection", author: "Abdulwahab Malhes", title: "Judicial Enforcement and Debt Collection in the UAE", excerpt: "Effective debt recovery depends on documentation, execution strategy, settlement discipline, and timely follow-up.", read: "7 min read" },
  { category: "Compliance", author: "Abdulwahab Malhes", title: "Building a Practical Legal Risk Framework for Growing Companies", excerpt: "A useful legal risk framework gives management visibility without turning every decision into a legal exercise.", read: "7 min read" },
  { category: "Employment", author: "Abdulwahab Malhes", title: "Executive Employment Agreements: Clauses That Deserve Closer Attention", excerpt: "Senior appointments require precision around authority, incentives, confidentiality, termination, and post-employment duties.", read: "5 min read" },
  { category: "Disputes", author: "Abdulwahab Malhes", title: "When Early Legal Assessment Changes the Direction of a Dispute", excerpt: "The right assessment at the beginning can preserve evidence, improve leverage, and avoid expensive procedural mistakes.", read: "6 min read" },
  { category: "Business Setup", author: "Abdulwahab Malhes", title: "Mainland or Free Zone: Looking Beyond the Initial Setup", excerpt: "The right structure should reflect where the company will operate, contract, hire, grow, and raise capital.", read: "5 min read" },
];
