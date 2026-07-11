import type { CSSProperties } from "react";

/**
 * Animated "network" illustration (Figma node 2199:17536).
 * Data pulses travel along the top lines INTO the Circle logo, then broadcast
 * OUT along the bottom lines to the feature pills, flashing each pill's
 * outline on arrival. Pulse colors cycle through the four Features colors
 * (lightened).
 */

const GREY = "#e5e5e5";
/** Lightened versions of the Features section colors. */
const PULSE_COLORS = ["#9a78ff", "#ff944d", "#5c8aff", "#48cc86"];

/** Animation cycle. Keep in sync with `users-net-*` keyframes in globals.css. */
const PERIOD = 6.4;
/** Pulses travel the full line during the first 40% of the cycle. */
const TRAVEL = PERIOD * 0.4;
/** Comet tail: 3 segments (fewer animated paths = lighter), 7 units long,
    spaced 6.5 units. Keep the dash length in sync with `users-net-pulse`. */
const TAIL_SEGMENTS = [1, 0.55, 0.18];
const SEGMENT_SPACING_S = (6.5 / 100) * TRAVEL;

/** Blend a hex color toward the line grey (the Figma pulse-gradient look). */
function towardGrey(hex: string, amount: number) {
  const channel = (c: string, g: number) =>
    Math.round(parseInt(c, 16) * amount + g * (1 - amount))
      .toString(16)
      .padStart(2, "0");
  return `#${channel(hex.slice(1, 3), 0xe5)}${channel(hex.slice(3, 5), 0xe5)}${channel(hex.slice(5, 7), 0xe5)}`;
}

/** Centerlines extracted from the Figma outline paths, drawn toward the logo. */
const TOP_LINES = [
  {
    d: "M6.2 1.6 C6.2 46.6 32.6 80.3 72.6 108.9 C112.6 137.5 166 161 219.3 185.7 C272.6 210.3 325.8 236.1 365.8 269.2 C405.7 302.3 432.2 342.7 432.2 396.4",
    delay: 0,
  },
  {
    d: "M471 0 L471 398",
    delay: 0.73,
  },
  {
    d: "M935.7 1.6 C935.7 46.6 909.4 80.3 869.3 108.9 C829.3 137.5 775.9 161 722.7 185.7 C669.3 210.3 616.1 236.1 576.2 269.2 C536.2 302.3 509.7 342.7 509.7 396.4",
    delay: 1.4,
  },
];

/** Same geometry as the Figma "Lines" group (flipped), drawn from the logo out. */
const BOTTOM_LINES = [
  "M192.3 0 C187.8 12.9 174.7 22.3 157 30.1 C139.3 37.9 117.3 44 95.4 50.6 C73.5 57.2 51.7 64.2 34.5 73.7 C17.3 83.2 4.7 95.2 1.2 111.9",
  "M198.2 1.5 C194.4 19.4 181.7 31.7 165 41.8 C148.3 51.9 127.7 59.7 108.2 68.7 C88.7 77.7 70.4 87.9 58.2 102.9 C46.1 117.9 40.2 137.5 45.8 165.3",
  "M204.3 4.1 C202.3 37.3 178.2 54.6 153.6 68.3 C141.3 75.1 128.8 81.1 118.9 87.6 C109 94.2 101.7 101.5 99.8 111.1",
  "M210.1 2.8 C210.1 25.4 205.8 41.2 199.6 53.7 C193.3 66.2 185 75.3 176.9 84.4 C168.7 93.5 160.7 102.7 155.2 115.2 C149.7 127.8 146.6 143.6 148.2 166.2",
  "M215.5 2.2 L215.5 137.2",
  "M221.1 2.8 C221.1 25.4 225.4 41.2 231.7 53.7 C237.9 66.2 246.2 75.3 254.4 84.4 C262.5 93.5 270.5 102.7 276 115.2 C281.6 127.8 284.6 143.6 283 166.2",
  "M227 4.1 C229 37.3 253 54.6 277.7 68.3 C290 75.1 302.5 81.1 312.4 87.6 C322.2 94.2 329.6 101.5 331 111.2",
  "M233 1.5 C236.9 19.4 249.6 31.7 266.2 41.8 C282.9 51.9 303.5 59.7 323 68.7 C342.5 77.7 360.9 87.9 373 102.9 C385.2 117.9 391 137.5 385 165.2",
  "M239 0 C243.4 12.9 256.6 22.3 274.2 30.1 C291.9 37.9 313.9 44 335.8 50.6 C357.7 57.2 379.6 64.2 396.7 73.7 C413.9 83.2 426.6 95.2 429.5 112",
];

