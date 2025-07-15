"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import CategoryBadges from "../CategoryBadges";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  localImage?: string;
};

export default function ProductItem({ product }: { product: Product }) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedList: Product[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setLiked(likedList.some((item) => item.id === product.id));
  }, [product.id]);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const key = "favorites";
    const stored = localStorage.getItem(key);
    let list: Product[] = stored ? JSON.parse(stored) : [];

    const exists = list.some((item) => item.id === product.id);
    if (exists) {
      list = list.filter((item) => item.id !== product.id);
    } else {
      list.push(product);
    }

    localStorage.setItem(key, JSON.stringify(list));
    setLiked(!exists);
  };

  const handleView = () => {
    router.push(`/pages/products/view/${product.id}`);
  };

  const normalized = product.category
    .split(",")
    .map((s) => s.trim().toLowerCase());

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[24%] flex-shrink-0 p-2">
      <div
        onClick={handleView}
        className="cursor-pointer bg-white rounded-4xl ring-1 ring-gray-100 hover:ring-gray-300 shadow-xl p-4 transition hover:shadow-2xl hover:-translate-y-1 duration-300 flex flex-col h-full"
      >
        <div className="relative w-full h-44 rounded-xl overflow-hidden">
          <Image
            src={product.localImage || "/images/fallback.jpg"}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={toggleLike}
            className="absolute top-2 right-2 z-10 bg-white p-1.5 rounded-xl shadow hover:scale-110 transition"
          >
            {liked ? (
              <HiHeart className="text-red-500 w-5 h-5" />
            ) : (
              <HiOutlineHeart className="text-gray-600 w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex flex-col flex-1 mt-4">
          <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
            {product.name}
          </h3>

          <div className="mt-2">
            <span className="text-sm font-semibold text-blue-600">
              {product.price.toLocaleString("vi-VN")}₫
            </span>
          </div>

          <CategoryBadges codes={normalized} />

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleView();
            }}
            className="cursor-pointer mt-auto border border-blue-600 text-blue-600 py-2 px-4 text-sm font-medium rounded-4xl hover:bg-blue-600 hover:text-white hover:scale-105 transition duration-500"
          >
            Xem ngay
          </button>
        </div>
      </div>
    </div>
  );
}
