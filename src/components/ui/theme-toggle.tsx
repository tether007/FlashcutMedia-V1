"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div
      className="flex items-center space-x-1 sm:space-x-2 
                 bg-white/20 dark:bg-gray-800/30 
                 p-1 sm:p-2 rounded-full 
                 backdrop-blur-sm border border-white/20"
    >
      <Switch
        className="scale-75 sm:scale-100" // smaller switch on mobile
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
      />
      {theme === "dark" ? (
        <Moon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-200" />
      ) : (
        <Sun className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700" />
      )}
    </div>
  );
}
