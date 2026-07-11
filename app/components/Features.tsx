"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.23, 1, 0.32, 1] as const;

type Item = { title: string; icon: string };

type Block = {
  id: string;
  label: string;
  color: string;
  heading: [string, string];
  items: Item[];
  quote: string;
  name: string;
  role: string;
  avatar: string;
  panel: { src: string; top: number; height: number };
};

const ITEM_BODY =
  "Circle has hosted two communities I've built. Each time, it's been important for the community to have flexibility, the ability.";

const BLOCKS: Block[] = [
  {
    id: "create",
    label: "Create",
    color: "#7d52f4",
    heading: ["Describe it.", "Circle builds it."],
    items: [
      { title: "Circle AI", icon: "sparkle" },
      { title: "Courses", icon: "course" },
      { title: "Customization", icon: "sliders" },
      { title: "Website Builder", icon: "browser" },
    ],
    quote:
      "“Circle has hosted two communities I've built. Each time, it's been important for the community to have flexibility, the ability to be customized, and create a seamless member experience.”",
    name: "Reina Pomeroy",
    role: "Sr. Director of Community",
    avatar: "/features/avatar-reina.png",
    panel: { src: "/features/create-panel.png", top: 0, height: 864 },
  },
  {
    id: "engage",
    label: "Engage",
    color: "#fa7319",
    heading: ["Community", "that talks back."],
    items: [
      { title: "Discussions", icon: "users" },
      { title: "Events", icon: "ticket" },
      { title: "Livestreams", icon: "video" },
      { title: "Chat", icon: "chat" },
    ],
    quote:
      "“Circle AI knows your business, every member, every conversation, and can actually take action on your behalf.”",
    name: "Gannon Meyer",
    role: "Marketing Automation Expert",
    avatar: "/features/avatar-gannon.png",
    panel: { src: "/features/engage-panel.png", top: -85, height: 949 },
  },
  {
    id: "manage",
    label: "Manage",
    color: "#335cff",
    heading: ["Runs itself,", "mostly."],
    items: [
      { title: "AI Agents", icon: "bot" },
      { title: "Analytics", icon: "chart" },
      { title: "Gamification", icon: "crown" },
      { title: "Workflows", icon: "zap" },
    ],
    quote:
      "“I moved my 20k subscriber list to Circle—now I can reach course or event members in seconds.”",
    name: "Marc Sabatella",
    role: "Founder, Outside Shore Music",
    avatar: "/features/avatar-marc.png",
    panel: { src: "/features/manage-panel.png", top: -108, height: 972 },
  },
  {
    id: "earn",
    label: "Earn",
    color: "#1daf61",
    heading: ["Where the business", "becomes real."],
    items: [
      { title: "Payments", icon: "card" },
      { title: "Branded App", icon: "phone" },
      { title: "Email Marketing", icon: "mail" },
    ],
    quote:
      "“We've made over $3 million on Circle over the last two years... This is the power of a true 'all-in-one' platform.”",
    name: "Tiago Forte",
    role: "Founder, Forte Labs",
    avatar: "/features/avatar-tiago.png",
    panel: { src: "/features/earn-panel.png", top: 0, height: 864 },
  },
];

function Icon({ name, className }: { name: string; className?: string }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
  switch (name) {
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
          <path d="M18.5 16l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
        </svg>
      );
    case "course":
      return (
        <svg {...common}>
          <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
          <path d="M3.5 9.5h17M9.5 9.5v10" />
        </svg>
      );
    case "sliders":
      return (
        <svg {...common}>
          <path d="M4 7h10M18 7h2M4 12h4M12 12h8M4 17h10M18 17h2" />
          <circle cx="16" cy="7" r="2" />
          <circle cx="10" cy="12" r="2" />
          <circle cx="16" cy="17" r="2" />
        </svg>
      );
    case "browser":
      return (
        <svg {...common}>
          <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
          <path d="M3.5 9h17M6.5 7h.01M9 7h.01" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8.5" r="3" />
          <path d="M3.5 19c.5-3.2 2.8-5 5.5-5s5 1.8 5.5 5" />
          <path d="M15.5 6.2a3 3 0 010 5.6M17 14.3c1.9.6 3.2 2.2 3.5 4.7" />
        </svg>
      );
    case "ticket":
      return (
        <svg {...common}>
          <path d="M4 8a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 000-4V8z" />
          <path d="M14 6v12" strokeDasharray="2 2.5" />
        </svg>
      );
    case "video":
      return (
        <svg {...common}>
          <rect x="3.5" y="6.5" width="12" height="11" rx="2" />
          <path d="M15.5 11l5-3v8l-5-3" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M20 12a8 8 0 10-3.2 6.4L20 19.5l-.9-3A8 8 0 0020 12z" />
        </svg>
      );
    case "bot":
      return (
        <svg {...common}>
          <rect x="4.5" y="7.5" width="15" height="11" rx="2" />
          <path d="M12 4.5v3M8.5 12h.01M15.5 12h.01M9 15.5h6" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M4 19.5V5M4 19.5h16" />
          <path d="M7.5 15l3.5-4 3 2.5 4.5-6" />
        </svg>
      );
    case "crown":
      return (
        <svg {...common}>
          <path d="M4 8.5l4 3.5 4-6 4 6 4-3.5-1.5 9.5h-13L4 8.5z" />
        </svg>
      );
    case "zap":
      return (
        <svg {...common}>
          <path d="M13 3L5 13.5h6L11 21l8-10.5h-6L13 3z" />
        </svg>
      );
    case "card":
      return (
        <svg {...common}>
          <rect x="3" y="5.5" width="18" height="13" rx="2" />
          <path d="M3 10h18M6.5 14.5h4" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <rect x="7" y="3.5" width="10" height="17" rx="2" />
          <path d="M11 17.5h2" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5.5" width="18" height="13" rx="2" />
          <path d="M3.5 7l8.5 6 8.5-6" />
        </svg>
      );
    default:
      return null;
  }
}

