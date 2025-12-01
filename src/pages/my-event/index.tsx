import { useEffect, useState } from "react";
import { useMyEvents } from "@/hooks/useMyEvents";
import Navbar from "@/components/Navbar";
import ActivityCard from "@/components/ActivityCard";
import { StaticImageData } from "next/image";
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
  // Add other mappings as needed
};

const MyEventPage = () => {
  const { fetchMyEvents, loading } = useMyEvents();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchMyEvents();
      setActivities(data);
    };
    loadEvents();
  }, [fetchMyEvents]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <Navbar />

        <main className="py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">กิจกรรมของฉัน</h1>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : activities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activities.map((activity) => (
                <div key={activity.id} className="flex justify-center">
                  <ActivityCard {...activity} image={imageMap[activity.imageKey] || concertImage} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 dark:text-gray-400">
                คุณยังไม่ได้ลงทะเบียนกิจกรรมใดๆ
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyEventPage;
