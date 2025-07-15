"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import CategoryBadges from "../CategoryBadges";

type Props = {
  id: number;
  name: string;
  localImage: string;
  price: number;
  category: string;
};

export default function ProductCart({
  id,
  name,
  localImage,
  price,
  category,
}: Props) {
  const router = useRouter();
  const normalized = category.split(",").map((s) => s.trim().toLowerCase());
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedList: Props[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    setLiked(likedList.some((item) => item.id === id));
  }, [id]);

  const toggleLike = () => {
    const list: Props[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updated = liked
      ? list.filter((item) => item.id !== id)
      : [...list, { id, name, localImage, price, category }];

    localStorage.setItem("favorites", JSON.stringify(updated));
    setLiked(!liked);
  };

  const handleView = () => router.push(`/pages/products/view/${id}`);

  return (
    <div
      className="cursor-pointer bg-white rounded-4xl ring-1 ring-gray-100 hover:ring-gray-300
 shadow-xl p-4 transition hover:shadow-2xl hover:-translate-y-1 duration-300 flex flex-col h-full"
    >
      <div className="relative w-full h-44 rounded-xl overflow-hidden">
        <Image
          onClick={handleView}
          src={localImage || "/images/fallback.jpg"}
          alt={name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={toggleLike}
          className="absolute top-2 right-2 z-10 bg-white p-1.5 rounded-full shadow hover:scale-110 transition"
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
          {name}
        </h3>

        <div className="mt-2">
          <span className="text-sm font-semibold text-blue-600">
            {price.toLocaleString("vi-VN")}₫
          </span>
        </div>

        <CategoryBadges codes={normalized} />

        <button
          onClick={handleView}
          className="cursor-pointer mt-auto text-blue-600 border border-blue-600 hover:text-white py-2 px-4 text-sm font-medium rounded-4xl hover:bg-blue-600 hover:scale-105 transition duration-500"
        >
          Xem ngay
        </button>
      </div>
    </div>
  );
}
