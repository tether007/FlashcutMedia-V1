
"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme") || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
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
    <div className="flex items-center space-x-2 bg-white/20 dark:bg-gray-800/30 p-2 rounded-full backdrop-blur-sm border border-white/20">
      <Switch 
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
      />
      {theme === "dark" ? (
        <Moon className="h-4 w-4 text-gray-200" />
      ) : (
        <Sun className="h-4 w-4 text-gray-700" />
      )}
    </div>
  );
}
