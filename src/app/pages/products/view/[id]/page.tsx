import { Metadata } from "next";
import ProductDetail from "./ProductDetail";

const defaultProducts = [
  {
    id: 1,
    name: "Cover Tape PET 8mm",
    content: "Sản phẩm chuyên dụng dùng trong đóng gói linh kiện SMD.",
  },
  {
    id: 2,
    name: "Carrier Tape PS 12mm",
    content: "Băng định vị linh kiện điện tử chất lượng cao.",
  },
  {
    id: 3,
    name: "Carrier Tape PS 12mm",
    content: "Băng định vị linh kiện điện tử chất lượng cao.",
  },
  {
    id: 4,
    name: "Carrier Tape PS 12mm",
    content: "Băng định vị linh kiện điện tử chất lượng cao.",
  },
  {
    id: 5,
    name: "Carrier Tape PS 12mm",
    content: "Băng định vị linh kiện điện tử chất lượng cao.",
  },
  {
    id: 6,
    name: "Carrier Tape PS 12mm",
    content: "Băng định vị linh kiện điện tử chất lượng cao.",
  },
];

type Props = {
  params: { id: string },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = parseInt(params.id, 10);
  const product = defaultProducts.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Sản phẩm không tồn tại",
      description: "Sản phẩm này có thể đã bị xóa hoặc không khả dụng.",
    };
  }

  return {
    title: `${product.name} | Vietcod`,
    description:
      product.content?.slice(0, 160) || "Trang thông tin sản phẩm game Vietcod",
  };
}

export default function Page({ params }: Props) {
  const id = params.id;
  return <ProductDetail id={id} />;
}
