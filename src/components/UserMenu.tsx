import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import IconSvg from "@/components/IconSvg";
import LogoutIcon from "@/assets/logout.svg";

const UserMenu = () => {
    const { user, logout, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <Link
                href="/login"
                className="rounded-full bg-indigo-600 px-6 py-2 text-sm font-bold text-white transition-all hover:bg-indigo-700 hover:shadow-lg"
            >
                เข้าสู่ระบบ
            </Link>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {user?.username}
            </span>
            <button
                onClick={logout}
                className="group flex items-center justify-center rounded-full p-2 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                title="ออกจากระบบ"
            >
                <IconSvg
                    Icon={LogoutIcon}
                    size={20}
                    fill="#F87171"
                    className="transition-transform group-hover:scale-110 cursor-pointer"
                />
            </button>
        </div>
    );
};

export default UserMenu;
