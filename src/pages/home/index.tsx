import { useEffect, useState } from "react";
import ContainerWrapper from "@/components/ContainerWrapper";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import HeroSection from "@/components/HeroSection";
import PopularActivities from "@/components/PopularActivities";

const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) return null;

  return (
    <ContainerWrapper>
      <Head>
        <title>Event X - หน้าแรก</title>
      </Head>
      <header>
        <Navbar />
      </header>

      <main className="flex-1">
        <HeroSection />
        <PopularActivities />
      </main>

      <footer className="py-8 text-center text-sm text-black border-t border-black mt-8">
        © 2025 Event X. All rights reserved.
      </footer>
    </ContainerWrapper>
  );
};

export default Home;
