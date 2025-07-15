"use client";

import React from "react";
import dynamic from "next/dynamic";
import { hyperspeedPresets } from "@/app/lib/hyperspeedPresets";

const Hyperspeed = dynamic(() => import("@/app/components/Hyperspeed"), {
  ssr: false,
});

const HyperspeedContainer = () => {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Hyperspeed effectOptions={hyperspeedPresets.one} />
    </div>
  );
};

export default HyperspeedContainer;
