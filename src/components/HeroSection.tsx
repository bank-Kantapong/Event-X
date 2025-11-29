import Image from "next/image";
import Calendar from "@/assets/calendar.svg";
import IconSvg from "./IconSvg";

const HeroSection = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-12 md:py-20">
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
          ค้นหากิจกรรมที่น่าสนใจ{" "}
          <span className="text-orange-500">ในช่วงนี้</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-xl mx-auto md:mx-0">
          ค้นหา, ลงทะเบียน หรือจัดการกิจกรรมได้ในไม่กี่คลิก
          พร้อมระบบจัดการที่ใช้งานง่ายในที่เดียว
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
          <button className="w-full sm:w-auto px-8 py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30">
            ดูรายการกิจกรรม &gt;
          </button>
          <button className="w-full sm:w-auto px-8 py-3 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-800 transition-all shadow-lg">
            เริ่มต้นจัดการกิจกรรม
          </button>
        </div>
      </div>
      <div className="flex-1 w-full max-w-md md:max-w-lg relative">
        <IconSvg Icon={Calendar} size={200} fill="none" />
      </div>
    </section>
  );
};

export default HeroSection;
