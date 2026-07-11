"use client";

import { motion } from "framer-motion";
import { EmailField } from "./Hero";

const EASE = [0.23, 1, 0.32, 1] as const;

const LINK_COLUMNS: { heading: string; links: string[] }[][] = [
  [
    {
      heading: "Website",
      links: ["Home", "Pricing", "Careers", "Affiliate program", "Partner program"],
    },
    {
      heading: "Grow & Earn",
      links: ["Email marketing", "Payments", "Branded App", "Analytics"],
    },
  ],
  [
    {
      heading: "Community",
      links: ["Discussions", "Courses", "Events", "Chats", "Customization", "Gamification"],
    },
  ],
  [
    {
      heading: "AI & Automation",
      links: [
        "AI Agents",
        "Community AI",
        "Workflows",
        "Integrations",
        "AI Workflows",
        "Headless",
        "Website builder",
      ],
    },
  ],
  [
    {
      heading: "Learn more",
      links: [
        "Blog",
        "Customer stories",
        "Event hub",
        "Community Launch Guide",
        "Community ROI calculator",
        "Community GPT",
        "Circle Academy",
      ],
    },
  ],
  [
    {
      heading: "Get help",
      links: [
        "Community",
        "Knowledge base",
        "Customer success",
        "Payment migration",
        "Email migration",
        "Course migration",
        "Circle experts",
      ],
    },
  ],
];

const SOCIALS = [
  { src: "/footer/x.svg", alt: "X", href: "https://x.com/circleapp" },
  {
    src: "/footer/linkedin.svg",
    alt: "LinkedIn",
    href: "https://www.linkedin.com/company/circleco",
  },
  {
    src: "/footer/youtube.svg",
    alt: "YouTube",
    href: "https://www.youtube.com/@circleapp",
  },
  {
    src: "/footer/instagram.svg",
    alt: "Instagram",
    href: "https://www.instagram.com/circleapp/",
  },
];

const COMPLIANCE_BADGES = [
  {
    id: "soc2",
    icon: "/footer/badges/soc2.png",
    iconClassName: "h-[40px] w-[30px] object-contain",
    lines: ["SOC2", "Certified"] as const,
  },
  {
    id: "gdpr",
    icon: "/footer/badges/gdpr.png",
    iconClassName: "h-[40px] w-[41px] object-contain",
    lines: ["GDPR", "Compliant"] as const,
  },
  {
    id: "ccpa",
    icon: "/footer/badges/ccpa.png",
    iconClassName: "h-[40px] w-[40px] object-contain",
    lines: ["CCPA", "Compliant"] as const,
  },
  {
    id: "pci",
    icon: "/footer/badges/pci.png",
    iconClassName: "h-[40px] w-[40px] object-contain",
    lines: ["PCI DSS", "Compliant"] as const,
  },
];

function ComplianceBadges() {
  return (
    <div
      className="flex items-center justify-end gap-[32px]"
      aria-label="Compliance certifications"
    >
      {COMPLIANCE_BADGES.map((badge) => (
        <div key={badge.id} className="flex items-center gap-[8px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={badge.icon}
            alt=""
            className={`shrink-0 ${badge.iconClassName}`}
          />
          <p className="text-[10px] font-medium uppercase leading-[12px] text-white">
            <span className="block">{badge.lines[0]}</span>
            <span className="block">{badge.lines[1]}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

function LinkGroup({ heading, links }: { heading: string; links: string[] }) {
  return (
    <div className="flex w-[160px] flex-col gap-[16px]">
      <p className="text-subheading-sm font-bold uppercase text-[#fafafa]">
        {heading}
      </p>
      <div className="flex flex-col gap-[16px]">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="text-label-md text-[#d4d4d4] transition-colors duration-200 hover:text-white"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#010b17]">
      {/* Full-bleed sunrise — fades into dark before the link columns */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/footer/sunrise.jpg"
        alt=""
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[1100px] w-full object-cover object-[center_30%] [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]"
      />
      {/* Black fade mesh — bridges sunrise into the dark footer links */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[480px] z-[1] h-[700px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(1,11,23,0) 0%, rgba(1,11,23,0.35) 35%, rgba(1,11,23,0.85) 70%, #010b17 100%)",
        }}
      />

      {/* Content locked to 1200 */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col px-[30px]">
        {/* Top CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-160px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="flex w-full flex-col items-center gap-[48px] px-[30px] pb-[160px] pt-[220px]"
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: EASE },
              },
            }}
            className="font-display text-title-h1 text-center text-white"
          >
            A platform gives you tools.
            <br />
            Circle gives you an ecosystem.
          </motion.h2>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: EASE },
              },
            }}
          >
            <EmailField />
          </motion.div>
        </motion.div>

        {/* Bottom content — in normal flow so nothing gets clipped */}
        <div className="flex w-full flex-col pb-[48px] pt-[40px]">
          <div className="flex flex-col gap-[80px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/footer/circle-logo.svg"
              alt="Circle"
              className="h-[52px] w-[181px]"
            />
            <div className="flex w-full items-end justify-between">
              <div className="flex items-center gap-[32px]">
                {SOCIALS.map((s) => (
                  <a
                    key={s.alt}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.alt}
                    className="transition-opacity hover:opacity-70"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.src} alt={s.alt} className="size-[32px]" />
                  </a>
                ))}
              </div>
              <ComplianceBadges />
            </div>
            <div className="flex w-full flex-wrap items-start gap-x-[48px] gap-y-[36px]">
              {LINK_COLUMNS.map((groups, i) => (
                <div key={i} className="flex flex-col gap-[36px]">
                  {groups.map((g) => (
                    <LinkGroup key={g.heading} {...g} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[40px] flex w-full flex-wrap items-center justify-between gap-[16px] border-t border-[#262626] py-[32px]">
            <p className="text-label-sm text-[#d4d4d4]">
              © 2026 Circle. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-[32px]">
              <div className="text-label-sm flex flex-wrap items-center gap-[20px] text-[#d4d4d4]">
                <span>99.9% Uptime</span>
                <span className="size-[4px] rounded-full bg-[#5c5c5c]" />
                <a href="#" className="transition-colors hover:text-white">
                  Privacy Policy
                </a>
                <span className="size-[4px] rounded-full bg-[#5c5c5c]" />
                <a href="#" className="transition-colors hover:text-white">
                  Terms
                </a>
                <span className="size-[4px] rounded-full bg-[#5c5c5c]" />
                <a href="#" className="transition-colors hover:text-white">
                  Cookie Policy
                </a>
              </div>
              <button className="text-label-sm flex items-center gap-[4px] text-[#d4d4d4] hover:text-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/footer/usflag.svg" alt="" className="size-[16px]" />
                English
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6.5 8.5l3.5 3.5 3.5-3.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
