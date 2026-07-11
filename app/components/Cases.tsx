"use client";

import { motion } from "framer-motion";

const EASE = [0.23, 1, 0.32, 1] as const;

/* Story card renders: first/last are the edge cards clipped by the frame in
   the design — exported exactly as they appear. */
const STORIES = [
  { src: "/cases/story1.png", w: 231, align: "right" as const, alt: "Boss Mom — 70%+ course completion rates" },
  { src: "/cases/story2.png", w: 298, alt: "Boss Mom — 70%+ course completion rates" },
  { src: "/cases/story3.png", w: 298, alt: "Ali Abdaal — $1M+ unique signups in the first day" },
  { src: "/cases/story4.png", w: 298, alt: "Glucose Guide — 300+ unique signups in the first day" },
  { src: "/cases/story5.png", w: 231, align: "left" as const, alt: "Jay Shetty Certification School — $700K+ in bootstrapped revenue" },
];

const METRICS = [
  { value: "$120M", caption: "Revenue generated\nfor creators" },
  { value: "6.7M", caption: "Active members\nacross communities" },
  { value: "2.68x", caption: "Member growth for\ntop communities" },
];

export default function Cases() {
  return (
    <section className="flex w-full flex-col items-center overflow-hidden pt-[64px]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex w-[1200px] items-start justify-between"
      >
        <h2 className="font-display w-[548px] text-[48px] font-medium leading-[52px] tracking-[-0.5px] text-black">
          Loved by community leaders. Recognized for excellence.
        </h2>
        <div className="flex w-[389px] flex-col gap-[40px]">
          <p className="text-[16px] leading-[24px] tracking-[-0.2px] text-[#5c5c5c]">
            Own your member data, your roadmap, and your growth, instead of
            renting reach from a platform that isn&rsquo;t built for you.
          </p>
          <div className="flex items-center gap-[12px]">
            <a
              href="#"
              className="mn-pressable flex items-center justify-center rounded-full bg-[#335cff] px-[24px] py-[11px] text-[15px] font-semibold leading-[20px] tracking-[-0.2px] text-white transition-[filter] duration-200 hover:brightness-110"
            >
              Start free trial
            </a>
            <a
              href="#"
              className="mn-pressable flex items-center justify-center rounded-full border border-[#e5e5e5] bg-white px-[24px] py-[11px] text-[15px] font-semibold leading-[20px] tracking-[-0.2px] text-[#171717] transition-colors duration-200 hover:bg-[#f5f5f5]"
            >
              Open Cases
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-140px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="mt-[98px] flex w-[1440px] items-start justify-between"
      >
        {STORIES.map((story) => (
          <motion.div
            key={story.src}
            variants={{
              hidden: { opacity: 0, y: 32 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
            whileHover={{ y: -8 }}
            className="shrink-0"
            style={{ width: story.w }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={story.src} alt={story.alt} className="h-[467px] w-full" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-[64px] mt-[98px] flex w-[1200px] items-start justify-between"
      >
        <div className="flex flex-col gap-[35px]">
          <p className="text-[14px] font-medium leading-[20px] text-[#171717]">
            Recognized as a G2 Leader
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cases/g2-badges.png"
            alt="G2 badges — Grid Leader, Best Usability, Most Implementable, Best Results"
            className="h-[103px] w-[511px]"
          />
        </div>
        <div className="flex w-[469px] flex-col gap-[35px]">
          <p className="text-[14px] font-medium leading-[20px] text-[#171717]">
            Numbers don&rsquo;t lie
          </p>
          <div className="flex items-start justify-between">
            {METRICS.map((m) => (
              <div key={m.value} className="flex w-[140px] flex-col gap-[8px]">
                <p className="font-display text-[32px] font-medium leading-[36px] tracking-[-0.5px] text-[#171717]">
                  {m.value}
                </p>
                <p className="whitespace-pre-line text-[14px] leading-[21px] text-[#7b7b7b]">
                  {m.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
