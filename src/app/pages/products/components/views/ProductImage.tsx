"use client";
import Image from "next/image";

export default function ProductImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative border border-blue-600 w-full aspect-[2/1]  rounded-4xl overflow-hidden shadow-xl">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition duration-500 hover:scale-[1.05]"
      />
    </div>
  );
}
