"use client";

import { createClient } from "@/utils/supabase/client";
import { useThemeStore } from "@/store/themeStore";

export default function LogoutButton() {
  const { theme } = useThemeStore((state) => state);
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const buttonClass = `px-4 py-2 text-sm font-normal rounded-[5px] hover:opacity-90 inline-block transition-colors duration-200 ${
    theme
      ? "bg-[#2c2f45] text-white hover:bg-[#3a3e5b]"
      : "bg-[#141624] text-white"
  }`;

  return (
    <button onClick={handleLogout} className={`ml-[36px] ${buttonClass}`}>
      Logout
    </button>
  );
}