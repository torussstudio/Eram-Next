import React from "react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="overflow-x-clip bg-[#F5EFE8] font-display text-[#111111] leading-[1.4]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
