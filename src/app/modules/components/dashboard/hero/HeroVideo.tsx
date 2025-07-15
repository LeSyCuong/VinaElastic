"use client";

import { useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Orb from "@/app/components/Orb";

const HeroVideo = ({ showPanels }: { showPanels: boolean }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <>
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/videos/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-transparent pointer-events-auto" />
      </div>

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 4, ease: "easeOut", delay: 0.5 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 w-130 h-130 z-10"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-130 h-130">
            <Orb
              hoverIntensity={0.3}
              rotateOnHover={true}
              hue={0}
              forceHoverState={false}
            />
          </div>
        </div>
      </motion.div>

      {/* Animated Panels */}
      <AnimatePresence>
        {showPanels && (
          <>
            <motion.div
              className="absolute left-0 top-0 h-full bg-white z-20"
              initial={{ width: "50%" }}
              animate={{ width: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-0 top-0 h-full bg-white z-20"
              initial={{ width: "50%" }}
              animate={{ width: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeroVideo;
