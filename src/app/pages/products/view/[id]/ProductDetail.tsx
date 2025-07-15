"use client";

import { useEffect, useState } from "react";
import Header from "@/app/modules/header/header";
import Footer from "@/app/modules/footer/footer";
import LatestProducts from "../../components/views/LatestProducts";
import ProductInfo from "../../components/views/ProductInfo";
import ProductImage from "../../components/views/ProductImage";
import ProductVideo from "../../components/views/ProductVideo";
import ProductDescription from "../../components/views/ProductDescription";
import ProductSupport from "../../components/views/ProductSupport";
import CheckoutModal from "../../components/views/CheckoutModel";
import { Product, CartItem } from "@/types/items";
import LatestNews from "../../components/views/LatestNews";

const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Cover Tape PET 8mm",
    price: 1200000,
    category: "cover",
    img: "cover-tape.jpg",
    localImage: "/assets/images/items/4.jpg",
    content: `<b>- Hình thức dính: </b>Nhiệt, tự dính<br />
<b>- Cover form:</b> Seal, self-adhesive.<br /><br />

<b>- Màu:</b> Trong, nâu<br />
<b>- Color:</b> Transparent, brown<br /><br />

<b>- Quy cách:</b> Specifications<br />
5.4, 9.3, 13.3, 21.3, 25.5, 37.5, 49.5, 65.5, 81.5, 101.5, 114.5mm<br /><br />

<b>- Brand: DNP, DENKA...<br /><br />

- Dùng để dính carrier tape, bảo vệ và chống tĩnh điện<br />
- Using for packaging, protection and electrostatic protection.`,
    link_youtube: "-rah3qGodQk",
  },
  {
    id: 2,
    name: "Carrier Tape PS 12mm",
    price: 14500000,
    category: "carrier",
    img: "carrier-tape.jpg",
    localImage: "/assets/images/items/4.jpg",
    content: `<b>- Hình thức dính: </b>Nhiệt, tự dính<br />
<b>- Cover form:</b> Seal, self-adhesive.<br /><br />

<b>- Màu:</b> Trong, nâu<br />
<b>- Color:</b> Transparent, brown<br /><br />

<b>- Quy cách:</b> Specifications<br />
5.4, 9.3, 13.3, 21.3, 25.5, 37.5, 49.5, 65.5, 81.5, 101.5, 114.5mm<br /><br />

<b>- Brand: DNP, DENKA...<br /><br />

- Dùng để dính carrier tape, bảo vệ và chống tĩnh điện<br />
- Using for packaging, protection and electrostatic protection.`,
    link_youtube: "-rah3qGodQk",
  },
  {
    id: 3,
    name: "Thùng Carton 3 lớp 40x30x20",
    price: 2000000,
    category: "carton",
    img: "thung-carton.jpg",
    localImage: "/assets/images/items/4.jpg",
    content: `<b>- Hình thức dính: </b>Nhiệt, tự dính<br />
<b>- Cover form:</b> Seal, self-adhesive.<br /><br />

<b>- Màu:</b> Trong, nâu<br />
<b>- Color:</b> Transparent, brown<br /><br />

<b>- Quy cách:</b> Specifications<br />
5.4, 9.3, 13.3, 21.3, 25.5, 37.5, 49.5, 65.5, 81.5, 101.5, 114.5mm<br /><br />

<b>- Brand: DNP, DENKA...<br /><br />

- Dùng để dính carrier tape, bảo vệ và chống tĩnh điện<br />
- Using for packaging, protection and electrostatic protection.`,
    link_youtube: "-rah3qGodQk",
  },
  {
    id: 4,
    name: "Chun Cao Su Nhiều Màu",
    price: 3500000,
    category: "rubber",
    img: "chun-cao-su.jpg",
    localImage: "/assets/images/items/4.jpg",
    content: `<b>- Hình thức dính: </b>Nhiệt, tự dính<br />
<b>- Cover form:</b> Seal, self-adhesive.<br /><br />

<b>- Màu:</b> Trong, nâu<br />
<b>- Color:</b> Transparent, brown<br /><br />

<b>- Quy cách:</b> Specifications<br />
5.4, 9.3, 13.3, 21.3, 25.5, 37.5, 49.5, 65.5, 81.5, 101.5, 114.5mm<br /><br />

<b>- Brand: DNP, DENKA...<br /><br />

- Dùng để dính carrier tape, bảo vệ và chống tĩnh điện<br />
- Using for packaging, protection and electrostatic protection.`,
    link_youtube: "-rah3qGodQk",
  },
  {
    id: 5,
    name: "Băng Keo Trong 100 Yard",
    price: 1800000,
    category: "tape",
    img: "bang-keo.jpg",
    content: `<b>- Hình thức dính: </b>Nhiệt, tự dính<br />
<b>- Cover form:</b> Seal, self-adhesive.<br /><br />

<b>- Màu:</b> Trong, nâu<br />
<b>- Color:</b> Transparent, brown<br /><br />

<b>- Quy cách:</b> Specifications<br />
5.4, 9.3, 13.3, 21.3, 25.5, 37.5, 49.5, 65.5, 81.5, 101.5, 114.5mm<br /><br />

<b>- Brand: DNP, DENKA...<br /><br />

- Dùng để dính carrier tape, bảo vệ và chống tĩnh điện<br />
- Using for packaging, protection and electrostatic protection.`,
    link_youtube: "-rah3qGodQk",
  },
  {
    id: 6,
    name: "Thùng Carton 5 lớp 60x40x40",
    price: 4200000,
    category: "carton",
    img: "thung-carton-5lop.jpg",
    localImage: "/assets/images/items/4.jpg",
    content: `<b>- Hình thức dính: </b>Nhiệt, tự dính<br />
<b>- Cover form:</b> Seal, self-adhesive.<br /><br />

<b>- Màu:</b> Trong, nâu<br />
<b>- Color:</b> Transparent, brown<br /><br />

<b>- Quy cách:</b> Specifications<br />
5.4, 9.3, 13.3, 21.3, 25.5, 37.5, 49.5, 65.5, 81.5, 101.5, 114.5mm<br /><br />

<b>- Brand: DNP, DENKA...<br /><br />

- Dùng để dính carrier tape, bảo vệ và chống tĩnh điện<br />
- Using for packaging, protection and electrostatic protection.`,
    link_youtube: "-rah3qGodQk",
  },
];

