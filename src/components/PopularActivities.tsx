import ActivityCard from "./ActivityCard";
import IconSvg from "./IconSvg";
import ArrowRightIcon from "@/assets/arrow-right.svg";
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
import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import { TABS, useNavigation } from "@/hooks/useNavigation";

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

const PopularActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const { navigateToTab } = useNavigation();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/activities?page=1&limit=5");
        if (response.ok) {
          const data = await response.json();
          setActivities(data?.data);
        }
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-black">รายการกิจกรรมยอดนิยม</h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-5/6 overflow-x-auto no-scrollbar py-4">
          <div className="flex gap-4 md:gap-6 pb-4 md:pb-8 px-4 md:px-1 scrollbar-hide snap-x snap-mandatory">
            {activities?.map((activity) => (
              <div key={activity.id} className="snap-center md:snap-start">
                <ActivityCard {...activity} image={imageMap[activity.imageKey] || concertImage} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-auto flex justify-center md:block mt-4 md:mt-0">
          <button
            className="flex flex-col items-center gap-2 group cursor-pointer"
            onClick={() => navigateToTab(TABS.EVENT_LIST)}
          >
            <div className="w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center border border-gray-100 dark:border-gray-700 transition-transform group-hover:scale-110">
              <IconSvg
                Icon={ArrowRightIcon}
                size={24}
                className="text-gray-600 dark:text-gray-300"
              />
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              กิจกรรมเพิ่มเติม
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularActivities;
