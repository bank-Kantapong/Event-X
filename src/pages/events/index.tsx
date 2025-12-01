import { useEffect, useState, useCallback } from "react";

import { StaticImageData } from "next/image";
import ActivityCard from "@/components/ActivityCard";
import ContainerWrapper from "@/components/ContainerWrapper";
import Navbar from "@/components/Navbar";
import IconSvg from "@/components/IconSvg";
import CloseIcon from "@/assets/close.svg";
import concertImage from "@/assets/images/concert.png";
import runningImage from "@/assets/images/running.png";
import fireworksImage from "@/assets/images/fireworks.png";
import artImage from "@/assets/images/art.jpg";
import foodImage from "@/assets/images/food.jpg";
import techImage from "@/assets/images/tech.jpg";
import learningImage from "@/assets/images/learning.jpg";
import cultureImage from "@/assets/images/culture.jpg";
import charityImage from "@/assets/images/charity.jpg";
import competitionImage from "@/assets/images/competition.jpg";
import { motion } from "framer-motion";

interface Activity {
  id: number;
  imageKey: string;
  title: string;
  date: string;
  hashtag: string;
  location: string;
  attendees: string;
  isRegistered?: boolean;
  description?: string;
  gallery?: string[];
}

interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

const imageMap: Record<string, StaticImageData> = {
  concert: concertImage,
  running: runningImage,
  fireworks: fireworksImage,
  art: artImage,
  food: foodImage,
  tech: techImage,
  learning: learningImage,
  culture: cultureImage,
  charity: charityImage,
  competition: competitionImage,
};

const HASHTAGS = [
  "ทั้งหมด",
  "#ดนตรี",
  "#กีฬา",
  "#เทศกาล",
  "#ศิลปะ",
  "#อาหาร",
  "#เทคโนโลยี",
  "#การเรียนรู้",
  "#วัฒนธรรม",
  "#การกุศล",
  "#การแข่งขัน",
];

import { useRegistrationStore } from "@/store/useRegistrationStore";

export default function EventList() {
  const { registeredIds } = useRegistrationStore();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [search, setSearch] = useState("");
  const [selectedHashtag, setSelectedHashtag] = useState("ทั้งหมด");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      if (search !== debouncedSearch) {
        setPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, debouncedSearch]);

  const fetchActivities = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search: debouncedSearch,
        hashtag: selectedHashtag === "ทั้งหมด" ? "" : selectedHashtag,
      });

      const response = await fetch(`/api/activities?${queryParams}`);
      if (response.ok) {
        const result = await response.json();
        // Map isRegistered from store
        const activitiesWithStatus = result.data.map((activity: Activity) => ({
          ...activity,
          isRegistered: registeredIds.includes(activity.id),
        }));
        setActivities(activitiesWithStatus);
        setMeta(result.meta);
      }
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, selectedHashtag, debouncedSearch, registeredIds]);

  // Fetch when dependencies change
  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (meta?.totalPages || 1)) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <ContainerWrapper>
      <Navbar />
      <main className="py-8 md:py-12 min-h-screen">
        <div className="flex flex-col gap-8">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-black dark:text-white">รายการกิจกรรมทั้งหมด</h1>
            <div className="w-full md:w-auto relative">
              <input
                type="text"
                placeholder="ค้นหากิจกรรม..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-80 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all pr-10"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <IconSvg Icon={CloseIcon} size={16} className="text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* Hashtag Filter */}
          <div className="flex flex-wrap gap-2">
            {HASHTAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedHashtag(tag);
                  setPage(1);
                }}
                className={`cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedHashtag === tag
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Activities Grid */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : activities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:flex flex-wrap gap-6">
              {activities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ActivityCard {...activity} image={imageMap[activity.imageKey] || concertImage} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              ไม่พบกิจกรรมที่ค้นหา
            </div>
          )}

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                ก่อนหน้า
              </button>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                หน้า {page} จาก {meta.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === meta.totalPages}
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                ถัดไป
              </button>
            </div>
          )}
        </div>
      </main>
    </ContainerWrapper>
  );
}