export default function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [showModal, setShowModal] = useState(0);

  useEffect(() => {
    const local = defaultProducts.find((p) => String(p.id) === id);
    setProduct(local || null);
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const already = cart.find((item) => item.id === product.id);

    if (!already) {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        localImage: product.localImage || "/images/fallback.jpg",
      };
      cart.push(newItem);
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    setShowModal(1);
  };

  const handleCheckout = () => {
    if (!product) return;
    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      localImage: product.localImage || "/images/fallback.jpg",
    };
    setCheckoutItems([newItem]);
    setShowModal(2);
  };

  return (
    <>
      <Header />
      <div className="mt-40 max-w-[1260px] mx-auto px-4 mt-20 rounded-xl">
        {loading ? (
          <div className="flex justify-center items-center gap-2 text-gray-500 py-20">
            <div className="animate-spin h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full" />
            <span>Đang tải sản phẩm...</span>
          </div>
        ) : product ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-10">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <ProductInfo
                  name={product.name}
                  price={product.price}
                  onAddToCart={handleAddToCart}
                  onCheckout={handleCheckout}
                />
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2">
                <ProductImage
                  src={product.localImage || "/assets/images/items/4.jpg"}
                  alt={product.name}
                />
              </div>
            </div>

            <div className="mt-30 flex flex-col text-black lg:flex-row gap-8">
              <div className="flex-1">
                {product.link_youtube && (
                  <ProductVideo
                    title={product.name}
                    youtubeId={product.link_youtube}
                  />
                )}
                {product.content && (
                  <ProductDescription content={product.content} />
                )}
              </div>
              <div className="flex flex-col space-y-10">
                <ProductSupport
                  img="/assets/images/sp.jpg"
                  title="Tư vấn kỹ thuật"
                  content="Hướng dẫn đóng gói đúng chuẩn, hỗ trợ tích hợp hệ thống quản lý tồn kho."
                  button="Liên hệ chúng tôi"
                />
                <LatestNews />
              </div>
            </div>

            <LatestProducts />
          </>
        ) : (
          <div className="text-center text-gray-400 py-20 text-lg">
            Không tìm thấy sản phẩm.
          </div>
        )}
      </div>
      <Footer />

      {showModal === 2 && (
        <CheckoutModal
          title="Chọn phương thức thanh toán"
          items={checkoutItems}
          onClose={() => setShowModal(0)}
        />
      )}
    </>
  );
}
