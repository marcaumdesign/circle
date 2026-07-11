"use client";

import { motion } from "framer-motion";

const EASE = [0.23, 1, 0.32, 1] as const;

type Creator = {
  first: string;
  last: string;
  type: string;
  img: React.ReactNode;
  /* card exported with text baked in (Figma asset for the photo was empty) */
  baked?: boolean;
};

/* Crop values come straight from the Figma layer transforms */
const wideBase = (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/creators/wide-base.png"
    alt=""
    className="absolute h-[110.09%] left-[-100.41%] top-[-1.7%] w-[297.56%] max-w-none"
  />
);

const CREATORS: Creator[] = [
  {
    first: "Pat",
    last: "Flynn",
    type: "Productivity expert",
    img: (
      <>
        {wideBase}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/creators/pat.png"
          alt="Pat Flynn"
          className="absolute h-[105.4%] left-[-92.68%] top-[-5.24%] w-[285.37%] max-w-none"
        />
      </>
    ),
  },
  {
    first: "Dana",
    last: "Malstaff",
    type: "Productivity expert",
    img: (
      <>
        {wideBase}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/creators/dana.png"
          alt="Dana Malstaff"
          className="absolute h-[128.61%] left-[-33.74%] top-[-5.35%] w-[195.53%] max-w-none"
        />
      </>
    ),
  },
  {
    first: "Ruben",
    last: "Hassid",
    type: "#1 AI Educator",
    img: (
      <>
        <div className="absolute left-[-283px] top-0 h-[311px] w-[552px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/creators/ruben.png"
            alt="Ruben Hassid"
            className="absolute h-[117.69%] left-0 top-[-17.69%] w-full max-w-none"
          />
        </div>
        <div className="absolute bottom-0 left-0 h-[71px] w-full bg-black" />
      </>
    ),
  },
  {
    first: "Mila",
    last: "Clarke",
    type: "Productivity expert",
    baked: true,
    img: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/creators/mila-card.png"
        alt="Mila Clarke — Productivity expert"
        className="absolute inset-0 size-full max-w-none object-cover"
      />
    ),
  },
  {
    first: "Jay",
    last: "Shetty",
    type: "Productivity expert",
    img: (
      <>
        {wideBase}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/creators/jay.png"
          alt="Jay Shetty"
          className="absolute h-[150.27%] left-[-55.12%] top-[-5.61%] w-[210.25%] max-w-none"
        />
      </>
    ),
  },
  {
    first: "Gesche",
    last: "Haas",
    type: "Entrepreneur",
    img: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/creators/gesche.png"
        alt="Gesche Haas"
        className="absolute inset-0 size-full max-w-none object-cover"
      />
    ),
  },
  {
    first: "Ali",
    last: "Abdaal",
    type: "Productivity expert",
    img: wideBase,
  },
  {
    first: "Brendon",
    last: "Burchard",
    type: "High Performance Coach",
    img: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/creators/brendon.png"
        alt="Brendon Burchard"
        className="absolute inset-0 size-full max-w-none object-cover"
      />
    ),
  },
];

function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <div className="shrink-0 p-[8px]">
      <div className="group relative h-[374px] w-[246px] overflow-hidden rounded-[16px] bg-[#e4e7eb]">
        <div className="pointer-events-none absolute inset-0 origin-center select-none transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.08]">
          {creator.img}
        </div>
        {!creator.baked && (
          <>
            <div className="absolute inset-x-0 bottom-0 top-[221px] bg-gradient-to-b from-[rgba(51,51,51,0)] to-[rgba(51,51,51,0.33)] backdrop-blur-[32px] [mask-image:linear-gradient(to_bottom,transparent,black_40%)]" />
            <div className="absolute bottom-[24px] left-1/2 flex w-[198px] -translate-x-1/2 flex-col items-center gap-[4px]">
              <p className="font-display text-title-h4 w-[204px] text-center font-bold text-white">
                {creator.first}
                <br />
                {creator.last}
              </p>
              <p className="text-label-sm text-[#e4e7eb]">
                {creator.type}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Creators() {
  return (
    <section className="relative flex w-full flex-col items-center gap-[64px] overflow-hidden py-[64px]">
      {/* Blurred banner glow behind the cards */}
      <div className="pointer-events-none absolute left-1/2 top-[calc(50%+106px)] h-[287px] w-[1112px] -translate-x-1/2 -translate-y-1/2 opacity-[0.34] blur-[60px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/creators/banner-blur.png"
          alt=""
          className="size-full object-cover opacity-80"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative flex w-full max-w-[800px] flex-col items-center gap-[16px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/creators/star.svg" alt="" className="size-[24px] rotate-90" />
        <h2 className="font-display text-title-h2 w-full text-center text-black">
          Built for pros. Chosen by the best.
        </h2>
        <p className="text-label-lg w-full text-center text-[#777]">
          Get featured next to top creators like Ali Abdaal, Jay Shetty, and
          Brendon Burchard.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="creators-ticker-mask relative w-full"
      >
        <div className="creators-ticker flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {CREATORS.map((c) => (
                <CreatorCard key={`${copy}-${c.first}-${c.last}`} creator={c} />
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
