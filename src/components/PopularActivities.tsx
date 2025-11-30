import ActivityCard from "./ActivityCard";
import IconSvg from "./IconSvg";
import ArrowRightIcon from "@/assets/arrow-right.svg";
import concertImage from "@/assets/images/concert.png";
import runningImage from "@/assets/images/running.png";
import fireworksImage from "@/assets/images/fireworks.png";

const DUMMY_ACTIVITIES = [
  {
    id: 1,
    image: concertImage,
    title: "คอนเสิร์ตมันเล็กมา",
    date: "24/11/2024",
    hashtag: "#ดนตรี",
    location: "เขาเขียว",
    attendees: "2.5K",
  },
  {
    id: 2,
    image: runningImage,
    title: "วิ่งเพื่อใคร",
    date: "24/11/2024",
    hashtag: "#กีฬา",
    location: "สวนหลวง",
    attendees: "2.5K",
  },
  {
    id: 3,
    image: fireworksImage,
    title: "วิ่งวิบากกรรม",
    date: "24/11/2024",
    hashtag: "#กีฬา",
    location: "เขาไกร",
    attendees: "2.5K",
  },
  {
    id: 4,
    image: fireworksImage,
    title: "ชมพลุปีใหม่",
    date: "31/12/2024",
    hashtag: "#เทศกาล",
    location: "ไอคอนสยาม",
    attendees: "2.5K",
  },
];

const PopularActivities = () => {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-black">รายการกิจกรรมยอดนิยม</h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-5/6 overflow-x-auto no-scrollbar py-4">
          <div className="flex gap-4 md:gap-6 pb-4 md:pb-8 px-4 md:px-1 scrollbar-hide snap-x snap-mandatory">
            {DUMMY_ACTIVITIES.map((activity) => (
              <div key={activity.id} className="snap-center md:snap-start">
                <ActivityCard {...activity} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-auto flex justify-center md:block mt-4 md:mt-0">
          <button className="flex flex-col items-center gap-2 group cursor-pointer">
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
