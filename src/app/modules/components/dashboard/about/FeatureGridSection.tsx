"use client";

import Image from "next/image";

const FeatureGridSection = () => {
  const items = [
    {
      src: "/assets/images/items/1.jpg",
      alt: "Công nghệ chế tạo khuôn",
      title: "Công nghệ chế tạo khuôn",
      desc: "Keep up to date with any changes by receiving instant notifications.",
      span: "col-span-1 row-span-1",
      aos: "fade-right",
    },
    {
      src: "/assets/images/items/2.jpg",
      alt: "Team Planner",
      title: "Team Planner",
      desc: "Keep track of the bigger picture by viewing all individual tasks in one centralized team calendar.",
      span: "col-span-2 row-span-1",
      aos: "fade-left",
    },
    {
      src: "/assets/images/items/3.jpg",
      alt: "Team Planner",
      title: "Team Planner",
      desc: "Keep track of the bigger picture by viewing all individual tasks in one centralized team calendar.",
      span: "col-span-2 row-span-1",
      aos: "fade-up",
    },
    {
      src: "/assets/images/items/4.jpg",
      alt: "Máy cuộn băng Washi",
      title: "Máy cuộn băng Washi",
      desc: "Keep up to date with any changes by receiving instant notifications.",
      span: "col-span-1 row-span-1",
      aos: "fade-down",
    },
  ];

  return (
    <div className="relative z-10 h-screen px-4 py-20 md:px-16 space-y-16">
      {/* Giới thiệu */}
      <div className="w-full md:w-3/5" data-aos="fade-up" data-aos-delay="100">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-snug">
          Kết nối sản phẩm – Vững bước thành công.
        </h2>
        <p className="text-base md:text-xl text-gray-700 leading-relaxed">
          Chúng tôi chuyên gia công linh kiện cao su, silicone và nhựa kỹ thuật
          chất lượng cao, phục vụ ngành công nghiệp phụ trợ. Với đội ngũ kỹ sư
          giàu kinh nghiệm và quy trình hiện đại, chúng tôi tự tin đáp ứng mọi
          yêu cầu trong nước và quốc tế.
        </p>
      </div>

      {/* Grid hình ảnh */}
      <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-6 mx-auto w-full">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`
        relative ${item.span}
        w-full h-[450px]
        cursor-pointer
        rounded-[50px] bg-[#e0e0e0]
        shadow-[20px_20px_60px_#bebebe]
        overflow-hidden transition group
      `}
            data-aos={item.aos}
            data-aos-delay={idx * 100}
          >
            {/* Ảnh có hiệu ứng hover scale + tối nhẹ */}
            <Image
              src={item.src}
              alt={item.alt}
              width={1200}
              height={800}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.05] group-hover:brightness-90"
            />

            {/* ✅ Gradient tối phần chân ảnh */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />

            {/* Text hiển thị trên ảnh */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 rounded-b-[50px]">
              <h2 className="text-white font-semibold text-lg">{item.title}</h2>
              <p className="text-white text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGridSection;
