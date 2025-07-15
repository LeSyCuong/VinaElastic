"use client";

import { useEffect, useState } from "react";
import Header from "@/app/modules/header/header";
import Footer from "@/app/modules/footer/footer";
import CustomDropdown from "./components/products/CustomDropdown";
import ProductGrid from "./components/products/ProductGrid";
import Pagination from "./components/Pagination";
import SearchBar from "./components/products/SearchBar";
import SidebarFilters from "./components/products/SidebarFilters";
import { HiOutlineHeart } from "react-icons/hi";
import { useRouter } from "next/navigation";

type PriceRange = {
  label: string;
  min?: number;
  max: number | null;
};

type Product = {
  id: number;
  name: string;
  img: string;
  price: number;
  category: string;
};

type LocalProduct = Product & { localImage: string };

const categories = [
  { label: "Tất cả", value: "all" },
  { label: "Cover Tape", value: "cover" },
  { label: "Carrier Tape", value: "carrier" },
  { label: "Thùng Carton", value: "carton" },
  { label: "Chun Cao Su", value: "rubber" },
  { label: "Băng Keo", value: "tape" },
];

const priceRanges: PriceRange[] = [
  { label: "Tất cả", max: null },
  { label: "0 - 1,500,000 ₫", max: 1500000 },
  { label: "1,500,000 - 2,000,000 ₫", min: 1500000, max: 2000000 },
  { label: "2,000,000 - 3,000,000 ₫", min: 2000000, max: 3000000 },
  { label: "3,000,000 - 4,000,000 ₫", min: 3000000, max: 4000000 },
  { label: "4,000,000 - 5,000,000 ₫", min: 4000000, max: 5000000 },
  { label: "5,000,000 - 10,000,000 ₫", min: 5000000, max: 10000000 },
];

const defaultProducts: LocalProduct[] = [
  {
    id: 1,
    name: "Cover Tape PET 8mm",
    img: "cover-tape.jpg",
    price: 1200000,
    category: "cover",
    localImage: "/assets/images/items/4.jpg",
  },
  {
    id: 2,
    name: "Carrier Tape PS 12mm",
    img: "carrier-tape.jpg",
    price: 14500000,
    category: "carrier",
    localImage: "/assets/images/items/4.jpg",
  },
  {
    id: 3,
    name: "Thùng Carton 3 lớp 40x30x20",
    img: "thung-carton.jpg",
    price: 2000000,
    category: "carton",
    localImage: "/assets/images/items/4.jpg",
  },
  {
    id: 4,
    name: "Chun Cao Su Nhiều Màu",
    img: "chun-cao-su.jpg",
    price: 3500000,
    category: "rubber",
    localImage: "/assets/images/items/4.jpg",
  },
  {
    id: 5,
    name: "Băng Keo Trong 100 Yard",
    img: "bang-keo.jpg",
    price: 1800000,
    category: "tape",
    localImage: "/assets/images/items/4.jpg",
  },
  {
    id: 6,
    name: "Thùng Carton 5 lớp 60x40x40",
    img: "thung-carton-5lop.jpg",
    price: 4200000,
    category: "carton",
    localImage: "/assets/images/items/4.jpg",
  },
];

export default function ProductsPage() {
  const [products] = useState<LocalProduct[]>(defaultProducts);
  const [isLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedRange, setSelectedRange] = useState<PriceRange | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const router = useRouter();

  const normalize = (cat: string) =>
    cat.split(",").map((s) => s.trim().toLowerCase());

  const filtered = products.filter((p) => {
    const matchCategory =
      selectedCategory === "all" ||
      normalize(p.category).includes(selectedCategory);

    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());

    const matchPrice =
      !selectedRange ||
      ((selectedRange.min ?? 0) <= p.price &&
        p.price <= (selectedRange.max ?? Infinity));

    return matchCategory && matchSearch && matchPrice;
  });

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <Header />
      <div className="p-5 mt-20">
        <div className="mb-4 lg:hidden space-y-4">
          <CustomDropdown
            label="Thể loại"
            options={categories}
            value={selectedCategory}
            onChange={(val) => setSelectedCategory(val as string)}
          />
          <CustomDropdown
            label="Khoảng giá"
            options={priceRanges.map((r) => ({
              label: r.label,
              value: JSON.stringify(r),
            }))}
            value={selectedRange ? JSON.stringify(selectedRange) : ""}
            onChange={(val) => {
              if (val === "") setSelectedRange(null);
              else setSelectedRange(JSON.parse(val as string));
            }}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <SidebarFilters
            categories={categories}
            priceRanges={priceRanges}
            selectedCategory={selectedCategory}
            selectedRange={selectedRange}
            setSelectedCategory={setSelectedCategory}
            setSelectedRange={setSelectedRange}
          />

          <div className="flex-1">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-1 mt-5">
                <SearchBar search={search} setSearch={setSearch} />
              </div>
              <div className="flex gap-5 items-center justify-start flex-wrap">
                <button
                  onClick={() => router.push("/pages/products/heart")}
                  className="cursor-pointer text-black hover:scale-110 transition-all duration-500 p-2 rounded-full shadow-lg hover:shadow-2xl"
                >
                  <HiOutlineHeart size={30} />
                </button>
              </div>
            </div>

            <ProductGrid products={paginated} isLoading={isLoading} />

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filtered.length / itemsPerPage)}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
