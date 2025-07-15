"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Lazy load CardSwap và Card
const CardSwap = dynamic(
  () => import("@/app/components/CardSwap").then((mod) => mod.default),
  {
    ssr: false,
  }
);
const Card = dynamic(
  () => import("@/app/components/CardSwap").then((mod) => mod.Card),
  {
    ssr: false,
  }
);

const ProductSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="relative mb-10 ml-10 mr-10 mt-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-xl overflow-hidden border border-gray-200"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-purple-300 opacity-20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-300 opacity-20 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          className="md:w-1/2 text-left space-y-4 ml-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
            Thời gian sản xuất trung bình
          </h3>
          <ul className="list-disc list-inside text-gray-700 text-base leading-relaxed space-y-2">
            <li>
              <strong>Đơn hàng mới:</strong> 7–10 ngày làm việc (bao gồm thời
              gian phát triển).
            </li>
            <li>
              <strong>Đơn hàng tái đặt:</strong> 5–7 ngày làm việc.
            </li>
            <li>
              Thời gian có thể thay đổi tùy theo số lượng và yêu cầu cụ thể từ
              khách hàng.
            </li>
            <li>
              Với các đơn hàng lớn, chúng tôi đảm bảo tiến độ sản xuất và giao
              hàng đúng hạn.
            </li>
          </ul>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: "easeInOut", delay: 0.4 }}
          className="md:w-1/2 w-full aspect-[4/3] relative mb-40 ml-40 mr-35 mt-50"
        >
          {isInView && (
            <CardSwap
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={true}
            >
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <motion.div
                    className="flex flex-col h-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-indigo-300"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                      delay: i * 0.15,
                    }}
                  >
                    {/* Header */}
                    <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-white border-b border-gray-200">
                      <h4 className="text-base font-semibold text-gray-800">
                        {i === 1 && "Sản xuất linh hoạt"}
                        {i === 2 && "Đảm bảo tiến độ"}
                        {i === 3 && "Phù hợp mọi yêu cầu"}
                      </h4>
                    </div>

                    {/* Video */}
                    <div className="relative w-full aspect-[4/3] bg-black">
                      <video
                        src={`/assets/videos/${i}.mp4`}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
                      {i === 1 &&
                        "Thời gian 7–10 ngày cho đơn hàng mới, linh hoạt theo yêu cầu."}
                      {i === 2 &&
                        "Cam kết giao hàng đúng hạn, sản xuất lớn không chậm trễ."}
                      {i === 3 &&
                        "Tùy chỉnh linh hoạt theo yêu cầu và số lượng khách hàng."}
                    </div>
                  </motion.div>
                </Card>
              ))}
            </CardSwap>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductSection;
