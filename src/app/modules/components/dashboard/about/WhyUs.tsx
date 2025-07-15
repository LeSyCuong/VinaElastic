"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

const features = [
  {
    id: 1,
    title: "Dịch vụ tận tâm",
    description:
      "Chúng tôi luôn lắng nghe và hỗ trợ khách hàng 24/7 với sự tận tình và chuyên nghiệp, mang đến trải nghiệm hài lòng nhất.",
  },
  {
    id: 2,
    title: "Chất lượng hàng đầu",
    description:
      "Sản phẩm và dịch vụ của chúng tôi được kiểm định nghiêm ngặt, tuân thủ các tiêu chuẩn quốc tế về chất lượng.",
  },
  {
    id: 3,
    title: "Giá cả cạnh tranh",
    description:
      "Cam kết mức giá hợp lý và cạnh tranh nhất thị trường, đảm bảo khách hàng luôn nhận được giá trị xứng đáng.",
  },
  {
    id: 4,
    title: "Đội ngũ chuyên nghiệp",
    description:
      "Đội ngũ nhân sự giàu kinh nghiệm, tận tâm và luôn học hỏi để phục vụ khách hàng tốt nhất.",
  },
  {
    id: 5,
    title: "Công nghệ hiện đại",
    description:
      "Chúng tôi ứng dụng công nghệ tiên tiến để tối ưu hóa quy trình và mang đến trải nghiệm vượt trội.",
  },
];

export default function WhyUs() {
  const [activeId, setActiveId] = useState<number>(features[0].id);
  const imageSrc = "/assets/images/items/4.jpg";

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="relative pb-30 mt-30 py-16 px-6 md:px-12 bg-gradient-to-br from-blue-50 via-white to-yellow-50 shadow-inner"
    >
      <div className="grid md:grid-cols-2 gap-10 items-start max-w-7xl mx-auto">
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative w-full h-[400px] rounded-4xl overflow-hidden shadow-xl"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={imageSrc}
                alt="Why Us"
                fill
                className="object-cover rounded-2xl"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Right Accordion */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="space-y-5"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Vì sao khách hàng chọn chúng tôi
          </h2>

          {features.map((feature) => {
            const isOpen = activeId === feature.id;

            return (
              <motion.div
                layout
                key={feature.id}
                className="border border-gray-200 rounded-2xl overflow-hidden shadow-md bg-white"
                transition={{ layout: { duration: 0.6, ease: "easeInOut" } }}
              >
                <motion.button
                  layout="position"
                  onClick={() => setActiveId(feature.id)}
                  className="cursor-pointer w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-50 transition"
                >
                  <span className="text-lg font-medium text-gray-800">
                    {feature.title}
                  </span>
                  <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.button>

                <AnimatePresence mode="wait">
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="px-6 overflow-hidden text-gray-700"
                    >
                      <div className="py-5">{feature.description}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
