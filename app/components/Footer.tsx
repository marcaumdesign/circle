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
  ],
  [
    {
      heading: "Community",
      links: ["Discussions", "Courses", "Events", "Chats", "Customization", "Gamification"],
    },
    {
      heading: "Grow & Earn",
      links: ["Email marketing", "Payments", "Branded App", "Analytics"],
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
  { src: "/footer/x.svg", alt: "X" },
  { src: "/footer/linkedin.svg", alt: "LinkedIn" },
  { src: "/footer/youtube.svg", alt: "YouTube" },
  { src: "/footer/instagram.svg", alt: "Instagram" },
];

function LinkGroup({ heading, links }: { heading: string; links: string[] }) {
  return (
    <div className="flex w-[160px] flex-col gap-[16px]">
      <p className="text-[14px] font-bold uppercase leading-[20px] tracking-[0.7px] text-[#fafafa]">
        {heading}
      </p>
      <div className="flex flex-col gap-[16px]">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="text-[16px] font-medium leading-[20px] tracking-[-0.25px] text-[#d4d4d4] transition-colors duration-200 hover:text-white"
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
    <footer className="relative h-[1572px] w-full overflow-hidden bg-[#010b17]">
      <div className="relative mx-auto h-full w-[1440px]">
        {/* Sunrise image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer/sunrise.jpg"
          alt=""
          className="absolute left-0 top-[92px] h-[1041px] w-[1440px] max-w-none"
        />
        {/* Fade to dark over the sunrise */}
        <div className="absolute left-0 top-[491px] h-[1093px] w-full bg-gradient-to-b from-transparent from-[3.4%] to-[#010b17] to-[57.7%]" />
        {/* Purple dome arc */}
        <div className="absolute left-[-242px] top-0 h-[184px] w-[1926px] rounded-[1000px] bg-[#15084a]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer/ellipse-glow.svg"
          alt=""
          className="absolute left-[-165px] top-[38px] h-[676px] w-[1922px] max-w-none"
        />

        {/* Top CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-160px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="absolute left-1/2 top-[269px] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[48px]"
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
            }}
            className="font-display whitespace-nowrap text-center text-[64px] font-medium leading-[64px] tracking-[-1.5px] text-white"
          >
            A platform gives you tools.
            <br />
            Circle gives you an ecosystem.
          </motion.h2>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
            }}
          >
            <EmailField />
          </motion.div>
        </motion.div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 flex w-full flex-col px-[120px] py-[80px]">
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
                  <a key={s.alt} href="#" aria-label={s.alt} className="transition-opacity hover:opacity-70">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.src} alt={s.alt} className="size-[32px]" />
                  </a>
                ))}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/footer/badges.png"
                alt="SOC2 Certified, GDPR Compliant, CCPA Compliant, PCI DSS Compliant"
                className="h-[54px] w-[574px]"
              />
            </div>
            <div className="flex w-full items-start gap-[99px]">
              {LINK_COLUMNS.map((groups, i) => (
                <div key={i} className="flex flex-col gap-[36px]">
                  {groups.map((g) => (
                    <LinkGroup key={g.heading} {...g} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[40px] flex w-full items-center justify-between border-t border-[#262626] py-[32px]">
            <p className="text-[14px] font-medium leading-[18px] text-[#d4d4d4]">
              © 2026 Circle. All rights reserved.
            </p>
            <div className="flex items-center gap-[32px]">
              <div className="flex items-center gap-[20px] text-[14px] font-medium leading-[18px] text-[#d4d4d4]">
                <span>99.9% Uptime</span>
                <span className="size-[4px] rounded-full bg-[#5c5c5c]" />
                <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
                <span className="size-[4px] rounded-full bg-[#5c5c5c]" />
                <a href="#" className="transition-colors hover:text-white">Terms</a>
                <span className="size-[4px] rounded-full bg-[#5c5c5c]" />
                <a href="#" className="transition-colors hover:text-white">Cookie Policy</a>
              </div>
              <button className="flex items-center gap-[4px] text-[14px] font-medium leading-[18px] text-[#d4d4d4] transition-colors hover:text-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/footer/usflag.svg" alt="" className="size-[16px]" />
                English
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
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