function Accordion({ block }: { block: Block }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-col">
      {block.items.map((item, i) => {
        const isOpen = i === open;
        return (
          <div
            key={item.title}
            className={i > 0 ? "border-t border-[#ebebeb]" : ""}
          >
            <button
              onClick={() => setOpen(i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-[12px] py-[14px] text-left"
            >
              <Icon name={item.icon} className="shrink-0 text-[#171717]" />
              <span className="text-[16px] font-medium leading-[20px] tracking-[-0.2px] text-[#171717]">
                {item.title}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="pb-[12px] text-[14px] leading-[20px] tracking-[-0.1px] text-[#5c5c5c]">
                    {ITEM_BODY}
                  </p>
                  <a
                    href="#"
                    className="mb-[18px] inline-flex items-center gap-[4px] text-[12px] font-semibold text-[#171717] transition-opacity hover:opacity-70"
                  >
                    Learn more
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 6h8M7 3l3 3-3 3" />
                    </svg>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
      <div className="border-t border-[#ebebeb]" />
    </div>
  );
}

function FeatureBlock({ block }: { block: Block }) {
  return (
    <div className="relative h-[864px] w-[1440px]">
      {/* Right panel — exported composite from Figma */}
      <motion.img
        initial={{ opacity: 0, x: 48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 0.9, ease: EASE }}
        src={block.panel.src}
        alt={`${block.label} — Circle product preview`}
        className="absolute left-[583px] w-[857px] max-w-none"
        style={{ top: block.panel.top, height: block.panel.height }}
      />

      {/* Left column */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-160px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="absolute left-[120px] top-[32px] flex h-[800px] w-[462px] flex-col"
      >
        {[
          <div key="head" className="flex flex-col gap-[16px]">
            <div className="flex items-center gap-[8px]" style={{ color: block.color }}>
              <Icon name={block.items[0].icon} className="size-[20px]" />
              <span className="text-[16px] font-medium leading-[20px]">
                {block.label}
              </span>
            </div>
            <h3 className="font-display text-[44px] font-medium leading-[52px] tracking-[-1px] text-[#171717]">
              {block.heading[0]}
              <br />
              {block.heading[1]}
            </h3>
          </div>,
          <div key="items" className="mt-[60px]">
            <Accordion block={block} />
          </div>,
          <div key="quote" className="mt-auto flex flex-col gap-[24px] pb-[8px]">
            <p className="text-[14px] leading-[20px] tracking-[-0.1px] text-[#5c5c5c]">
              {block.quote}
            </p>
            <div className="flex items-center gap-[12px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={block.avatar}
                alt={block.name}
                className="size-[42px] rounded-full object-cover"
              />
              <div>
                <p className="text-[15px] font-medium leading-[22px] text-[#171717]">
                  {block.name}
                </p>
                <p className="text-[13px] leading-[18px] text-[#7b7b7b]">
                  {block.role}
                </p>
              </div>
            </div>
          </div>,
        ].map((child, i) => (
          <motion.div
            key={i}
            className={i === 2 ? "mt-auto" : undefined}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Features() {
  return (
    <section className="flex flex-col items-center pt-[64px]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex w-[800px] flex-col items-center gap-[16px] text-center"
      >
        <h2 className="font-display text-[48px] font-medium leading-[52px] tracking-[-0.5px] text-black">
          From first idea to daily business.
        </h2>
        <p className="text-[18px] font-medium leading-[24px] tracking-[-0.25px] text-[#777]">
          Everything you need to run a real business, built into one platform.
        </p>
      </motion.div>

      <div className="mt-[64px] flex flex-col gap-[128px] overflow-hidden">
        {BLOCKS.map((block) => (
          <FeatureBlock key={block.id} block={block} />
        ))}
      </div>
    </section>
  );
}
