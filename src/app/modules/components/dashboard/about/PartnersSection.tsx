import SpotlightGrid from "@/app/components/SpotlightGrid";

const partners = [
  { src: "/assets/images/doitac/doitac1.png", alt: "Wind Play" },
  { src: "/assets/images/doitac/doitac2.png", alt: "Lilith Games" },
  { src: "/assets/images/doitac/doitac3.png", alt: "IGG Games" },
  { src: "/assets/images/doitac/doitac4.png", alt: "Linekong" },
  { src: "/assets/images/doitac/doitac5.png", alt: "Nexon" },
  { src: "/assets/images/doitac/doitac6.png", alt: "NetEase Games" },
  { src: "/assets/images/doitac/doitac7.png", alt: "Perfect World" },
  { src: "/assets/images/doitac/doitac8.png", alt: "7Star" },
];

const PartnerSection = () => (
  <>
    <div className="max-w-screen-xl mx-auto text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900">Đối tác chiến lược</h2>
      <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
        Chúng tôi đồng hành cùng những thương hiệu và công nghệ hàng đầu toàn
        cầu.
      </p>
    </div>
    <SpotlightGrid partners={partners} />
  </>
);

export default PartnerSection;
