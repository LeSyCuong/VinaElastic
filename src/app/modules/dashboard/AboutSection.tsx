"use client";

import FeatureGridSection from "../components/dashboard/about/FeatureGridSection";
import VinaIntroWithOrb from "../components/dashboard/about/VinaIntroWithOrb";
import PartnerSection from "../components/dashboard/about/PartnersSection";
import ProductSection from "../components/dashboard/about/ProductSection";
import NewsCard from "../components/dashboard/about/NewsCard";
import ContactForm from "../components/dashboard/about/ContactForm";
import ExtensionCard from "../components/dashboard/about/ExtensionCard";
import WhyUs from "../components/dashboard/about/WhyUs";
import LightBlack from "../components/dashboard/about/LightBlack";
import Hyperspeed from "../components/dashboard/about/HyperspeedPage";

const AboutSection = () => {
  return (
    <section className=" z-20 py-20 ">
      <PartnerSection />
      <FeatureGridSection />
      <VinaIntroWithOrb />
      <ExtensionCard />
      <LightBlack />
      <ProductSection />
      <WhyUs />
      <Hyperspeed />
      <NewsCard />
      <ContactForm />
    </section>
  );
};

export default AboutSection;
