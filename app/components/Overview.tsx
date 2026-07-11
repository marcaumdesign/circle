"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.23, 1, 0.32, 1] as const;
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;
const TAB_DURATION = 6; // seconds per tab before auto-advance

/* Compass icons: line = inactive, filled = active */
const TABS = [
  {
    label: "Circle AI",
    icon: "/overview/ic-sparkles.svg",
    iconFilled: "/overview/ic-sparkles-filled.svg",
    image: "/overview/Circle AI.png",
  },
  {
    label: "Community",
    icon: "/overview/ic-group.svg",
    iconFilled: "/overview/ic-group-filled.svg",
    image: "/overview/Community.png",
  },
  {
    label: "CRM",
    icon: "/overview/ic-server.svg",
    iconFilled: "/overview/ic-server-filled.svg",
    image: "/overview/CRM.png",
  },
  {
    label: "Courses",
    icon: "/overview/ic-graduate-cap.svg",
    iconFilled: "/overview/ic-graduate-cap-filled.svg",
    image: "/overview/Courses.png",
  },
  {
    label: "Events",
    icon: "/overview/ic-ticket.svg",
    iconFilled: "/overview/ic-ticket-filled.svg",
    image: "/overview/Events.png",
  },
  {
    label: "Marketing",
    icon: "/overview/ic-megaphone.svg",
    iconFilled: "/overview/ic-megaphone.svg",
    image: "/overview/Marketing.png",
  },
  {
    label: "Payments",
    icon: "/overview/ic-credit-card.svg",
    iconFilled: "/overview/ic-credit-card-filled.svg",
    image: "/overview/Payments.png",
  },
  {
    label: "Websites",
    icon: "/overview/ic-window.svg",
    iconFilled: "/overview/ic-window-filled.svg",
    image: "/overview/Websites.png",
  },
] as const;

export default function Overview() {
  const [active, setActive] = useState(0);
  const activeTab = TABS[active];

  /* auto-advance driven by the loader bar duration */
  useEffect(() => {
    const t = setTimeout(
      () => setActive((a) => (a + 1) % TABS.length),
      TAB_DURATION * 1000,
    );
    return () => clearTimeout(t);
  }, [active]);

  return (
    <section className="relative flex flex-col items-center gap-[48px] overflow-hidden bg-white px-[32px] py-[64px]">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="font-display text-title-h2 relative w-[760px] text-center text-black"
      >
        Where every part of your business finally comes together.
      </motion.h2>

      <div className="relative flex w-full max-w-[1440px] flex-col items-center gap-[29px]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="relative w-[1248px] shrink-0"
        >
          {/* Soft color glow behind the frame — same pre-blurred asset as the
              Users network (Figma "Blur"): no live CSS filter, and the radial
              mask feathers the edges so any overflow clip stays invisible. */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[420px] w-[1589px] -translate-x-1/2 -translate-y-1/2 opacity-30 mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,black_45%,transparent_100%)]"
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/users/network/blur.png"
              alt=""
              className="size-full max-w-none object-cover"
            />
          </div>

          <div className="overview-frame relative z-10 overflow-hidden rounded-[16px] bg-[#e8eefc] shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
            <AnimatePresence mode="sync" initial={false}>
              <motion.img
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
                src={activeTab.image}
                alt={`Circle product — ${activeTab.label}`}
                className="absolute inset-0 size-full object-contain"
              />
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="relative z-10 flex w-full items-start overflow-hidden rounded-b-[12px]"
          role="tablist"
        >
          {TABS.map((tab, i) => {
            const selected = i === active;
            const mask = {
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            } as const;
            return (
              <motion.button
                key={tab.label}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(i)}
                animate={{ opacity: selected ? 1 : 0.6 }}
                whileHover={{ opacity: 1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.4, ease: EASE_IN_OUT }}
                className="flex min-w-0 flex-1 cursor-pointer flex-col items-start"
              >
                <div className="relative h-[3px] w-full overflow-hidden bg-[#e5e5e5]">
                  {selected && (
                    <motion.div
                      key={active}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: TAB_DURATION, ease: "linear" }}
                      className="absolute left-0 top-0 h-[3px] bg-[#3655e5]"
                    />
                  )}
                </div>
                <motion.div
                  animate={{ backgroundColor: selected ? "#fafafa" : "#ffffff" }}
                  transition={{ duration: 0.4, ease: EASE_IN_OUT }}
                  className="flex w-full items-center gap-[8px] p-[24px]"
                >
                  <span aria-hidden className="relative size-[24px] shrink-0">
                    <motion.span
                      className="absolute inset-0 bg-[#191b1f]"
                      style={{
                        ...mask,
                        maskImage: `url(${tab.icon})`,
                        WebkitMaskImage: `url(${tab.icon})`,
                      }}
                      animate={{ opacity: selected ? 0 : 1 }}
                      transition={{ duration: 0.4, ease: EASE_IN_OUT }}
                    />
                    <motion.span
                      className="absolute inset-0 bg-[#3655e5]"
                      style={{
                        ...mask,
                        maskImage: `url(${tab.iconFilled})`,
                        WebkitMaskImage: `url(${tab.iconFilled})`,
                      }}
                      animate={{ opacity: selected ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: EASE_IN_OUT }}
                    />
                  </span>
                  <span className="text-label-lg whitespace-nowrap text-[#191b1f]">
                    {tab.label}
                  </span>
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
