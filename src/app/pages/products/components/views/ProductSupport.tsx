"use client";

import Image from "next/image";

export default function ProductSupport({
  img,
  title,
  content,
  button,
}: {
  img: string;
  title: string;
  content: string;
  button: string;
}) {
  return (
    <div className="w-full lg:w-[320px] flex-shrink-0 space-y-10 ">
      <div className="cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden p-4 hover:scale-103 transition duration-500">
        <h3 className="font-semibold text-gray-800 mb-3">{title}</h3>
        <Image
          src={img}
          alt={title}
          width={320}
          height={180}
          className="w-full h-auto rounded-lg mb-4 hover:scale-103 transition duration-500"
        />

        <p className="text-sm italic text-gray-600 mb-4">{content}</p>

        <button className="block w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm font-medium text-center hover:bg-blue-600 duration-500 cursor-pointer hover:text-white transition">
          {button}
        </button>
      </div>
    </div>
  );
}
