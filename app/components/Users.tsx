"use client";

import { motion } from "framer-motion";

const EASE = [0.23, 1, 0.32, 1] as const;

const PERSONAS = [
  {
    img: "/users/persona-creators.png",
    title: "Creators",
    color: "#7d52f4",
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
    img: "/users/persona-educators.png",
    title: "Educators",
    color: "#1daf9c",
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
    img: "/users/persona-builders.png",
    title: "Community Builders",
    color: "#e16614",
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

export default function Users() {
  return (
    <section className="flex w-full flex-col items-center pt-[64px]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex w-[800px] flex-col items-center gap-[16px] text-center"
      >
        <h2 className="font-display whitespace-nowrap text-[48px] font-medium leading-[52px] tracking-[-0.5px] text-black">
          Wherever you lead, Circle keeps up.
        </h2>
        <p className="text-[18px] font-medium leading-[24px] tracking-[-0.25px] text-[#777]">
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
            <motion.img
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: EASE }}
              src={p.img}
              alt={p.title}
              className="size-[375px]"
            />
            <div className="mt-[33px] flex w-[304px] flex-col gap-[25px]">
              <div className="flex items-center gap-[8px]" style={{ color: p.color }}>
                {p.icon}
                <span className="text-[16px] font-medium leading-[20px] text-[#171717]">
                  {p.title}
                </span>
              </div>
              <p className="text-[14px] leading-[20px] tracking-[-0.1px] text-[#5c5c5c]">
                {p.quote}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.img
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-160px" }}
        transition={{ duration: 0.9, ease: EASE }}
        src="/users/illustration.png"
        alt="Circle — 20K+ community owners, 4.9% average churn"
        className="mt-[64px] w-[1440px] max-w-none"
      />
    </section>
  );
}
