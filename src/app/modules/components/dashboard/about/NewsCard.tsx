"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const allCategories = [
  {
    title: "Công nghệ sản xuất",
    href: "/tin-tuc/cong-nghe-san-xuat",
    desc: "Những cải tiến kỹ thuật trong ngành chế tạo công nghiệp.",
  },
  {
    title: "Tình hình thị trường",
    href: "/tin-tuc/thi-truong",
    desc: "Cập nhật xu hướng, giá cả và nguồn cung toàn cầu.",
  },
  {
    title: "Phân tích vật liệu",
    href: "/tin-tuc/phan-tich-vat-lieu",
    desc: "Khám phá tính chất và hiệu năng của vật liệu mới.",
  },
  {
    title: "Đổi mới sáng tạo",
    href: "/tin-tuc/doi-moi-sang-tao",
    desc: "Ứng dụng sáng tạo trong sản xuất hiện đại.",
  },
  {
    title: "Hội thảo và sự kiện",
    href: "/tin-tuc/hoi-thao-su-kien",
    desc: "Những sự kiện quan trọng trong ngành kỹ thuật.",
  },
  {
    title: "Tin nội bộ",
    href: "/tin-tuc/tin-noi-bo",
    desc: "Hoạt động và thành tựu nổi bật trong công ty.",
  },
  {
    title: "Hợp tác quốc tế",
    href: "/tin-tuc/hop-tac-quoc-te",
    desc: "Mở rộng mạng lưới đối tác và thị trường toàn cầu.",
  },
  {
    title: "Tin tuyển dụng",
    href: "/tin-tuc/tuyen-dung",
    desc: "Cơ hội nghề nghiệp hấp dẫn đang chờ bạn.",
  },
  {
    title: "Dự án nổi bật",
    href: "/tin-tuc/du-an-noi-bat",
    desc: "Những dự án đã và đang tạo tiếng vang.",
  },
  {
    title: "Góc nhìn chuyên gia",
    href: "/tin-tuc/goc-nhin-chuyen-gia",
    desc: "Phân tích sâu sắc từ chuyên gia đầu ngành.",
  },
  {
    title: "Giải pháp kỹ thuật",
    href: "/tin-tuc/giai-phap-ky-thuat",
    desc: "Ứng dụng kỹ thuật để tối ưu sản xuất.",
  },
  {
    title: "Tin quốc tế",
    href: "/tin-tuc/tin-quoc-te",
    desc: "Thông tin công nghiệp từ thị trường toàn cầu.",
  },
];

const defaultImage = "/assets/images/items/4.jpg";
const ITEMS_PER_PAGE = 6;

const cardVariants: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const NewsCategoriesSection = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);

  const startIdx = page * ITEMS_PER_PAGE;
  const visibleItems = allCategories.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const hasPrev = page > 0;
  const hasNext = startIdx + ITEMS_PER_PAGE < allCategories.length;

  return (
    <div className="border relative py-20 px-4 md:px-16 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 ">
      {/* Glow effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-purple-300 opacity-20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 -right-32 w-[300px] h-[300px] bg-blue-300 opacity-20 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-100 opacity-10 blur-[150px] rounded-full" />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
        Tin tức
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-h-[520px]">
        <AnimatePresence mode="wait">
          {visibleItems.map((category) => (
            <motion.div
              key={category.href}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative h-[250px] rounded-4xl shadow-2xl overflow-hidden group cursor-pointer bg-black"
              onClick={() => router.push(category.href)}
            >
              <Image
                src={defaultImage}
                alt={category.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* ✅ Hiệu ứng tối dần khi hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-500" />

              <div className="absolute bottom-4 left-4 right-4 z-10">
                <h3 className="text-white text-xl font-bold drop-shadow mb-1">
                  {category.title}
                </h3>
                <p className="text-white text-sm leading-snug drop-shadow">
                  {category.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center gap-20 mt-12">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={!hasPrev}
          className={`cursor-pointer p-4 rounded-full border bg-white shadow-md hover:bg-gray-100 transition duration-500 hover:scale-105 ${
            !hasPrev ? "opacity-30 cursor-not-allowed" : ""
          }`}
        >
          <ChevronLeftIcon className="w-8 h-8 text-gray-600" />
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasNext}
          className={`cursor-pointer p-4 rounded-full border bg-white shadow-md hover:bg-gray-100 transition duration-500 hover:scale-105 ${
            !hasNext ? "opacity-30 cursor-not-allowed" : ""
          }`}
        >
          <ChevronRightIcon className="w-8 h-8 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default NewsCategoriesSection;
