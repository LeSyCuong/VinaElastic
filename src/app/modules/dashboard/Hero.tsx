"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroVideo from "../components/dashboard/hero/HeroVideo";
import HeroHeading from "../components/dashboard/hero/HeroHeading";
import HeroStatsPanel from "../components/dashboard/hero/HeroStatsPanel";
import AboutSection from "./AboutSection";
import ContactFormModal from "@/app/components/ContactFormModal";

const Hero = () => {
  const [showContent, setShowContent] = useState(false);
  const [showPanels, setShowPanels] = useState(true);
  const [startCount, setStartCount] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowPanels(false), 1400);
    const timer2 = setTimeout(() => setShowContent(true), 1500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      <section className="white-section relative max-w-screen h-screen px-10 flex items-center ">
        <HeroVideo showPanels={showPanels} />
        <HeroStatsPanel setStartCount={setStartCount} startCount={startCount} />
        {showContent && (
          <div className="relative z-40 mt-5 max-w-2xl w-full flex flex-col items-center text-white mx-auto text-center">
            <HeroHeading />

            <motion.span
              className="inline-block mt-8 px-6 py-3 bg-white text-black rounded-full text-sm font-medium cursor-pointer hover:bg-black hover:text-white transition-colors duration-500"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.4,
                ease: [0.25, 0.25, 0.25, 1],
              }}
              onClick={() => setShowFormModal(true)}
            >
              Hợp tác cùng chúng tôi
            </motion.span>
          </div>
        )}
      </section>
      <AboutSection />
      <ContactFormModal
        visible={showFormModal}
        onClose={() => setShowFormModal(false)}
      />
    </>
  );
};

export default Hero;
