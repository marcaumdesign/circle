"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.23, 1, 0.32, 1] as const;

type Story = {
  id: string;
  photo: string;
  photoClass: string;
  logo: string;
  logoW: number;
  logoH: number;
  bg: string;
  scrim: string;
  value: number;
  prefix?: string;
  suffix: string;
  decimals?: number;
  caption: string;
  alt: string;
};

const STORIES: Story[] = [
  {
    id: "articulate",
    photo: "/cases/photos/gesche.png",
    photoClass: "object-cover object-[50%_20%]",
    logo: "/cases/logos/articulate.png",
    logoW: 125.1,
    logoH: 22.75,
    bg: "#3f5057",
    scrim: "from-transparent from-[30%] to-black",
    value: 37,
    prefix: "$",
    suffix: "K+",
    caption: "monthly revenue from coach",
    alt: "Articulate — $37K+ monthly revenue from coach",
  },
  {
    id: "bossmom",
    photo: "/cases/photos/bossmom.png",
    photoClass: "absolute left-[calc(50%+45px)] top-[-29px] size-[548px] max-w-none -translate-x-1/2 object-cover",
    logo: "/cases/logos/bossmom.png",
    logoW: 164.8,
    logoH: 24.41,
    bg: "#f0f3f5",
    scrim: "from-transparent from-[30%] to-[#24233c]",
    value: 70,
    suffix: "%+",
    caption: "course completion rates",
    alt: "Boss Mom — 70%+ course completion rates",
  },
  {
    id: "ali",
    photo: "/cases/photos/ali.png",
    photoClass: "absolute left-[-334px] top-[-4px] h-[534px] w-[949px] max-w-none object-cover",
    logo: "/cases/logos/ali.png",
    logoW: 169.57,
    logoH: 31.39,
    bg: "#f0f3f5",
    scrim: "from-transparent from-[30%] to-[#cd9ab0]",
    value: 1,
    prefix: "$",
    suffix: "M+",
    caption: "Unique signups in the first day",
    alt: "Ali Abdaal — $1M+ unique signups in the first day",
  },
  {
    id: "glucose",
    photo: "/cases/photos/mila.png",
    photoClass: "absolute left-[calc(50%+47px)] top-[-4px] h-[553px] w-[830px] max-w-none -translate-x-1/2 object-cover",
    logo: "/cases/logos/glucose.png",
    logoW: 179,
    logoH: 30,
    bg: "#f0f3f5",
    scrim: "from-transparent from-[30%] to-[#b68a77]",
    value: 300,
    suffix: "+",
    caption: "Unique signups in the first day",
    alt: "Glucose Guide — 300+ unique signups in the first day",
  },
  {
    id: "jay",
    photo: "/cases/photos/jay.png",
    photoClass: "absolute left-[calc(50%-10px)] top-[-17px] h-[668px] w-[614px] max-w-none -translate-x-1/2 object-cover",
    logo: "/cases/logos/jay.png",
    logoW: 170.3,
    logoH: 38.36,
    bg: "#f0f3f5",
    scrim: "from-transparent from-[30%] to-[#b5ad9c]",
    value: 700,
    prefix: "$",
    suffix: "K+",
    caption: "in bootstrapped revenue",
    alt: "Jay Shetty Certification School — $700K+ in bootstrapped revenue",
  },
];

type Metric = {
  value: number;
  prefix?: string;
  suffix: string;
  decimals?: number;
  caption: string;
};

