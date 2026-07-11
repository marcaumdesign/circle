"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.23, 1, 0.32, 1] as const;
const TOPIC_DURATION = 6; // seconds per accordion topic before auto-advance
const PREVIEW_MAX = 1512; // px — beyond this the preview stops full-bleeding

/**
 * Per-topic screen image.
 * align: c = center-center | b = center-bottom | l = left-center | r = right-center
 * w = rendered width (px); x/y = absolute px offsets from the base alignment,
 * exposed so they can be fine-tuned by hand. radius = CSS border-radius.
 */
type TopicScreen = {
  src: string;
  align: "c" | "b" | "l" | "r";
  w: number;
  x: number;
  y: number;
  radius?: string;
};

type Item = { title: string; icon: string; body: string; screen: TopicScreen };

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
  bg: string;
};

const BLOCKS: Block[] = [
  {
    id: "create",
    label: "Create",
    color: "#7d52f4",
    heading: ["Describe it.", "Circle builds it."],
    items: [
      {
        title: "Circle AI",
        icon: "sparkle",
        body: "Turn ideas into plans, content, and action with a simple conversation.",
        screen: {
          src: "/features/preview/create/Circle AI-r.png",
          align: "l",
          w: 1100,
          x: 40,
          y: 0,
        },
      },
      {
        title: "Courses",
        icon: "course",
        body: "Build visual learning paths with a video-native lesson experience.",
        screen: {
          src: "/features/preview/create/Courses-r.png",
          align: "l",
          w: 690,
          x: 40,
          y: 0,
          radius: "24px 0 0 24px",
        },
      },
      {
        title: "Customization",
        icon: "sliders",
        body: "Make every space feel like yours — branding, layout, and voice.",
        screen: {
          src: "/features/preview/create/Customization-l.png",
          align: "l",
          w: 1321,
          x: 40,
          y: 40,
        },
      },
      {
        title: "Website Builder",
        icon: "browser",
        body: "Landing and sales pages that flow straight into your community.",
        screen: {
          src: "/features/preview/create/Website Builder-l.png",
          align: "l",
          w: 790,
          x: 40,
          y: 80,
        },
      },
    ],
    quote:
      "“Circle has hosted two communities I've built. Each time, it's been important for the community to have flexibility, the ability to be customized, and create a seamless member experience.”",
    name: "Reina Pomeroy",
    role: "Sr. Director of Community",
    avatar: "/features/avatar-reina.png",
    bg: "/features/preview/bg/Create.png",
  },
  {
    id: "engage",
    label: "Engage",
    color: "#fa7319",
    heading: ["Community", "that talks back."],
    items: [
      {
        title: "Discussions",
        icon: "users",
        body: "Posts, comments, and rich media in spaces members actually use.",
        screen: {
          src: "/features/preview/engage/Discussions.png",
          align: "c",
          w: 713,
          x: 60,
          y: 0,
        },
      },
      {
        title: "Events",
        icon: "ticket",
        body: "Host events with RSVPs, reminders, and recordings in one place.",
        screen: {
          src: "/features/preview/engage/Events-l.png",
          align: "r",
          w: 1395,
          x: 0,
          y: 10,
        },
      },
      {
        title: "Chat",
        icon: "chat",
        body: "Real-time messaging that keeps conversations moving.",
        screen: {
          src: "/features/preview/engage/Chat-c.png",
          align: "c",
          w: 630,
          x: 0,
          y: 0,
        },
      },
    ],
    quote:
      "“Circle AI knows your business, every member, every conversation, and can actually take action on your behalf.”",
    name: "Gannon Meyer",
    role: "Marketing Automation Expert",
    avatar: "/features/avatar-gannon.png",
    bg: "/features/preview/bg/Engage.png",
  },
  {
    id: "manage",
    label: "Manage",
    color: "#335cff",
    heading: ["Runs itself,", "mostly."],
    items: [
      {
        title: "AI Agents",
        icon: "bot",
        body: "Agents that know your community and take action on your behalf.",
        screen: {
          src: "/features/preview/manage/AI Agents.png",
          align: "c",
          w: 756,
          x: 0,
          y: 0,
        },
      },
      {
        title: "Analytics",
        icon: "chart",
        body: "See what drives engagement and growth across your community.",
        screen: {
          src: "/features/preview/manage/Analytics-b.png",
          align: "b",
          w: 792,
          x: 0,
          y: 0,
        },
      },
      {
        title: "Gamification",
        icon: "crown",
        body: "Leaderboards and rewards that keep members coming back.",
        screen: {
          src: "/features/preview/manage/Gamification-b.png",
          align: "b",
          w: 834,
          x: 0,
          y: 0,
        },
      },
      {
        title: "Workflows",
        icon: "zap",
        body: "Automate onboarding, digests, and follow-ups with less effort.",
        screen: {
          src: "/features/preview/manage/Workflows-c.png",
          align: "c",
          w: 532,
          x: 0,
          y: 0,
        },
      },
    ],
    quote:
      "“I moved my 20k subscriber list to Circle—now I can reach course or event members in seconds.”",
    name: "Marc Sabatella",
    role: "Founder, Outside Shore Music",
    avatar: "/features/avatar-marc.png",
    bg: "/features/preview/bg/Manage.png",
  },
  {
    id: "earn",
    label: "Earn",
    color: "#1daf61",
    heading: ["Where the business", "becomes real."],
    items: [
      {
        title: "Payments",
        icon: "card",
        body: "Memberships, courses, and subscriptions — checkout stays on-brand.",
        screen: {
          src: "/features/preview/earn/Payments.png",
          align: "l",
          w: 1200,
          x: 70,
          y: 70,
        },
      },
      {
        title: "Branded App",
        icon: "phone",
        body: "Your own iOS and Android app, with push notifications included.",
        screen: {
          src: "/features/preview/earn/Branded App-c.png",
          align: "c",
          w: 662,
          x: 0,
          y: 0,
        },
      },
      {
        title: "Email Marketing",
        icon: "mail",
        body: "Broadcasts and automations that link straight to posts and courses.",
        screen: {
          src: "/features/preview/earn/Email Marketing-b.png",
          align: "b",
          w: 819,
          x: 0,
          y: 0,
        },
      },
    ],
    quote:
      "“We've made over $3 million on Circle over the last two years... This is the power of a true 'all-in-one' platform.”",
    name: "Tiago Forte",
    role: "Founder, Forte Labs",
    avatar: "/features/avatar-tiago.png",
    bg: "/features/preview/bg/Earn.png",
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

/** Absolute placement from the topic's alignment code + manual x/y offsets */
function screenStyle(s: TopicScreen): CSSProperties {
  const base: CSSProperties = { width: s.w, borderRadius: s.radius };
  switch (s.align) {
    case "c":
      return {
        ...base,
        left: `calc(50% + ${s.x}px)`,
        top: `calc(50% + ${s.y}px)`,
        transform: "translate(-50%, -50%)",
      };
    case "b":
      return {
        ...base,
        left: `calc(50% + ${s.x}px)`,
        bottom: s.y,
        transform: "translateX(-50%)",
      };
    case "l":
      return {
        ...base,
        left: s.x,
        top: `calc(50% + ${s.y}px)`,
        transform: "translateY(-50%)",
      };
    case "r":
      return {
        ...base,
        right: s.x,
        top: `calc(50% + ${s.y}px)`,
        transform: "translateY(-50%)",
      };
  }
}

function Preview({ block, open }: { block: Block; open: number }) {
  const item = block.items[open];
  return (
    <motion.div
      initial={{ opacity: 0, x: 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-200px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="absolute right-0 top-[32px] h-[800px] overflow-hidden rounded-l-[32px] bg-white min-[1512px]:rounded-r-[32px]"
      style={{ left: "calc(50% - 74px)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={block.bg}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />

      {/* Topic screen — crossfades in sync with the accordion timer */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={open}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.screen.src}
            alt={`${block.label} — ${item.title}`}
            className="absolute max-w-none"
            style={screenStyle(item.screen)}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function Accordion({
  block,
  open,
  onSelect,
}: {
  block: Block;
  open: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex flex-col">
      {block.items.map((item, i) => {
        const isOpen = i === open;
        return (
          <div key={item.title}>
            <button
              onClick={() => onSelect(i)}
              aria-expanded={isOpen}
              className={`flex w-full cursor-pointer items-center gap-[12px] py-[14px] text-left text-[#171717] transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-60 hover:opacity-100"
              }`}
            >
              <Icon name={item.icon} className="shrink-0" />
              <span className="text-label-md">
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
                  <p className="text-label-md pb-[18px] text-[#404040]">
                    {item.body}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Divider doubles as the topic timer progress line */}
            <div className="relative h-px w-full overflow-hidden bg-[#ebebeb]">
              {isOpen && (
                <motion.div
                  key={open}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: TOPIC_DURATION, ease: "linear" }}
                  className="absolute left-0 top-0 h-px"
                  style={{ backgroundColor: block.color }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FeatureBlock({ block }: { block: Block }) {
  const [open, setOpen] = useState(0);

  /* auto-advance driven by the progress line duration (same mechanism as Overview tabs) */
  useEffect(() => {
    const t = setTimeout(
      () => setOpen((o) => (o + 1) % block.items.length),
      TOPIC_DURATION * 1000,
    );
    return () => clearTimeout(t);
  }, [open, block.items.length]);

  return (
    <div
      className="relative mx-auto h-[864px] w-full"
      style={{ maxWidth: PREVIEW_MAX }}
    >
      <Preview block={block} open={open} />

      {/* Left column — follows the 1200px container rules */}
      <div className="relative mx-auto h-full w-full max-w-[1200px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-160px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="absolute left-0 top-[32px] flex h-[800px] w-[462px] flex-col"
        >
          {[
            <div key="head" className="flex flex-col gap-[16px]">
              <div className="flex items-center gap-[8px]" style={{ color: block.color }}>
                <Icon name={block.items[0].icon} className="size-[20px]" />
                <span className="text-label-md">
                  {block.label}
                </span>
              </div>
              <h3 className="font-display text-title-h3 text-[#171717]">
                {block.heading[0]}
                <br />
                {block.heading[1]}
              </h3>
            </div>,
            <div key="items" className="mt-[60px]">
              <Accordion block={block} open={open} onSelect={setOpen} />
            </div>,
            <div key="quote" className="mt-auto flex flex-col gap-[24px] pb-[8px]">
              <p className="text-label-md text-[#404040]">
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
                  <p className="text-label-md text-[#171717]">
                    {block.name}
                  </p>
                  <p className="text-paragraph-sm text-[#7b7b7b]">
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
    </div>
  );
}

export default function Features() {
  return (
    <section className="flex w-full flex-col items-center overflow-hidden pt-[64px]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex w-[800px] flex-col items-center gap-[16px] text-center"
      >
        <h2 className="font-display text-title-h2 text-black">
          From first idea to daily business.
        </h2>
        <p className="text-label-lg text-[#777]">
          Everything you need to run a real business, built into one platform.
        </p>
      </motion.div>

      <div className="mt-[64px] flex w-full flex-col gap-[128px]">
        {BLOCKS.map((block) => (
          <FeatureBlock key={block.id} block={block} />
        ))}
      </div>
    </section>
  );
}
