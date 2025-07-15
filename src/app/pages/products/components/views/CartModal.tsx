"use client";

import Image from "next/image";
import { CartItem } from "@/types/items";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  items: CartItem[];
  onClose: () => void;
  onRemove: (id: number) => void;
};

export default function CartModal({ title, items, onClose, onRemove }: Props) {
  const router = useRouter();
  return (
    <div className="fixed inset-0 p-5 z-50 flex items-center justify-center ">
      <div className=" backdrop-blur-xl border border-white/30 rounded-xl p-6 shadow-xl w-full max-w-md animate-fade-in-up">
        <h2 className="text-lg font-semibold text-[var(--primary)] mb-4">
          {title}
        </h2>

        {items.length > 0 ? (
          <ul className="space-y-4 max-h-64 overflow-y-auto scrollbar-thin">
            {items.map((item, index) => (
              <li
                key={`${item.id}-${index}`}
                className="cursor-pointer  flex items-center gap-3"
              >
                <div
                  onClick={() => {
                    onClose();
                    router.push(`/pages/products/view/${item.id}`);
                  }}
                  className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0"
                >
                  <Image
                    src={item.localImage || "/images/fallback.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div
                  onClick={() => {
                    onClose();
                    router.push(`/pages/products/view/${item.id}`);
                  }}
                  className="hover:scale-102 transaction duration-500 flex-1 text-sm"
                >
                  <div className="text-[var(--primary)] font-medium line-clamp-1">
                    {item.name}
                  </div>
                  <div className="text-orange-500 font-semibold text-xs">
                    {item.price.toLocaleString("vi-VN")}₫
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="cursor-pointer text-red-500 hover:text-red-600 hover:scale-110 transition text-2xl mr-5"
                  title="Xoá"
                >
                  −
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">Không có sản phẩm nào.</p>
        )}

        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="cursor-pointer hover:scale-105 transaction duration-500 px-4 py-1.5 rounded-lg text-sm font-medium bg-black text-white "
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
