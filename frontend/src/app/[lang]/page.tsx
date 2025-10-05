import React from "react";
import DocumentSearchSection from "@/components/home/DocumentSearchSection";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
      <div className="px-10 mx-auto h-fit w-full flex flex-col items-center justify-center">
          <HeroSection/>
          <DocumentSearchSection/>
      </div>
  );
}