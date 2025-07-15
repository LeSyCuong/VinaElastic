"use client";

import React from "react";

export default function ProductInfo({
  name,
  price,
  onAddToCart,
  onCheckout,
}: {
  name: string;
  price: number;
  onAddToCart: () => void;
  onCheckout: () => void;
}) {
  return (
    <div className="flex flex-col justify-start max-w-[500px]">
      <p className="text-sm text-gray-400 mb-2 uppercase tracking-wide">
        Mã sản phẩm: #{name.toLowerCase().replace(/\s+/g, "-")}
      </p>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        {name}
      </h1>

      <div className="text-[28px] text-blue-600 font-semibold mb-6">
        {price.toLocaleString("vi-VN")}₫
      </div>

      <hr className="border-gray-200 mb-6" />

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={onCheckout}
          className="cursor-pointer w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-4xl transition-all hover:scale-105 duration-500"
        >
          Liên hệ tư vấn
        </button>

        <button
          onClick={onAddToCart}
          className="cursor-pointer w-full py-3 px-6 text-blue-600 border border-blue-600 font-medium rounded-4xl hover:bg-blue-50 transition-all hover:scale-105 duration-500"
        >
          Quan tâm
        </button>
      </div>
    </div>
  );
}
