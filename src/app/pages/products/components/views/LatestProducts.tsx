"use client";

import { useEffect, useState, useRef } from "react";
import ProductItem from "./ProductItem";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Product = {
  id: number;
  name: string;
  img: string;
  price: number;
  category: string;
  localImage: string;
};

const latestProducts: Product[] = [
  {
    id: 1,
    name: "Cover Tape PET 8mm",
    img: "cover-tape.jpg",
    price: 1200000,
    category: "cover",
    localImage: "/assets/images/items/4.jpg",
  },
  {
    id: 2,
    name: "Carrier Tape PS 12mm",
    img: "carrier-tape.jpg",
    price: 14500000,
    category: "carrier",
    localImage: "/assets/images/items/4.jpg",
  },
  {
    id: 3,
    name: "Thùng Carton 3 lớp 40x30x20",
    img: "thung-carton.jpg",
    price: 2000000,
    category: "carton",
    localImage: "/assets/images/items/4.jpg",
  },
  {
    id: 4,
    name: "Chun Cao Su Nhiều Màu",
    img: "chun-cao-su.jpg",
    price: 3500000,
    category: "rubber",
    localImage: "/assets/images/items/4.jpg",
  },
  {
    id: 5,
    name: "Băng Keo Trong 100 Yard",
    img: "bang-keo.jpg",
    price: 1800000,
    category: "tape",
    localImage: "/assets/images/items/4.jpg",
  },
  {
    id: 6,
    name: "Thùng Carton 5 lớp 60x40x40",
    img: "thung-carton-5lop.jpg",
    price: 4200000,
    category: "carton",
    localImage: "/assets/images/items/4.jpg",
  },
];

export default function LatestProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const ITEM_WIDTH = 300 + 4;

  useEffect(() => {
    // Simulate async loading
    const timer = setTimeout(() => {
      setProducts(latestProducts);
    }, 300); // Optional delay to mimic loading
    return () => clearTimeout(timer);
  }, []);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -ITEM_WIDTH, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: ITEM_WIDTH, behavior: "smooth" });
  };

  return (
    <main className="max-w-[1440px] text-black w-full mt-30 mb-5 mx-auto px-4">
      <h1 className="text-2xl font-bold text-center">Sản phẩm nổi bật</h1>

      {products.length === 0 ? (
        <div className="flex justify-center items-center gap-2 text-gray-500 py-20">
          <div className="animate-spin h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full" />
          <span>Đang tải sản phẩm...</span>
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={scrollLeft}
            className="cursor-pointer absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-gray-800/30 text-white p-3 rounded-full backdrop-blur-md hover:scale-110 transition"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={containerRef}
            className="flex p-15 gap-4 overflow-x-auto scroll-smooth px-2"
            style={{ scrollbarWidth: "none" }}
          >
            {products.map((p) => (
              <ProductItem key={p.id} product={p} />
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="cursor-pointer absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-gray-800/30 text-white p-3 rounded-full backdrop-blur-md hover:scale-110 transition"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>

          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      )}
    </main>
  );
}