const METRICS: Metric[] = [
  { value: 120, prefix: "$", suffix: "M", caption: "Revenue generated\nfor creators" },
  { value: 6.7, suffix: "M", decimals: 1, caption: "Active members\nacross communities" },
  { value: 2.68, suffix: "x", decimals: 2, caption: "Member growth for\ntop communities" },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(
  target: number,
  active: boolean,
  { duration = 1600, decimals = 0 }: { duration?: number; decimals?: number } = {},
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(target * easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function formatCount(
  value: number,
  {
    prefix = "",
    suffix = "",
    decimals = 0,
  }: { prefix?: string; suffix?: string; decimals?: number },
) {
  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString("en-US");
  return `${prefix}${formatted}${suffix}`;
}

function StoryCard({ story, animate }: { story: Story; animate: boolean }) {
  const counted = useCountUp(story.value, animate, {
    decimals: story.decimals ?? 0,
    duration: 1400,
  });

  return (
    <article
      className="cases-story group relative h-[467px] w-[298px] shrink-0 overflow-hidden rounded-[21px]"
      style={{ backgroundColor: story.bg }}
      aria-label={story.alt}
    >
      <div className="cases-story-media absolute inset-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={story.photo}
          alt=""
          aria-hidden
          className={
            story.photoClass.includes("absolute")
              ? story.photoClass
              : `absolute inset-0 size-full ${story.photoClass}`
          }
        />
      </div>

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-[312px] bg-gradient-to-b ${story.scrim}`}
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-[16px] px-[22px] pb-[24px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={story.logo}
          alt=""
          aria-hidden
          className="object-contain object-left"
          style={{ width: story.logoW, height: story.logoH }}
        />
        <div className="h-px w-full bg-white/20" aria-hidden />
        <div className="flex w-[197px] flex-col gap-[9px] text-[#fafafa]">
          <p className="font-display text-[32px] font-semibold leading-[21px] tracking-[-0.22px]">
            {formatCount(counted, {
              prefix: story.prefix,
              suffix: story.suffix,
              decimals: story.decimals,
            })}
          </p>
          <p className="text-[14px] font-medium leading-[21px] tracking-[-0.22px]">
            {story.caption}
          </p>
        </div>
      </div>
    </article>
  );
}

function MetricStat({ metric, active }: { metric: Metric; active: boolean }) {
  const counted = useCountUp(metric.value, active, {
    decimals: metric.decimals ?? 0,
    duration: 1800,
  });

  return (
    <div className="flex w-[140px] flex-col gap-[8px]">
      <p className="font-display text-title-h4 text-[#171717]">
        {formatCount(counted, {
          prefix: metric.prefix,
          suffix: metric.suffix,
          decimals: metric.decimals,
        })}
      </p>
      <p className="text-paragraph-sm whitespace-pre-line text-[#7b7b7b]">
        {metric.caption}
      </p>
    </div>
  );
}

export default function Cases() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const tickerInView = useInView(tickerRef, { once: true, margin: "-80px" });
  const metricsInView = useInView(metricsRef, { once: true, margin: "-80px" });

  return (
    <section className="flex w-full flex-col items-center overflow-hidden pt-[64px]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex w-[1200px] items-start justify-between"
      >
        <h2 className="font-display text-title-h2 w-[548px] text-black">
          Loved by community leaders. Recognized for excellence.
        </h2>
        <div className="flex w-[389px] flex-col gap-[40px]">
          <p className="text-paragraph-md text-[#5c5c5c]">
            Own your member data, your roadmap, and your growth, instead of
            renting reach from a platform that isn&rsquo;t built for you.
          </p>
          <div className="flex items-center gap-[12px]">
            <a
              href="#"
              className="text-label-md mn-btn-primary mn-pressable flex items-center justify-center rounded-full px-[24px] py-[11px] font-semibold text-white"
            >
              Start free trial
            </a>
            <a
              href="#"
              className="text-label-md mn-pressable flex items-center justify-center rounded-full border border-[#e5e5e5] bg-white px-[24px] py-[11px] font-semibold text-[#171717] hover:bg-[#f5f5f5]"
            >
              Open Cases
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        ref={tickerRef}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="cases-ticker-mask mt-[98px] w-full"
      >
        <div className="cases-ticker flex w-max gap-[21px] px-[21px]">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center gap-[21px]"
              aria-hidden={copy === 1}
            >
              {STORIES.map((story) => (
                <StoryCard
                  key={`${copy}-${story.id}`}
                  story={story}
                  animate={tickerInView && copy === 0}
                />
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        ref={metricsRef}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-[64px] mt-[98px] flex w-[1200px] items-start justify-between"
      >
        <div className="flex flex-col gap-[35px]">
          <p className="text-label-sm text-[#171717]">
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
          <p className="text-label-sm text-[#171717]">
            Numbers don&rsquo;t lie
          </p>
          <div className="flex items-start justify-between">
            {METRICS.map((m) => (
              <MetricStat key={m.caption} metric={m} active={metricsInView} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
