"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.23, 1, 0.32, 1] as const;

const TABS = [
  "Circle AI",
  "Community",
  "CRM",
  "Events",
  "Live",
  "Courses",
  "Marketing",
  "Payments",
];

function TabIcon({ tab }: { tab: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (tab) {
    case "Circle AI":
      return (
        <svg {...common}>
          <path d="M8 2l1.3 3.4L13 6.7l-3.7 1.3L8 11.4 6.7 8 3 6.7l3.7-1.3L8 2z" />
          <path d="M12.5 11l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5.5-1.3z" />
        </svg>
      );
    case "Community":
      return (
        <svg {...common}>
          <circle cx="5.5" cy="5.5" r="2.2" />
          <circle cx="10.8" cy="6.5" r="1.8" />
          <path d="M2 13c.4-2.3 1.9-3.5 3.5-3.5S8.6 10.7 9 13" />
          <path d="M10.5 12.5c.3-1.6 1.2-2.5 2.4-2.5.5 0 .9.1 1.3.4" />
        </svg>
      );
    case "CRM":
      return (
        <svg {...common}>
          <rect x="2.5" y="3" width="11" height="10" rx="1.5" />
          <path d="M2.5 6.5h11M6 3v10" />
        </svg>
      );
    case "Events":
      return (
        <svg {...common}>
          <rect x="2.5" y="3.5" width="11" height="9.5" rx="1.5" />
          <path d="M2.5 6.5h11M5.5 2v2.5M10.5 2v2.5" />
        </svg>
      );
    case "Live":
      return (
        <svg {...common}>
          <rect x="2.5" y="4.5" width="8" height="7" rx="1.5" />
          <path d="M10.5 7.5l3-2v5l-3-2" />
        </svg>
      );
    case "Courses":
      return (
        <svg {...common}>
          <rect x="2.5" y="3" width="11" height="10" rx="1.5" />
          <path d="M8 3v10M2.5 8h5.5" />
        </svg>
      );
    case "Marketing":
      return (
        <svg {...common}>
          <path d="M3 9.5V6.5l7-3.5v10l-7-3.5z" />
          <path d="M10 5.5c1.7 0 3 1.1 3 2.5s-1.3 2.5-3 2.5M4.5 10v3" />
        </svg>
      );
    case "Payments":
      return (
        <svg {...common}>
          <rect x="2" y="4" width="12" height="8.5" rx="1.5" />
          <path d="M2 7h12M4.5 10h3" />
        </svg>
      );
    default:
      return null;
  }
}

/* ponytail: only one featured screenshot exists in the design — tab change
   crossfades a per-tab pan/zoom of the same image; swap in real per-tab
   screenshots when marketing exports them */
const TAB_VIEW: Record<string, { scale: number; x: number; y: number }> = {
  "Circle AI": { scale: 1, x: 0, y: 0 },
  Community: { scale: 1.18, x: -120, y: -40 },
  CRM: { scale: 1.18, x: 120, y: -40 },
  Events: { scale: 1.18, x: -120, y: 60 },
  Live: { scale: 1.25, x: 0, y: 0 },
  Courses: { scale: 1.18, x: 120, y: 60 },
  Marketing: { scale: 1.18, x: 0, y: -60 },
  Payments: { scale: 1.18, x: 0, y: 60 },
};

export default function Overview() {
  const [active, setActive] = useState(TABS[0]);
  const [playing, setPlaying] = useState(true);
  const view = TAB_VIEW[active];

  return (
    <section className="flex flex-col items-center gap-[48px] px-[32px] py-[64px]">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="font-display w-[700px] text-center text-[48px] font-medium leading-[52px] tracking-[-0.5px] text-black"
      >
        Where every part of your business finally comes together.
      </motion.h2>

      <div className="flex w-full max-w-[1440px] flex-col items-center gap-[32px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="flex items-center gap-[4px] rounded-[16px] bg-[#f5f5f5] p-[4px]"
          role="tablist"
        >
          {TABS.map((tab) => {
            const selected = tab === active;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(tab)}
                className={`relative flex items-center gap-[8px] rounded-[12px] px-[10px] py-[8px] text-[14px] font-medium leading-[20px] transition-colors duration-200 ${
                  selected ? "text-[#191b1f]" : "text-[#5c5c5c] hover:text-[#191b1f]"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="overview-tab-pill"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    className="absolute inset-0 rounded-[12px] border border-white bg-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
                  />
                )}
                <span className="relative z-10 flex items-center gap-[8px]">
                  <TabIcon tab={tab} />
                  {tab}
                </span>
              </button>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="relative h-[751px] w-full overflow-hidden rounded-[22px] bg-[#f7f9fa]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/overview/bg.jpg"
            alt=""
            className="absolute left-1/2 top-1/2 h-auto w-[114.6%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
          />
          <div className="absolute left-1/2 top-1/2 h-[646px] w-[1134px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[12px]">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={active}
                initial={{ opacity: 0, scale: view.scale * 1.02 }}
                animate={{ opacity: 1, scale: view.scale, x: view.x, y: view.y }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                src="/overview/featured.png"
                alt={`Circle product — ${active}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause" : "Play"}
            className="mn-pressable absolute bottom-[62px] right-[130px] flex items-center rounded-[12px] bg-[rgba(25,27,31,0.5)] p-[12px] backdrop-blur-[7px] transition-colors duration-200 hover:bg-[rgba(25,27,31,0.7)]"
          >
            {playing ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                <rect x="4" y="2.5" width="4" height="15" rx="1" />
                <rect x="12" y="2.5" width="4" height="15" rx="1" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                <path d="M5 3.5v13l11-6.5L5 3.5z" />
              </svg>
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
