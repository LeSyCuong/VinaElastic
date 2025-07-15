"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContactFormModal from "@/app/components/ContactFormModal";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    const allSections = Array.from(document.querySelectorAll(".white-section"));
    if (!allSections.length) return;

    const firstSection = allSections[0];
    const restSections = allSections.slice(1);

    // 🔍 Kiểm tra ban đầu nếu section đã nằm trong viewport
    const checkInitialVisibility = () => {
      const anyVisible = allSections.some((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      setIsDark(anyVisible);
    };

    checkInitialVisibility(); // ⏱ Gọi lúc vào trang

    // Observer cho section đầu tiên
    const firstObserver = new IntersectionObserver(
      ([entry]) => {
        setIsDark(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.2,
      }
    );

    firstObserver.observe(firstSection);

    // Observer cho các section sau
    const restObserver = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.isIntersecting);
        setIsDark(anyVisible);
      },
      {
        root: null,
        threshold: 0.4,
      }
    );

    restSections.forEach((section) => restObserver.observe(section));

    return () => {
      firstObserver.disconnect();
      restObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      const timer = setTimeout(() => setLoaded(true), 1200);
      return () => clearTimeout(timer);
    } else {
      setLoaded(true); // bật ngay nếu không phải trang "/"
    }
  }, [pathname]);

  const textColor = isDark ? "text-white" : "text-black";
  const borderColor = isDark ? "border-white" : "border-black";
  const bgHover = isDark
    ? "hover:bg-white hover:text-black"
    : "hover:bg-black hover:text-white";

  const navLinks = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/pages/products" },
    { label: "Tin tức", href: "#" },
    { label: "Về chúng tôi", href: "#" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 py-3 z-50 transition-opacity duration-1000 ease-in-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Logo */}
        <div
          className={`w-[60px] h-[60px] relative transition-opacity duration-1000 ease-out delay-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Nav Links */}
        <div
          className={`inline-flex overflow-hidden rounded-full ${borderColor} border bg-white/10 backdrop-blur-md`}
        >
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`px-5 py-2 text-sm ${textColor} ${bgHover} transition duration-500`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => setShowFormModal(true)}
          className={`cursor-pointer rounded-full ${borderColor} border bg-white/10 backdrop-blur-md px-4 py-2 text-sm ${textColor} ${bgHover} transition duration-500`}
        >
          Liên hệ
        </button>
      </nav>
      <ContactFormModal
        visible={showFormModal}
        onClose={() => setShowFormModal(false)}
      />{" "}
    </>
  );
};

export default Navbar;
