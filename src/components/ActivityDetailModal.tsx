import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import { getImage } from "@/utils/imageMap";
import IconSvg from "./IconSvg";
import PinIcon from "@/assets/pin.svg";
import UserIcon from "@/assets/user.svg";

interface ActivityDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: {
    id: number;
    imageKey: string;
    title: string;
    date: string;
    hashtag: string;
    location: string;
    attendees: string;
    description?: string;
    gallery?: string[];
    isRegistered?: boolean;
  };
  onRegister: () => void;
}

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const ActivityDetailModal = ({
  isOpen,
  onClose,
  activity,
  onRegister,
}: ActivityDetailModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const mainImage = getImage(activity.imageKey);
  const galleryImages = activity.gallery ? activity.gallery.map((key) => getImage(key)) : [];

  // Combine main image and gallery for the carousel
  const allImages = [mainImage, ...galleryImages];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={activity.title}>
      <div className="flex flex-col gap-6">
        {/* Carousel */}
        <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden group bg-gray-100 dark:bg-gray-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={allImages[currentIndex]}
                alt={`${activity.title} - Image ${currentIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-black/50 text-gray-800 dark:text-white hover:bg-white dark:hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 shadow-lg backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-black/50 text-gray-800 dark:text-white hover:bg-white dark:hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 shadow-lg backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-6 bg-white shadow-sm"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium">
              {activity.hashtag}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
              {activity.date}
            </span>
            <span className="flex items-center gap-1">
              <IconSvg Icon={PinIcon} size={16} className="text-gray-400" />
              {activity.location}
            </span>
            <span className="flex items-center gap-1">
              <IconSvg Icon={UserIcon} size={16} className="text-gray-400" />
              {activity.attendees} คนเข้าร่วม
            </span>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <h4 className="text-lg font-bold mb-2">รายละเอียดกิจกรรม</h4>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {activity.description || "ไม่มีรายละเอียดเพิ่มเติม"}
            </p>
          </div>

          <div className="mt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800 pt-6">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              ปิด
            </button>
            {!activity.isRegistered && (
              <button
                onClick={() => {
                  onRegister();
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
              >
                ลงทะเบียนเข้าร่วม
              </button>
            )}
            {activity.isRegistered && (
              <button
                disabled
                className="px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-default border border-gray-200 dark:border-gray-700"
              >
                ลงทะเบียนแล้ว
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ActivityDetailModal;
