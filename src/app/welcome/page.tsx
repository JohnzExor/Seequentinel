import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import Image from "next/image";
import Header from "./header";
import TitleSection from "./title-section";
import KeyFeaturesSection from "./key-features-section";
import AboutSection from "./about-section";
import ContactSection from "./contact-section";
import Footer from "./footer";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <TitleSection />
        <KeyFeaturesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default page;
