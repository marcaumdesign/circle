"use client";

import { motion } from "framer-motion";

const LOGOS = [
  { src: "/logos/miro.svg", alt: "Miro", w: 80, h: 30 },
  { src: "/logos/aliabdaal.svg", alt: "Ali Abdaal", w: 128, h: 30 },
  { src: "/logos/harvard.svg", alt: "Harvard", w: 90, h: 24 },
  { src: "/logos/timferriss.svg", alt: "Tim Ferriss", w: 120, h: 30 },
  { src: "/logos/obama.svg", alt: "Obama Foundation", w: 111, h: 26 },
  { src: "/logos/goodinside.svg", alt: "Good Inside", w: 70, h: 30 },
  { src: "/logos/codecademy.svg", alt: "Codecademy", w: 119, h: 25 },
  { src: "/logos/melrobbins.svg", alt: "Mel Robbins", w: 90, h: 28 },
];

export default function LogosStrip() {
  return (
    <section className="flex flex-col items-center gap-[32px] px-[32px] py-[64px]">
      <p className="text-center text-[16px] font-medium leading-[24px] tracking-[-0.25px] text-black opacity-60">
        Trusted by the world&rsquo;s top communities
      </p>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        className="flex items-center justify-center gap-[44px] opacity-60"
      >
        {LOGOS.map((logo) => (
          <motion.img
            key={logo.alt}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
            }}
            src={logo.src}
            alt={logo.alt}
            width={logo.w}
            height={logo.h}
            className="shrink-0"
          />
        ))}
      </motion.div>
    </section>
  );
}
