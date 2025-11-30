import light_theme from "@/assets/light_theme.svg";
import dark_theme from "@/assets/dark_theme.svg";
import IconSvg from "./IconSvg";
import { useState } from "react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isToggle, setIsToggle] = useState(false);
  // console.log('isToggle', isToggle)
  console.log("theme", theme);
  const handleToggle = () => {
    console.log("click");
    setIsToggle((prev) => !prev);
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="relative inline-block w-13 h-6 cursor-pointer">
      <input
        checked={isToggle}
        id="switch-component"
        type="checkbox"
        onChange={handleToggle}
        className="peer appearance-none w-13 h-6 bg-primary rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
      />
      <label
        htmlFor="switch-component"
        className={`flex items-center justify-center absolute top-0.5 ${
          isToggle ? "-left-0.5" : "left-0.5"
        } w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-8 peer-checked:border-slate-800 cursor-pointer`}
      ></label>
      {isToggle ? (
        <IconSvg
          Icon={dark_theme}
          size={16}
          fill="var(--main-yellow)"
          className="absolute top-1 left-1"
          onClick={handleToggle}
        />
      ) : (
        <IconSvg
          Icon={light_theme}
          size={16}
          fill="white"
          className="absolute top-1 right-1"
          onClick={handleToggle}
        />
      )}
    </div>
  );
};

export default ThemeToggle;
