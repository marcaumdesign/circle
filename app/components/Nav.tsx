"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DROPDOWNS: Record<string, { label: string; description: string }[]> = {
  Product: [
    { label: "Community", description: "Discussions, spaces and members" },
    { label: "Courses", description: "Build and sell online courses" },
    { label: "Events", description: "Live events and meetups" },
    { label: "Payments", description: "Subscriptions and one-time sales" },
    { label: "Circle AI", description: "Your community, on autopilot" },
  ],
  Resources: [
    { label: "Blog", description: "Stories and product updates" },
    { label: "Help Center", description: "Guides and documentation" },
    { label: "Community", description: "Meet other Circle creators" },
    { label: "Academy", description: "Learn to grow your community" },
  ],
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mn-chevron"
      data-open={open}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavLink({
  label,
  dropdown,
}: {
  label: string;
  dropdown?: { label: string; description: string }[];
}) {
  const [open, setOpen] = useState(false);

  if (!dropdown) {
    return (
      <a
        href="#"
        className="text-[16px] font-medium leading-[20px] tracking-[-0.25px] text-[#fafafa] transition-opacity duration-200 hover:opacity-70"
      >
        {label}
      </a>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-[4px] text-[16px] font-medium leading-[20px] tracking-[-0.25px] text-[#fafafa] transition-opacity duration-200 hover:opacity-70"
        aria-expanded={open}
      >
        {label}
        <Chevron open={open} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="absolute left-1/2 top-full z-50 w-[280px] -translate-x-1/2 pt-[12px]"
          >
            <div className="rounded-[16px] border border-white/10 bg-[#0d1030]/95 p-[8px] shadow-[0_16px_32px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              {dropdown.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className="block rounded-[10px] px-[12px] py-[10px] transition-colors duration-150 hover:bg-white/10"
                >
                  <span className="block text-[15px] font-medium leading-[20px] tracking-[-0.2px] text-[#fafafa]">
                    {item.label}
                  </span>
                  <span className="block text-[13px] leading-[18px] text-white/50">
                    {item.description}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Nav() {
  return (
    <nav className="relative z-40 w-full px-[119px] py-[12px]">
      <div className="flex h-[48px] w-full items-center justify-between">
        <div className="flex items-center gap-[48px]">
          <a href="#" aria-label="Circle home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero/logo.svg" alt="Circle" className="h-[29px] w-[100px]" />
          </a>
          <div className="flex items-center gap-[24px]">
            <NavLink label="Product" dropdown={DROPDOWNS.Product} />
            <NavLink label="Branded App" />
            <NavLink label="Resources" dropdown={DROPDOWNS.Resources} />
            <NavLink label="Discover" />
            <NavLink label="Pricing" />
          </div>
        </div>
        <div className="flex items-center gap-[24px]">
          <a
            href="#"
            className="text-[16px] font-medium leading-[20px] tracking-[-0.25px] text-[#fafafa] transition-opacity duration-200 hover:opacity-70"
          >
            Log in
          </a>
          <a
            href="#"
            className="mn-pressable flex items-center justify-center rounded-full border border-[#f5f5f5] px-[24px] py-[14px] text-[16px] font-semibold leading-[20px] tracking-[-0.25px] text-[#fafafa] transition-colors duration-200 hover:bg-white hover:text-[#0d1030]"
          >
            Start free trial
          </a>
        </div>
      </div>
    </nav>
  );
}
