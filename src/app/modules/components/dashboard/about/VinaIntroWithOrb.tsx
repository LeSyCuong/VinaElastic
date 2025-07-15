"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Orb from "@/app/components/Orb";

const VinaIntroWithOrb = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px 0px",
  });

  return (
    <div
      ref={ref}
      className="px-10 mt-200 flex flex-col md:flex-row items-center justify-between md:gap-16 gap-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="md:w-1/2 text-left ml-10"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Vina Elastic</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Chúng Tôi cam kết đặt đạo đức, chất lượng và đổi mới làm cốt lõi –
          mang đến giải pháp may mặc, đóng gói và dịch vụ tích hợp, khác biệt
          trên thị trường. Khởi đầu từ năm 2022 với một nhà máy nhỏ, chúng tôi
          không ngừng mở rộng và đổi mới để thiết lập tiêu chuẩn mới về độ tin
          cậy và hiệu suất.
          <br />
          <br />
          <strong>One World, One Vina Elastic.</strong>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
        }
        transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
        className="relative w-150 h-150"
      >
        <div className="absolute inset-0 z-[1] flex items-center justify-center group">
          <div className="w-80 h-80 relative transition-transform duration-300 ease-in-out group-hover:scale-110">
            <Image
              src="/assets/images/logo.png"
              alt="Logo background"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="absolute inset-0 z-[2] flex items-center justify-center">
          <div className="w-100 h-100">
            <Orb
              hoverIntensity={0.3}
              rotateOnHover={true}
              hue={0}
              forceHoverState={false}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VinaIntroWithOrb;
