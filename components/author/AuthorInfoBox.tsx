"use client";

import React from "react";
import { useThemeStore } from "@/store/themeStore";

interface AuthorInfoBoxProps {
  email: string;
}

const AuthorInfoBox: React.FC<AuthorInfoBoxProps> = ({ email }) => {
  const { theme } = useThemeStore((state) => state);

  return (
    <div className="container px-4 mb-6">
      <div
        className={`w-full h-[124px] py-6 rounded-lg text-center font-medium text-x flex items-center justify-center ${
          theme === "dark" ? "bg-[#242535] text-white" : "bg-[#f6f6f7] text-[#181a2a]"
        }`}
      >
        {email}
      </div>
    </div>
  );
};

export default AuthorInfoBox;