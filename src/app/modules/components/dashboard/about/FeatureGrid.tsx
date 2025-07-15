import React from "react";
import styled from "styled-components";
import {
  FaIndustry,
  FaGlobe,
  FaCogs,
  FaClipboardCheck,
  FaWarehouse,
  FaCubes,
} from "react-icons/fa";

const features = [
  {
    icon: <FaIndustry size={32} color="#64b5f6" />,
    title: "Quy trình khép kín",
    description:
      "Từ nguyên liệu đến thành phẩm – kiểm soát chất lượng toàn diện.",
  },
  {
    icon: <FaCogs size={32} color="#64b5f6" />,
    title: "Tùy biến theo yêu cầu",
    description: "Đáp ứng mẫu mã, kích thước, màu sắc đúng yêu cầu khách hàng.",
  },
  {
    icon: <FaGlobe size={32} color="#64b5f6" />,
    title: "Xuất khẩu toàn cầu",
    description: "Mạng lưới xuất khẩu phủ rộng hơn 30 quốc gia.",
  },
  {
    icon: <FaClipboardCheck size={32} color="#64b5f6" />,
    title: "Chứng nhận chất lượng",
    description: "Đạt các tiêu chuẩn quốc tế như ISO, FDA, RoHS.",
  },
  {
    icon: <FaCubes size={32} color="#64b5f6" />,
    title: "Sản xuất thông minh",
    description: "Tự động hóa dây chuyền – tối ưu chi phí & thời gian.",
  },
  {
    icon: <FaWarehouse size={32} color="#64b5f6" />,
    title: "Kho bãi & logistics",
    description: "Hệ thống kho vận hiện đại – giao hàng nhanh chóng.",
  },
];

const FeatureGrid = () => {
  return (
    <div className="white-section">
      <GridWrapper>
        {features.map((feature, idx) => (
          <Card key={idx}>
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </Card>
        ))}
      </GridWrapper>
    </div>
  );
};

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 48px;
  max-width: 1200px;
  padding: 2rem;
  width: 100%;
`;

const Card = styled.div`
  color: white;
  padding: 1.5rem;

  .icon {
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }

  p {
    margin-top: 0.5rem;
    font-size: 0.95rem;
    color: #cccccc;
  }
`;

export default FeatureGrid;
