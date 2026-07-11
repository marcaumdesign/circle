"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_HEIGHT = 72;

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
  onWhite,
}: {
  label: string;
  dropdown?: { label: string; description: string }[];
  onWhite: boolean;
}) {
  const [open, setOpen] = useState(false);

  const linkColor = onWhite ? "text-[#171717]" : "text-[#fafafa]";

  if (!dropdown) {
    return (
      <a
        href="#"
        className={`text-label-md transition-[color,opacity] duration-200 hover:opacity-70 ${linkColor}`}
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
        className={`text-label-md flex items-center gap-[4px] hover:opacity-70 ${linkColor}`}
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
            <div
              className={`rounded-[16px] border p-[8px] ${
                onWhite
                  ? "border-stroke-soft-200 bg-white shadow-[0_16px_32px_-12px_rgba(14,18,27,0.12)]"
                  : "border-white/10 bg-[#0d1030]/95 shadow-[0_16px_32px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              }`}
            >
              {dropdown.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={`block rounded-[10px] px-[12px] py-[10px] transition-colors duration-150 ${
                    onWhite ? "hover:bg-[#f5f5f5]" : "hover:bg-white/10"
                  }`}
                >
                  <span
                    className={`text-label-md block ${
                      onWhite ? "text-[#171717]" : "text-[#fafafa]"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`text-paragraph-xs block ${
                      onWhite ? "text-[#7b7b7b]" : "text-white/50"
                    }`}
                  >
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
  const [onWhite, setOnWhite] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const ratings = document.getElementById("hero-ratings");
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;

      if (ratings) {
        setOnWhite(ratings.getBoundingClientRect().top <= NAV_HEIGHT);
      }

      const delta = y - lastY;
      if (y <= NAV_HEIGHT) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const linkColor = onWhite ? "text-[#171717]" : "text-[#fafafa]";

  return (
    <motion.nav
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed inset-x-0 top-0 z-[9999] border-b py-[12px] transition-[background-color,border-color] duration-300 ${
        onWhite
          ? "border-stroke-soft-200 bg-white"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[48px] w-full max-w-[1200px] items-center justify-between px-[30px]">
        <div className="flex items-center gap-[48px]">
          <a href="#" aria-label="Circle home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/logo.svg"
              alt="Circle"
              className={`h-[29px] w-[100px] transition-[filter] duration-300 ${
                onWhite ? "invert" : ""
              }`}
            />
          </a>
          <div className="flex items-center gap-[24px]">
            <NavLink label="Product" dropdown={DROPDOWNS.Product} onWhite={onWhite} />
            <NavLink label="Branded App" onWhite={onWhite} />
            <NavLink label="Resources" dropdown={DROPDOWNS.Resources} onWhite={onWhite} />
            <NavLink label="Discover" onWhite={onWhite} />
            <NavLink label="Pricing" onWhite={onWhite} />
          </div>
        </div>
        <div className="flex items-center gap-[24px]">
          <a
            href="#"
            className={`text-label-md transition-[color,opacity] duration-200 hover:opacity-70 ${linkColor}`}
          >
            Log in
          </a>
          <a
            href="#"
            className="text-label-md mn-btn-primary mn-pressable flex items-center justify-center rounded-full px-[24px] py-[14px] font-semibold text-white"
          >
            Start free trial
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
