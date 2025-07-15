"use client";

import Link from "next/link";
import Image from "next/image";

type NewsItem = {
  id: number;
  title: string;
  href: string;
};

const news: NewsItem[] = [
  {
    id: 1,
    title: "SHENHAO VIET NAM vinh dự top 10 doanh...",
    href: "/news/1",
  },
  {
    id: 2,
    title: "4N3Đ Đảo ngọc Phú Quốc cùng Shenhao...",
    href: "/news/2",
  },
  {
    id: 3,
    title: "Shenhao Việt Nam mừng quốc tế phụ n...",
    href: "/news/3",
  },
];

export default function LatestNewsBlock() {
  return (
    <div className="w-full max-w-xs bg-white shadow-md rounded-2xl px-4 py-5 space-y-4">
      <h3 className="text-xl font-bold text-black">Tin tức mới nhất</h3>

      <div className="space-y-8">
        {news.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex items-start gap-5 hover:opacity-80 transition"
          >
            <div className="w-25 h-15 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="/assets/images/new.jpg"
                alt={item.title}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-black font-medium line-clamp-2">
              {item.title}
            </p>
          </Link>
        ))}
      </div>

      <div className="pt-2">
        <Link
          href="/news"
          className="block w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm font-medium text-center hover:bg-blue-600 duration-500 cursor-pointer hover:text-white transition"
        >
          Xem tất cả
        </Link>
      </div>
    </div>
  );
}
