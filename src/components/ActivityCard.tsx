import Image, { StaticImageData } from "next/image";
import IconSvg from "./IconSvg";
import PinIcon from "@/assets/pin.svg";
import UserIcon from "@/assets/user.svg";

interface ActivityCardProps {
  id: number;
  image: string | StaticImageData;
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

import { useState } from "react";
import { useRegisterEvent } from "@/hooks/useRegisterEvent";
import ActivityDetailModal from "./ActivityDetailModal";

const ActivityCard = ({
  id,
  image,
  imageKey,
  title,
  date,
  hashtag,
  location,
  attendees,
  isRegistered = false,
  description,
  gallery,
}: ActivityCardProps) => {
  const { registerEvent } = useRegisterEvent();
  const [registered, setRegistered] = useState(isRegistered);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegister = async () => {
    if (registered) return;
    const success = await registerEvent(id);
    if (success) {
      setRegistered(true);
    }
  };

  return (
    <>
      <div className="w-auto md:min-w-[265px] md:w-[265px] bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col transition-transform hover:scale-105 duration-300 border border-gray-100 dark:border-gray-700">
        <div className="relative h-64 md:h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-t-2xl"
            sizes="(max-width: 768px) 100vw, 265px"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
            {title}
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span>{date}</span>
            <span className="mx-2">•</span>
            <span className="text-indigo-600 dark:text-indigo-400">{hashtag}</span>
          </div>

          <div className="flex items-center justify-between mt-auto mb-4">
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm">
              <IconSvg Icon={PinIcon} size={16} className="text-gray-400" />
              <span className="truncate max-w-[100px]">{location}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm">
              <IconSvg Icon={UserIcon} size={16} className="text-gray-400" />
              <span>{attendees}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-auto">
            {!registered && (
              <button
                onClick={handleRegister}
                className="cursor-pointer flex items-center justify-center rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-orange-600"
              >
                ลงทะเบียน
              </button>
            )}
            <button
              onClick={() => setIsModalOpen(true)}
              className={`cursor-pointer flex items-center justify-center rounded-lg bg-gray-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-gray-700 ${
                registered ? "col-span-2" : ""
              }`}
            >
              รายละเอียด
            </button>
          </div>
        </div>
      </div>

      <ActivityDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activity={{
          id,
          imageKey,
          title,
          date,
          hashtag,
          location,
          attendees,
          description,
          gallery,
          isRegistered: registered,
        }}
        onRegister={handleRegister}
      />
    </>
  );
};

export default ActivityCard;
