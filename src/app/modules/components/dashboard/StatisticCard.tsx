"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

type Props = {
  label: string;
  value: number;
  suffix?: string;
  start?: boolean;
};

const StatisticCard = ({ label, value, suffix = "", start = false }: Props) => {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 30, stiffness: 60 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!start) return;
    motionValue.set(0);
    spring.set(value);
  }, [start, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => {
      setDisplay(`${Math.floor(v).toLocaleString()}${suffix}`);
    });
    return () => unsubscribe();
  }, [spring, suffix]);

  return (
    <div className="text-center">
      <motion.div className="text-xl font-bold text-black">
        {display}
      </motion.div>
      <div className="text-gray-600 text-sm mt-1">{label}</div>
    </div>
  );
};

export default StatisticCard;
