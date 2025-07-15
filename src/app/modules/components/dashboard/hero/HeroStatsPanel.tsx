"use client";

import { motion } from "framer-motion";
import StatisticCard from "../StatisticCard";

type Props = {
  startCount: boolean;
  setStartCount: (val: boolean) => void;
};

const HeroStatsPanel = ({ startCount, setStartCount }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 1.6 }}
      onAnimationComplete={() => setStartCount(true)}
      className="absolute top-[85%] left-1/2 transform -translate-x-1/2 w-full bg-[var(--background)] rounded-t-[100px] py-10 px-6 z-30"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-center -mt-5 mb-8">
          <StatisticCard
            label="Doanh thu"
            value={2333}
            suffix=" KUSD"
            start={startCount}
          />
          <StatisticCard
            label="Quy mô sản xuất"
            value={2000}
            suffix=" tấn"
            start={startCount}
          />
          <StatisticCard
            label="Nhân sự"
            value={40}
            suffix="+"
            start={startCount}
          />
          <StatisticCard
            label="Hiệu suất"
            value={95}
            suffix="%"
            start={startCount}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default HeroStatsPanel;
