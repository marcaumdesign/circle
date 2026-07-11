"use client";

import { MotionGlobalConfig } from "framer-motion";

/* ponytail: dev/test helper — `?nomotion` skips all animations so visual
   diffs and screenshot tools see final states */
if (
  typeof window !== "undefined" &&
  window.location.search.includes("nomotion")
) {
  MotionGlobalConfig.skipAnimations = true;
}

export default function MotionKillSwitch() {
  return null;
}
