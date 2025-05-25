
import React from "react";
import NavHeader from "@/components/ui/nav-header";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import FluidBackground from "@/components/ui/fluid-background";
import Logo from "@/components/ui/logo";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <FluidBackground />
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <header className="w-full fixed top-4 z-20 flex justify-center items-center">
        <NavHeader />
      </header>
      <div className="fixed top-4 left-6 z-50 flex items-center h-12 md:h-16">
        <Logo />
      </div>
      <main className="pt-24 relative z-10">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