/* Bottom pulses leave right as the top pulses reach the logo (~2.6s travel). */
const BOTTOM_DELAYS = [2.8, 3.27, 3.0, 3.47, 2.67, 3.07, 2.87, 3.4, 3.2];

/* Fan order: even bottom lines land on the first pill row, odd on the second. */
const PILLS_ROW_1 = ["Events", "AI Agents", "Community", "Courses", "CRM"].map(
  (label, i) => ({ label, line: i * 2 }),
);

const PILLS_ROW_2 = [
  { label: "Email marketing", left: 0, line: 1 },
  { label: "Payments", left: 154, line: 3 },
  { label: "Live video", left: 266, line: 5 },
  { label: "Website builder", left: 380, line: 7 },
];

/**
 * A comet-style pulse: the head segment is the full color and each trailing
 * segment is delayed a touch (= sits further back on the path) and blended
 * toward grey, recreating the Figma grey→color linear gradient along the line.
 */
function Pulse({ d, color, delay }: { d: string; color: string; delay: number }) {
  return (
    <>
      {TAIL_SEGMENTS.map((strength, k) => (
        <path
          key={k}
          d={d}
          pathLength={100}
          strokeWidth="1.5"
          className="users-net-pulse"
          style={
            {
              color: towardGrey(color, strength),
              "--net-delay": `${delay + k * SEGMENT_SPACING_S}s`,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}

function Star() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 22.4423 22.6745"
      fill="none"
      className="shrink-0 rotate-90"
      aria-hidden
    >
      <path
        d="M10.7972 0.312071C10.9267 -0.104024 11.5156 -0.104023 11.6451 0.312071L14.0841 8.14911C14.1272 8.28751 14.2351 8.39617 14.3732 8.4402L22.1331 10.9142C22.5453 11.0456 22.5453 11.6289 22.1331 11.7603L14.3732 14.2343C14.2351 14.2783 14.1272 14.387 14.0841 14.5254L11.6451 22.3624C11.5156 22.7785 10.9267 22.7785 10.7972 22.3624L8.35814 14.5254C8.31507 14.387 8.20716 14.2783 8.06906 14.2343L0.309144 11.7603C-0.103046 11.6289 -0.103048 11.0456 0.309142 10.9142L8.06906 8.4402C8.20715 8.39617 8.31507 8.28751 8.35814 8.14911L10.7972 0.312071Z"
        fill="#4661E5"
      />
    </svg>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex w-[136px] shrink-0 flex-col gap-[8px]">
      <div className="flex items-center gap-[8px]">
        <Star />
        <p className="font-display text-[40px] font-medium leading-[52px] tracking-[-0.5px] text-black">
          {value}
        </p>
      </div>
      <p className="text-label-sm text-[#6c6c6c]">{label}</p>
    </div>
  );
}

function Topic({
  children,
  left,
  line,
}: {
  children: string;
  left?: number;
  line: number;
}) {
  /* Outline flashes in the pulse color the moment its line's pulse arrives. */
  const arrival = BOTTOM_DELAYS[line] + TRAVEL;
  return (
    <div
      className={`users-net-tab flex h-[36px] shrink-0 items-center justify-center rounded-[30px] border border-[#e5e5e5] bg-white px-[14px] shadow-[0px_4px_5px_rgba(0,0,0,0.06)] ${
        left !== undefined ? "absolute top-0" : ""
      }`}
      style={
        {
          left,
          "--net-delay": `${arrival}s`,
          "--tab-color": PULSE_COLORS[line % 4],
        } as CSSProperties
      }
    >
      <p className="text-label-sm whitespace-nowrap text-[#0a0a0a]">{children}</p>
    </div>
  );
}

export default function UsersNetwork() {
  return (
    <div className="relative h-[611px] w-[942px]" aria-label="Circle — 20K+ community owners, 4.9% average churn">
      {/* Soft color glow behind everything (Figma "Blur"). The blur is baked
          into the tiny source image (stretched ~13x) and a static gradient
          mask feathers the edges, so no live CSS filter. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[334px] w-[1589px] -translate-x-1/2 -translate-y-1/2 -scale-y-100 opacity-30 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_45%,transparent_100%)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/users/network/blur.png" alt="" className="size-full max-w-none object-cover" />
      </div>

      {/* Top lines — information flows into the logo */}
      <svg
        className="absolute left-1/2 top-0 h-[398px] w-[941.927px] -translate-x-1/2 overflow-visible"
        viewBox="0 0 941.927 398"
        fill="none"
        aria-hidden
      >
        {TOP_LINES.map((line) => (
          <path key={line.d} d={line.d} stroke={GREY} strokeWidth="0.955" strokeMiterlimit="10" />
        ))}
        {TOP_LINES.map((line, i) => (
          <Pulse key={line.d} d={line.d} color={PULSE_COLORS[i % 4]} delay={line.delay} />
        ))}
      </svg>

      {/* Center — stats + Circle logo */}
      <div className="absolute left-1/2 top-[158px] flex -translate-x-1/2 items-center gap-[50px]">
        <Stat value="20K+" label="community owners" />
        <div className="relative size-[257px] shrink-0 overflow-hidden rounded-full bg-linear-to-b from-[#506cf0] to-[#0b23a2]">
          <div className="absolute left-[calc(50%+0.67px)] top-[calc(50%+0.71px)] h-[152.65px] w-[147.374px] -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-[0_-4.22%_-9.9%_-4.39%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/users/network/circle-c.svg" alt="Circle" className="block size-full max-w-none" />
            </div>
          </div>
        </div>
        <Stat value="4,9%" label="of average churn" />
      </div>

      {/* Bottom — information broadcast out to the feature pills */}
      <div className="absolute left-1/2 top-[413px] h-[198px] w-[516px] -translate-x-1/2">
        <svg
          className="absolute left-1/2 top-0 h-[166.197px] w-[431.244px] -translate-x-1/2 overflow-visible"
          viewBox="0 0 431.244 166.197"
          fill="none"
          aria-hidden
        >
          {BOTTOM_LINES.map((d) => (
            <path key={d} d={d} stroke={GREY} strokeWidth="1" strokeMiterlimit="10" />
          ))}
          {BOTTOM_LINES.map((d, i) => (
            <Pulse key={d} d={d} color={PULSE_COLORS[i % 4]} delay={BOTTOM_DELAYS[i]} />
          ))}
        </svg>

        <div className="absolute left-1/2 top-[111px] flex -translate-x-1/2 items-center gap-[16px]">
          {PILLS_ROW_1.map((pill) => (
            <Topic key={pill.label} line={pill.line}>
              {pill.label}
            </Topic>
          ))}
        </div>
        <div className="absolute left-0 top-[162px] h-[36px] w-[516px]">
          {PILLS_ROW_2.map((pill) => (
            <Topic key={pill.label} left={pill.left} line={pill.line}>
              {pill.label}
            </Topic>
          ))}
        </div>
      </div>
    </div>
  );
}
