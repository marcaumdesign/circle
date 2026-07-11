"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Nav from "./Nav";

const EASE = [0.23, 1, 0.32, 1] as const;

function RatingsPill() {
  return (
    <div className="flex items-center gap-[12px] rounded-full border border-[#484b73] bg-white/10 py-[6px] pl-[6px] pr-[12px] backdrop-blur-[6px]">
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
          <img key={i} src="/hero/star1.svg" alt="" className="size-[16px]" />
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero/star5.svg" alt="" className="size-[18px]" />
        <span className="pl-[6px] text-[16px] font-medium leading-[24px] tracking-[-0.25px] text-[#fafafa]">
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
        className="min-w-0 flex-1 bg-transparent text-[16px] font-medium leading-[20px] tracking-[-0.25px] text-[#171717] outline-none placeholder:text-[#737373]"
        aria-label="Email address"
      />
      <button
        type="submit"
        className="mn-pressable flex h-full shrink-0 items-center justify-center rounded-full px-[32px] py-[12px] text-[16px] font-semibold leading-[20px] tracking-[-0.25px] text-[#fafafa] transition-[filter] duration-200 hover:brightness-110"
        style={{
          backgroundImage: submitted
            ? "linear-gradient(163.76deg, #1daf61 18.675%, #178c4e 78.249%)"
            : "linear-gradient(163.76deg, #408fed 18.675%, #3e1bc9 78.249%)",
        }}
      >
        {submitted ? "You're on the list ✓" : "Get started for free"}
      </button>
    </form>
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
      className="relative h-[1151px] w-full overflow-hidden bg-white"
    >
      {/* Rounded gradient background */}
      <div className="absolute inset-x-1/2 top-0 h-[1129px] w-[1479px] -translate-x-1/2 overflow-hidden rounded-b-[24px] bg-[#020c18]">
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/bg.jpg"
            alt=""
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto w-[1440px]">
        <Nav />

        <div className="mt-[88px] flex flex-col items-center gap-[64px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.09 } },
            }}
            className="flex w-[800px] flex-col items-center gap-[32px]"
          >
            {[
              <RatingsPill key="ratings" />,
              <div key="text" className="flex w-full flex-col items-center gap-[20px] text-center">
                <h1 className="font-display w-full text-[64px] font-medium leading-[64px] tracking-[-1.5px] text-[#fafafa]">
                  The only durable business is a community.
                </h1>
                <p className="w-full text-[18px] font-medium leading-[24px] tracking-[-0.25px] text-[#fafafa]">
                  Courses, events, payments, all yours. Circle AI builds it — your
                  brand owns it.
                </p>
              </div>,
              <EmailField key="email" />,
            ].map((child, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: EASE },
                  },
                }}
              >
                {child}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            style={{ y: collageY }}
            className="h-[597px] w-[1440px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/collage.png"
              alt="Circle product interface collage"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
