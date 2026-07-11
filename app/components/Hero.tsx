"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.23, 1, 0.32, 1] as const;

function RatingsPill() {
  return (
    <div
      id="hero-ratings"
      className="flex items-center gap-[12px] rounded-full border border-[#484b73] bg-white/10 py-[6px] pl-[6px] pr-[12px] backdrop-blur-[6px]"
    >
      <div className="flex items-center">
        {[
          { src: "/hero/g2.svg", alt: "G2", pad: false },
          { src: "/hero/appstore.svg", alt: "App Store", pad: true },
          { src: "/hero/capterra.svg", alt: "Capterra", pad: false, bare: true },
          { src: "/hero/gplay.svg", alt: "Google Play", pad: true },
        ].map((icon) =>
          icon.bare ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              className="-mr-[4px] size-[30px] shrink-0"
            />
          ) : (
            <span
              key={icon.alt}
              className="-mr-[4px] flex size-[30px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={icon.src}
                alt={icon.alt}
                className={icon.pad ? "size-[22px]" : "size-[30px]"}
              />
            </span>
          ),
        )}
      </div>
      <div className="flex items-center gap-[2px]">
        {[0, 1, 2, 3].map((i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src="/hero/star1.svg"
            alt=""
            className="size-[16px] shrink-0"
          />
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/star5.svg"
          alt=""
          className="size-[16px] shrink-0"
        />
        <span className="text-label-md pl-[6px] text-[#fafafa]">
          70k+ reviews
        </span>
      </div>
    </div>
  );
}

export function EmailField({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="flex h-[64px] w-[486px] items-center gap-[8px] rounded-full border border-[#e5e5e5] bg-white py-[4px] pl-[24px] pr-[4px] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
      onSubmit={(e) => {
        e.preventDefault();
        if (/.+@.+\..+/.test(email)) setSubmitted(true);
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setSubmitted(false);
        }}
        placeholder="Enter your email address"
        className="text-label-md min-w-0 flex-1 bg-transparent text-[#171717] outline-none placeholder:text-[#737373]"
        aria-label="Email address"
      />
      <button
        type="submit"
        className={`text-label-md mn-pressable flex h-full shrink-0 items-center justify-center rounded-full px-[32px] py-[12px] font-semibold text-[#fafafa] ${
          submitted ? "" : "mn-btn-primary"
        }`}
        style={
          submitted
            ? {
                backgroundImage:
                  "linear-gradient(163.76deg, #1daf61 18.675%, #178c4e 78.249%)",
              }
            : undefined
        }
      >
        {submitted ? "You're on the list ✓" : "Get started for free"}
      </button>
    </form>
  );
}

/** Glass frame from Figma — white fill @ 18% + blur */
function GlassFrame({
  className,
  radius = 31,
  imageRadius = 24,
  children,
}: {
  className?: string;
  radius?: number;
  imageRadius?: number;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute box-border flex flex-col border border-[rgba(219,219,219,0.14)] bg-[rgba(255,255,255,0.18)] p-[7px] backdrop-blur-[10px] ${className ?? ""}`}
      style={{ borderRadius: radius }}
    >
      <div
        className="relative min-h-0 min-w-0 flex-1 overflow-hidden"
        style={{ borderRadius: imageRadius }}
      >
        {children}
      </div>
    </div>
  );
}

const PANEL_EASE = EASE;
const PANEL_DURATION = 1.25; // was ~0.9, +0.35s
const MIDDLE_DELAY = 0.4;
const SIDES_DELAY = MIDDLE_DELAY + 0.2; // short beat after middle starts
// Hero bg hits 100% opacity 0.1s after collage images start appearing
const BG_FADE_DELAY = MIDDLE_DELAY;
const BG_FADE_DURATION = 0.1;

// Figma artboard — pin the phone's center to the hero midline
const ARTBOARD_W = 2012;
const MOBILE_LEFT = 706;
const MOBILE_W = 300;
const MOBILE_CENTER = MOBILE_LEFT + MOBILE_W / 2; // 856

function HeroCollage() {
  const sideTransition = {
    duration: PANEL_DURATION,
    delay: SIDES_DELAY,
    ease: PANEL_EASE,
  } as const;

  return (
    <div
      className="relative h-[633px] w-full overflow-hidden"
      aria-label="Circle product collage"
    >
      {/* Artboard anchored so phone center === hero center (asymmetric sides OK) */}
      <div
        className="absolute top-0 h-[633px]"
        style={{
          left: "50%",
          width: ARTBOARD_W,
          transform: `translateX(-${MOBILE_CENTER}px)`,
        }}
      >
        {/* Sides — animate together after middle */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={sideTransition}
          className="absolute inset-0"
        >
          {/* Video — top left */}
          <GlassFrame className="left-[5px] top-0 h-[308px] w-[685px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/collage/video.png"
              alt="Live session"
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
          </GlassFrame>

          {/* Chart — bottom left */}
          <GlassFrame className="left-0 top-[325px] h-[308px] w-[382px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/collage/chart.png"
              alt="Active members analytics"
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
          </GlassFrame>

          {/* Clarity coaching — bottom center-left */}
          <GlassFrame className="left-[398px] top-[325px] h-[308px] w-[292px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/collage/clarity.png"
              alt="1:1 Executive Coaching"
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
          </GlassFrame>

          {/* Desktop Feature UI — right */}
          <GlassFrame
            className="left-[1022px] top-[3px] h-[630px] w-[991px]"
            radius={16}
            imageRadius={10}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/collage/desktop.png"
              alt="Circle AI workspace"
              loading="lazy"
              className="absolute inset-0 size-full object-cover object-top-left"
            />
          </GlassFrame>
        </motion.div>

        {/* Middle — loads & animates first, always on hero center */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: PANEL_DURATION,
            delay: MIDDLE_DELAY,
            ease: PANEL_EASE,
          }}
          className="absolute top-0 z-10 h-[633px]"
          style={{ left: MOBILE_LEFT, width: MOBILE_W }}
        >
          <GlassFrame className="inset-0 h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/collage/mobile.png"
              alt="Discover+ mobile course"
              fetchPriority="high"
              loading="eager"
              className="absolute inset-0 size-full bg-white object-cover object-top"
            />
          </GlassFrame>
        </motion.div>
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const collageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex w-full flex-col items-stretch overflow-hidden bg-[#020c18]"
    >
      {/* Edge-to-edge hero photo — fades 0→100%, opaque 0.1s after collage starts */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: BG_FADE_DURATION,
          delay: BG_FADE_DELAY,
          ease: EASE,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero/bg.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover object-center"
        />
      </motion.div>

      {/* Main content locked to 1200 */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center px-[30px]">
        <div className="mt-[160px] flex w-full flex-col items-center gap-[64px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.14 } },
            }}
            className="flex w-full max-w-[800px] flex-col items-center gap-[32px]"
          >
            {[
              <RatingsPill key="ratings" />,
              <div
                key="text"
                className="flex w-full flex-col items-center gap-[20px] text-center"
              >
                <h1 className="font-display text-title-h1 w-full text-[#fafafa]">
                  The only durable business is a community.
                </h1>
                <p className="text-label-lg w-full text-[#fafafa]">
                  Courses, events, payments, all yours. Circle AI builds it — your
                  brand owns it.
                </p>
              </div>,
              <EmailField key="email" />,
            ].map((child, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 16,
                    ...(i === 1 ? { filter: "blur(8px)" } : {}),
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    ...(i === 1 ? { filter: "blur(0px)" } : {}),
                    transition: { duration: 1.05, ease: EASE },
                  },
                }}
              >
                {child}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Collage — middle first, then sides together */}
      <motion.div
        style={{ y: collageY }}
        className="relative z-[1] mx-auto mt-[64px] mb-[48px] w-full overflow-hidden"
      >
        <HeroCollage />
      </motion.div>
    </section>
  );
}
