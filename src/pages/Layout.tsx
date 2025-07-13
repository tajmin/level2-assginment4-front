// src/layouts/Layout.tsx
import { Outlet } from "react-router";
import { TooltipProvider } from "@radix-ui/react-tooltip";

import Navbar from "@/components/custom/Navbar";

const Layout = () => {
  return (
    <TooltipProvider>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          <Outlet />
        </main>
      </div>
    </TooltipProvider>
  );
};

export default Layout;
