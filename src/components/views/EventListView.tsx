import { useEffect, useState, useCallback } from "react";
import ActivityCard from "@/components/ActivityCard";
import { useRegistrationStore } from "@/store/useRegistrationStore";
import { imageMap } from "@/utils/imageMap";
import concertImage from "@/assets/images/concert.png";
import IconSvg from "@/components/IconSvg";
import SearchIcon from "@/assets/search.svg";

interface Activity {
  id: number;
  title: string;
  date: string;
  location: string;
  imageKey: string;
  category: string;
  hashtag: string;
  isRegistered?: boolean;
  description?: string;
  gallery?: string[];
  attendees: string;
}

interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

const hashtags = [
  "ทั้งหมด",
  "#ดนตรี",
  "#วิ่งมาราธอน",
  "#ดอกไม้ไฟ",
  "#ศิลปะ",
  "#อาหาร",
  "#เทคโนโลยี",
  "#การเรียนรู้",
  "#วัฒนธรรม",
  "#การกุศล",
  "#การแข่งขัน",
];

export default function EventListView() {
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

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">รายการกิจกรรม</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          ค้นหากิจกรรมที่คุณสนใจและเข้าร่วมได้ทันที
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <IconSvg
            Icon={SearchIcon}
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="ค้นหากิจกรรม..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {hashtags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedHashtag(tag);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedHashtag === tag
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : activities.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex justify-center">
                <ActivityCard {...activity} image={imageMap[activity.imageKey] || concertImage} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50"
              >
                ก่อนหน้า
              </button>
              <span className="px-4 py-2">
                หน้า {page} จาก {meta.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                disabled={page === meta.totalPages}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50"
              >
                ถัดไป
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 dark:text-gray-400">ไม่พบกิจกรรมที่คุณค้นหา</p>
        </div>
      )}
    </div>
  );
}
