"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import ButtonGroup from "@/app/components/ButtonGroup";
import { AnimatePresence, motion, useInView } from "framer-motion";

const productGroups = [
  [
    { id: 1, src: "/assets/images/items/4.jpg", name: "Tạo hạt 1" },
    { id: 2, src: "/assets/images/items/4.jpg", name: "Tạo hạt 2" },
    { id: 3, src: "/assets/images/items/4.jpg", name: "Tạo hạt 3" },
    { id: 4, src: "/assets/images/items/4.jpg", name: "Tạo hạt 4" },
    { id: 5, src: "/assets/images/items/4.jpg", name: "Tạo hạt 5" },
    { id: 6, src: "/assets/images/items/4.jpg", name: "Tạo hạt 6" },
  ],
  [
    { id: 7, src: "/assets/images/items/4.jpg", name: "Phân tách 1" },
    { id: 8, src: "/assets/images/items/4.jpg", name: "Phân tách 2" },
    { id: 9, src: "/assets/images/items/4.jpg", name: "Phân tách 3" },
    { id: 10, src: "/assets/images/items/4.jpg", name: "Phân tách 4" },
    { id: 11, src: "/assets/images/items/4.jpg", name: "Phân tách 5" },
    { id: 12, src: "/assets/images/items/4.jpg", name: "Phân tách 6" },
  ],
  [
    { id: 13, src: "/assets/images/items/4.jpg", name: "Băm nước 1" },
    { id: 14, src: "/assets/images/items/4.jpg", name: "Băm nước 2" },
    { id: 15, src: "/assets/images/items/4.jpg", name: "Băm nước 3" },
    { id: 16, src: "/assets/images/items/4.jpg", name: "Băm nước 4" },
    { id: 17, src: "/assets/images/items/4.jpg", name: "Băm nước 5" },
    { id: 18, src: "/assets/images/items/4.jpg", name: "Băm nước 6" },
  ],
  [
    { id: 19, src: "/assets/images/items/4.jpg", name: "Sàng rung 1" },
    { id: 20, src: "/assets/images/items/4.jpg", name: "Sàng rung 2" },
    { id: 21, src: "/assets/images/items/4.jpg", name: "Sàng rung 3" },
    { id: 22, src: "/assets/images/items/4.jpg", name: "Sàng rung 4" },
    { id: 23, src: "/assets/images/items/4.jpg", name: "Sàng rung 5" },
    { id: 24, src: "/assets/images/items/4.jpg", name: "Sàng rung 6" },
  ],
];

const ExtensionCard = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [groupIndex, setGroupIndex] = useState(0);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth / 3;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="flex flex-col gap-10 px-10 py-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 1, ease: "easeInOut" }}
        className="flex flex-col md:flex-row items-center md:items-start gap-6"
      >
        <div className="md:w-1/2 text-left">
          <h3 className="text-3xl font-bold text-gray-800 mb-2">
            Công nghệ chủ lực
          </h3>
          <p className="text-gray-600 text-xl">
            Chúng tôi sử dụng hệ thống tiên tiến hàng đầu
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end gap-4">
          <ButtonGroup activeIndex={groupIndex} onSelect={setGroupIndex} />
        </div>
      </motion.div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={groupIndex}
            className="flex gap-6 overflow-x-scroll scroll-smooth snap-x snap-mandatory no-scrollbar"
            ref={scrollRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {productGroups[groupIndex].map((item, index) => (
              <motion.div
                key={item.id}
                className="cursor-pointer product-card mb-10 snap-start min-w-[calc(33.333%-16px)] flex-shrink-0 rounded-4xl overflow-hidden bg-white shadow-xl transition-all duration-500 relative group"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                  delay: 0.2 + index * 0.12,
                }}
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 transition-all duration-500 group-hover:bg-black/15 z-10" />
                <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-black/70 to-transparent transition-all duration-500 group-hover:from-black/90 z-20" />
                <div className="absolute bottom-0 left-0 right-0 z-30 p-4 text-center text-white text-lg font-semibold">
                  {item.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center mt-5">
          <p className="cursor-pointer text-xl font-medium text-gray-700">
            Xem thêm thiết bị của chúng tôi →
          </p>
          <div className="flex gap-10">
            <button
              onClick={() => scroll("left")}
              className="cursor-pointer p-4 rounded-full border bg-white shadow-md hover:bg-gray-100 transition duration-500 hover:scale-105"
            >
              <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="cursor-pointer p-4 rounded-full border bg-white shadow-md hover:bg-gray-100 transition duration-500 hover:scale-105"
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExtensionCard;
