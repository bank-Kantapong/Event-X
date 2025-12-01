import { useEffect } from "react";
import { useMyEvents } from "@/hooks/useMyEvents";
import ActivityCard from "@/components/ActivityCard";
import { imageMap } from "@/utils/imageMap";
import concertImage from "@/assets/images/concert.png";
import { useRegistrationStore } from "@/store/useRegistrationStore";
import { useNotification } from "@/context/NotificationContext";

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

export default function MyEventsView() {
  const { events, loading, refetch } = useMyEvents();
  const { removeRegisteredId } = useRegistrationStore();
  const { showNotification } = useNotification();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCancel = (id: number) => {
    removeRegisteredId(id);
    showNotification("ยกเลิกการลงทะเบียนสำเร็จ", "success");
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">กิจกรรมของฉัน</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">รายการกิจกรรมที่คุณได้ลงทะเบียนไว้</p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            คุณยังไม่ได้ลงทะเบียนกิจกรรมใดๆ
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.map((event) => {
            const activity = event as Activity;
            return (
              <div key={activity.id} className="flex justify-center">
                <ActivityCard
                  {...activity}
                  image={imageMap[activity.imageKey] || concertImage}
                  onCancel={() => handleCancel(activity.id)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
