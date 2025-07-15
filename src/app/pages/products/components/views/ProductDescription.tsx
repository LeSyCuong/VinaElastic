"use client";

import parse from "html-react-parser";

function decodeHtml(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export default function ProductDescription({ content }: { content: string }) {
  return (
    <div className="mt-12 font-sans">
      <h2 className="text-2xl font-semibold mb-8 text-gray-800">
        Mô Tả Sản Phẩm
      </h2>

      <div className="border border-blue-500 bg-white p-5 rounded-2xl prose max-w-none text-[17px] text-gray-700 leading-relaxed tracking-wide">
        {parse(decodeHtml(content))}
      </div>
    </div>
  );
}
