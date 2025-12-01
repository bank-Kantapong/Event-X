import { useState } from "react";
import IconEventXFull from "@/assets/IconEventXFull";
import ThemeToggle from "@/components/ThemeToggle";
import UserMenu from "@/components/UserMenu";
import { useTheme } from "next-themes";
import IconSvg from "@/components/IconSvg";
import MenuIcon from "@/assets/menu.svg";
import CloseIcon from "@/assets/close.svg";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

enum TABS {
  HOME = "home",
  EVENT_LIST = "eventList",
  DASHBOARD = "dashboard",
}

const allTabs = [
  {
    id: TABS.HOME,
    name: "หน้าแรก",
  },
  {
    id: TABS.EVENT_LIST,
    name: "รายการกิจกรรม",
  },
  {
    id: TABS.DASHBOARD,
    name: "แดชบอร์ด",
  },
];

const Navbar = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeMenu = (() => {
    if (router.pathname === "/") return TABS.HOME;
    if (router.pathname.startsWith("/events")) return TABS.EVENT_LIST;
    if (router.pathname.startsWith("/dashboard")) return TABS.DASHBOARD;
    return TABS.HOME;
  })();

  const onChangeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const baseColor = theme === "dark" ? "text-white" : "text-black";

  return (
    <nav className="w-full py-4 relative z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="shrink-0">
          <IconEventXFull width={101} height={60} />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 mx-auto">
          {allTabs.map((tab) => {
            const isActive = activeMenu === tab.id;
            return (
              <li
                key={tab.id}
                className="relative flex items-center justify-center cursor-pointer"
                onClick={() => onChangeMenu()}
              >
                <a
                  href={tab.id === TABS.HOME ? "/" : tab.id === TABS.EVENT_LIST ? "/events" : "#"}
                  className={`${
                    isActive ? "text-primary" : baseColor
                  } relative z-10 text-sm font-bold transition-all duration-300 hover:text-primary`}
                >
                  {tab.name}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <UserMenu />
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-700 dark:text-gray-200 focus:outline-none"
            aria-label="Toggle menu"
          >
            <IconSvg
              Icon={isMobileMenuOpen ? CloseIcon : MenuIcon}
              size={28}
              fill={theme === "dark" ? "white" : "black"}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden mt-2 flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 animate-in slide-in-from-top-2 fade-in-20">
          <ul className="flex flex-col gap-4">
            {allTabs.map((tab) => {
              const isActive = activeMenu === tab.id;
              return (
                <li key={tab.id} className="flex items-center" onClick={() => onChangeMenu()}>
                  <a
                    href={tab.id === TABS.HOME ? "/" : tab.id === TABS.EVENT_LIST ? "/events" : "#"}
                    className={`${
                      isActive ? "text-primary" : baseColor
                    } text-lg font-bold transition-all duration-300 hover:text-primary w-full block py-2`}
                  >
                    {tab.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="h-px bg-gray-200 dark:bg-gray-800 my-2"></div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Appearance</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Account</span>
            <UserMenu />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
