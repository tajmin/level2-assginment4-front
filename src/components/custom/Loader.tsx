import { Loader2 } from "lucide-react";
import React from "react";

type LoaderSize = "full" | "medium" | "small";

interface LoaderProps {
  size?: LoaderSize;
}

export const Loader: React.FC<LoaderProps> = ({ size = "full" }) => {
  const sizeMap = {
    full: "fixed inset-0 flex items-center justify-center bg-white/80 z-50",
    medium: "flex items-center justify-center h-48", // For card or section loading
    small: "inline-flex items-center", // Inline inside a button or text
  };

  const iconSize = {
    full: "h-10 w-10",
    medium: "h-8 w-8",
    small: "h-4 w-4",
  };

  return (
    <div className={sizeMap[size]}>
      <Loader2 className={`${iconSize[size]} animate-spin text-primary`} />
    </div>
  );
};
