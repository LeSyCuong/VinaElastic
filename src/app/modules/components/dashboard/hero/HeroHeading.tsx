"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const text = "VINA ELASTIC\nGROUP";

const letterAnimation = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.05 },
  }),
};

const HeroHeading = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <h1
      ref={ref}
      className="text-5xl font-bold leading-tight text-white max-w-[450px] break-words text-center mx-auto"
    >
      {text.split("").map((char, index) => {
        if (char === "\n") {
          return <br key={index} />;
        }

        return (
          <motion.span
            key={index}
            custom={index}
            variants={letterAnimation}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="whitespace-pre"
          >
            {char}
          </motion.span>
        );
      })}
    </h1>
  );
};

export default HeroHeading;
