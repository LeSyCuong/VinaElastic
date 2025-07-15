"use client";

import Header from "./modules/header/header";
import Hero from "./modules/dashboard/Hero";
import Footer from "./modules/footer/footer";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <main className="">
        <Header />
        <Hero />
        <Footer />
      </main>
    </>
  );
}
