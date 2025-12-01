import hero_1 from "@/assets/hero_1.svg";
import IconSvg from "./IconSvg";
import { motion, useMotionValue, useSpring } from "framer-motion";
import React from "react";
import { useNavigation, TABS } from "@/hooks/useNavigation";
import { useNotification } from "@/context/NotificationContext";

const HeroSection = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const { navigateToTab } = useNavigation();
  const { showNotification } = useNotification();

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;

    x.set(xPct * 30);
    y.set(yPct * 30);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-12 md:py-20">
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-black leading-tight mb-6 text-balance">
          ค้นหากิจกรรมที่น่าสนใจ <span className="text-orange-500">ในช่วงนี้</span>
        </h1>
        <p className="text-black text-lg mb-8 max-w-xl mx-auto md:mx-0">
          ค้นหา, ลงทะเบียน หรือจัดการกิจกรรมได้ในไม่กี่คลิก
          <br />
          พร้อมระบบจัดการที่ใช้งานง่ายในที่เดียว
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
          <button
            onClick={() => navigateToTab(TABS.EVENT_LIST)}
            className="rounded-lg cursor-pointer w-full sm:w-auto px-8 py-3 bg-orange-500 text-white font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30"
          >
            ดูรายการกิจกรรม
          </button>
          <button
            onClick={() => showNotification("Coming Soon", "success")}
            className="rounded-lg cursor-pointer w-full sm:w-auto px-8 py-3 bg-gray-700 text-white font-bold hover:bg-gray-800 transition-all shadow-lg"
          >
            เริ่มต้นจัดการกิจกรรม
          </button>
        </div>
      </div>
      <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <motion.div style={{ x: mouseX, y: mouseY }} className="relative z-10">
          <IconSvg Icon={hero_1} size={350} fill="none" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
