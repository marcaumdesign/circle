"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import UsersNetwork from "./UsersNetwork";

const EASE = [0.23, 1, 0.32, 1] as const;

const PERSONAS = [
  {
    photo: "/users/photo-creators.png",
    ring: "/users/ring-creators.svg",
    glowColor: "#C47AFF",
    title: "Creators",
    color: "#7d52f4",
    // Figma start: left edge (~9 o'clock)
    orbStart: "0deg",
    orbDuration: "12s",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="6.5" width="12" height="11" rx="2" />
        <path d="M15.5 11l5-3v8l-5-3" />
      </svg>
    ),
    quote:
      "Bring your calls, your community, and your content into one branded hub, so you stop losing hours to admin.",
  },
  {
    photo: "/users/photo-educators.png",
    ring: "/users/ring-educators.svg",
    glowColor: "#9BC05D",
    title: "Educators",
    color: "#1daf9c",
    // Figma start: -105° → bottom-right (~5 o'clock)
    orbStart: "-105deg",
    orbDuration: "14.5s",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4L2.5 8.5 12 13l9.5-4.5L12 4z" />
        <path d="M6 10.5V15c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5M21.5 8.5V14" />
      </svg>
    ),
    quote:
      "Turn one-time buyers into an ongoing learning community, where students support and challenge each other, not just you.",
  },
  {
    photo: "/users/photo-builders.png",
    ring: "/users/ring-builders.svg",
    glowColor: "#F7961F",
    title: "Community Builders",
    color: "#e16614",
    // Figma start: -135° → lower-right (~4 o'clock)
    orbStart: "-135deg",
    orbDuration: "16s",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8.5" r="3" />
        <path d="M3.5 19c.5-3.2 2.8-5 5.5-5s5 1.8 5.5 5" />
        <path d="M15.5 6.2a3 3 0 010 5.6M17 14.3c1.9.6 3.2 2.2 3.5 4.7" />
      </svg>
    ),
    quote:
      "Own your member data, your roadmap, and your growth, instead of renting reach from a platform that isn't built for you.",
  },
];

/** Ring stroke centerline radius as % of the 375 orb frame (from Figma SVG). */
const RING_RADIUS_PCT = (187.261 / 375.478) * 100;
/** Dot sits on the ring, slightly below 9 o'clock (Figma y). */
const DOT_TOP_PCT = ((215.92 + 3.822 / 2) / 374.522) * 100;
/** Solve the circle equation for x at that y, so the dot lands on the stroke. */
const DOT_LEFT_PCT =
  50 - Math.sqrt(RING_RADIUS_PCT ** 2 - (DOT_TOP_PCT - 50) ** 2);

function OrbitDot({ color }: { color: string }) {
  // Unique filter id so multiple orbs on the page don't collide
  const filterId = `orb-glow-${color.replace("#", "")}`;
  // Figma drop shadow: 0 / 0 / blur 15.29 / spread 3.82 (opacity boosted from 32%)
  const r = Number.parseInt(color.slice(1, 3), 16) / 255;
  const g = Number.parseInt(color.slice(3, 5), 16) / 255;
  const b = Number.parseInt(color.slice(5, 7), 16) / 255;

  return (
    <svg
      className="block size-full overflow-visible"
      viewBox="0 0 42.0382 42.0382"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <filter
          id={filterId}
          x="-21.0191"
          y="-21.0191"
          width="84.0764"
          height="84.0764"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="3.82166"
            operator="dilate"
            in="SourceAlpha"
            result="spread"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="7.64331" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values={`0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} 0 0 0 0.55 0`}
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="glow" />
          <feBlend mode="normal" in="SourceGraphic" in2="glow" result="shape" />
        </filter>
      </defs>
      <circle
        cx="21.0191"
        cy="21.0191"
        r="1.91083"
        fill={color}
        filter={`url(#${filterId})`}
      />
    </svg>
  );
}

function PersonaOrb({
  photo,
  ring,
  title,
  glowColor,
  orbStart,
  orbDuration,
}: {
  photo: string;
  ring: string;
  title: string;
  glowColor: string;
  orbStart: string;
  orbDuration: string;
}) {
  const spinRef = useRef<HTMLDivElement>(null);

  /* Adjust the CSS spin via WAAPI playbackRate: unlike swapping
     animation-duration, this never makes the ring jump position. */
  const setSpinRate = (rate: number) => {
    for (const anim of spinRef.current?.getAnimations() ?? []) {
      anim.updatePlaybackRate(rate);
    }
  };

  return (
    <div
      className="group relative size-[375px] overflow-visible"
      onMouseEnter={() => setSpinRate(0.75)}
      onMouseLeave={() => setSpinRate(1)}
    >
      {/* Outer sets start angle; inner spins so each orb begins elsewhere */}
      <div
        className="pointer-events-none absolute inset-0 overflow-visible"
        style={{ transform: `rotate(${orbStart})` }}
      >
        <div
          ref={spinRef}
          className="users-orb-spin absolute inset-0 overflow-visible"
          style={{ "--orb-duration": orbDuration } as CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ring} alt="" className="absolute inset-0 size-full" />
          {/* Anchor centered on ring stroke; glow extends via inset -500% (Figma) */}
          <div
            className="users-orb-dot absolute size-[3.82px] -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${DOT_LEFT_PCT}%`,
              top: `${DOT_TOP_PCT}%`,
            }}
          >
            <div className="absolute inset-[-500%]">
              <OrbitDot color={glowColor} />
            </div>
          </div>
        </div>
      </div>

      {/* Circular photo */}
      <div className="absolute left-1/2 top-1/2 size-[340px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-[#cdcdcd] transition-transform duration-500 ease-out group-hover:scale-[1.04]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt={title}
          className="size-full object-cover"
        />
      </div>
    </div>
  );
}

export default function Users() {
  return (
    // overflow-x-clip contains the 1589px-wide glow without cutting the pill
    // drop shadows that hang below the section's last pixel row
    <section className="flex w-full flex-col items-center overflow-x-clip pt-[64px]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex w-[800px] flex-col items-center gap-[16px] text-center"
      >
        <h2 className="font-display text-title-h2 whitespace-nowrap text-black">
          Wherever you lead, Circle keeps up.
        </h2>
        <p className="text-label-lg text-[#777]">
          Explore how Circle supports the way you already teach, coach, create,
          or lead.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-140px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        className="mt-[64px] flex w-[1200px] items-start justify-between"
      >
        {PERSONAS.map((p) => (
          <motion.div
            key={p.title}
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            className="flex w-[375px] flex-col"
          >
            <PersonaOrb
              photo={p.photo}
              ring={p.ring}
              title={p.title}
              glowColor={p.glowColor}
              orbStart={p.orbStart}
              orbDuration={p.orbDuration}
            />
            <div className="mt-[33px] flex w-[304px] flex-col gap-[25px]">
              <div className="flex items-center gap-[8px]" style={{ color: p.color }}>
                {p.icon}
                <span className="font-display text-title-h6 text-black">
                  {p.title}
                </span>
              </div>
              <p className="text-paragraph-sm text-[#525252]">
                {p.quote}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-160px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mt-[64px] flex w-full justify-center"
      >
        <UsersNetwork />
      </motion.div>
    </section>
  );
}
