import Image from "next/image";
import IconSvg from "./IconSvg";
import PinIcon from "@/assets/pin.svg";
import UserIcon from "@/assets/user.svg";

interface ActivityCardProps {
    image: string;
    title: string;
    date: string;
    hashtag: string;
    location: string;
    attendees: string;
}

const ActivityCard = ({
    image,
    title,
    date,
    hashtag,
    location,
    attendees,
}: ActivityCardProps) => {
    return (
        <div className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform hover:-translate-y-1 duration-300 border border-gray-100 dark:border-gray-700">
            <div className="relative h-48 w-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
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
                    <button className="flex items-center justify-center rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-orange-600">
                        ลงทะเบียน
                    </button>
                    <button className="flex items-center justify-center rounded-lg bg-gray-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-gray-700">
                        รายละเอียด
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
