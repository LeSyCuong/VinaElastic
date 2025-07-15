"use client";

import { useEffect, useState } from "react";
import Header from "@/app/modules/header/header";
import Footer from "@/app/modules/footer/footer";
import ProductGrid from "@/app/pages/products/components/products/ProductGrid";
import Pagination from "@/app/pages/products/components/Pagination";

type Product = {
  id: number;
  name: string;
  localImage: string;
  price: number;
  category: string;
};

export default function HeartPage() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const totalPages = Math.ceil(favorites.length / itemsPerPage);
  const paginatedItems = favorites.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Header />
      <main className="max-w-[1240px] mt-30 mb-20 mx-auto px-4 py-2">
        <h1 className="text-2xl font-bold text-black mb-15">
          Danh sách yêu thích
        </h1>

        <ProductGrid products={paginatedItems} isLoading={loading} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
