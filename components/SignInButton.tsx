"use client";

import Link from "next/link";
import { useThemeStore } from "@/store/themeStore";

export default function SignInButton() {
  const { theme  } = useThemeStore((state) => state);

  const buttonClass = `px-4 py-2 text-sm font-normal rounded-[5px] hover:opacity-90 inline-block transition-colors duration-200 ${
    theme
      ? "bg-[#2c2f45] text-white hover:bg-[#3a3e5b]"
      : "bg-[#141624] text-white"
  }`;

  return (
    <button className="ml-[36px]">
      <Link href="/sign-in" className={buttonClass}>
        Sign in
      </Link>
    </button>
  );
}