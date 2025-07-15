import Glowing from "@/app/components/Glowing";
import FeatureGrid from "./FeatureGrid";

export default function LightBlack() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f0f0f",
        padding: "40px 20px",
      }}
      className="white-section"
    >
      <h2
        style={{
          color: "white",
          fontSize: "2rem",
          fontWeight: 600,
          textAlign: "center",
          marginBottom: "12px",
          marginTop: "50px",
        }}
      >
        Đối tác sản xuất & xuất khẩu nhựa uy tín toàn cầu
      </h2>
      <p
        style={{
          color: "#cccccc",
          fontSize: "1rem",
          textAlign: "center",
          maxWidth: "720px",
          marginBottom: "40px",
          lineHeight: 1.6,
        }}
      >
        Chúng tôi cung cấp các giải pháp nhựa theo yêu cầu, đảm bảo chất lượng
        cao, giao hàng đúng tiến độ, đạt tiêu chuẩn quốc tế, phục vụ khách hàng
        trong và ngoài nước.
      </p>

      <Glowing img="/assets/images/lightblack.jpg" />

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FeatureGrid />
      </div>
    </div>
  );
}
