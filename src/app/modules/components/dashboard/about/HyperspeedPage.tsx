"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { FaEye, FaRocket, FaBalanceScale, FaHandshake } from "react-icons/fa";

const Hyperspeed = dynamic(() => import("./HyperspeedContainer"), {
  ssr: false,
});

export default function HyperspeedSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="white-section" ref={ref}>
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "700px",
          overflow: "hidden",
          background: "#0f0f0f",
        }}
      >
        {/* Hiệu ứng chạy lazy khi scroll tới */}
        {visible && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
            }}
          >
            <Hyperspeed />
          </div>
        )}

        {/* Nội dung sáng bên trên */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 20px",
            marginTop: "-20px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "1rem",
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
            }}
          >
            Tầm Nhìn và Sứ Mệnh
          </h2>

          <p
            style={{
              fontSize: "1.1rem",
              color: "#e5e7eb",
              maxWidth: "700px",
              marginBottom: "60px",
              lineHeight: 1.6,
              textShadow: "0 1px 8px rgba(0,0,0,0.5)",
            }}
          >
            Chúng tôi theo đuổi một định hướng phát triển bền vững <br />
            và tạo ra giá trị lâu dài cho đối tác, khách hàng và cộng đồng.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
              gap: "20px",
              maxWidth: "1200px",
              margin: "0 auto",
              flexWrap: "nowrap",
            }}
          >
            <FeatureBox
              icon={<FaEye size={28} color="#60a5fa" />}
              title="Tầm Nhìn"
              description="Trở thành doanh nghiệp sản xuất và xuất khẩu nhựa hàng đầu, tiên phong trong đổi mới và phát triển bền vững."
            />
            <FeatureBox
              icon={<FaRocket size={28} color="#3b82f6" />}
              title="Sứ Mệnh"
              description="Cung cấp sản phẩm nhựa chất lượng cao, tối ưu giá trị cho khách hàng toàn cầu thông qua công nghệ và chuyên nghiệp."
            />
            <FeatureBox
              icon={<FaBalanceScale size={28} color="#93c5fd" />}
              title="Triết Lý Kinh Doanh"
              description="Lấy uy tín làm nền tảng, chất lượng làm lợi thế, con người làm trung tâm cho sự phát triển lâu dài."
            />
            <FeatureBox
              icon={<FaHandshake size={28} color="#38bdf8" />}
              title="Lời Cam Kết"
              description="Cam kết sản phẩm đạt chuẩn quốc tế, giá trị bền vững, dịch vụ chuyên nghiệp cho đối tác và khách hàng."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

const FeatureBox = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div
      style={{
        flex: "1",
        minWidth: "220px",
        maxWidth: "260px",
        padding: "24px",
        margin: "30px 12px 0 12px",
        textAlign: "left",
        color: "#e5e7eb",
        borderRadius: "32px",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ marginBottom: "1rem" }}>{icon}</div>
      <h3
        style={{
          fontSize: "1.15rem",
          fontWeight: 600,
          color: "#ffffff",
          marginBottom: "0.5rem",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "0.95rem", color: "#d1d5db", lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  );
};
