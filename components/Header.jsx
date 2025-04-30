"use client";

import React from "react";
import { useThemeStore } from "@/store/themeStore.ts";
import SignInButton from "./SignInButton";
import { useUser } from "@/hooks/useUser";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

export const Header = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const user = useUser();
  return (
    <nav>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo hissesi */}
        <a href="#" className="flex">
          <img src="/images/mindcanvas_main_logo.png" className="h-8" alt="" />
          <p className="self-center text-2xl ml-1 whitespace-nowrap dark:text-white">
            Mind
            <span className="self-center text-2xl font-semibold whitespace-nowrap ml-1 dark:text-white">
              Canvas
            </span>
          </p>
        </a>
        <div className="hidden w-full md:block md:w-auto">
          <ul className="inline-flex gap-7 ">
            <li>
            <Link
                href={`/homepage`}
                className={`hover:underline ${theme === "dark" ? "hover:text-white" : "hover:text-black"}`}
              >
                Home
              </Link>
            </li>
            <li>
            <Link
                href={`/write-blog`}
                className={`hover:underline ${theme === "dark" ? "hover:text-white" : "hover:text-black"}`}
              >
                Write a Blog
              </Link>
            </li>
            <li>
              <Link
                href={`/author-blogs/?author=${user?.id}`}
                className={`hover:underline ${theme === "dark" ? "hover:text-white" : "hover:text-black"}`}
              >
                My Blogs
              </Link>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative space-x-6">
            <button
              onClick={toggleTheme}
              className={`w-[46px] h-[24px] ml-[36px] rounded-full p-[2px] transition-colors duration-200 ease-in-out ${
                theme === "dark" ? "bg-[#4b6bfb]" : "bg-gray-200"
              }`}
              aria-label="Toggle theme"
            >
              <div
                className={`w-[20px] h-[20px] rounded-full bg-white transition-transform duration-200 ease-in-out flex items-center justify-center ${
                  theme === "dark" ? "translate-x-[22px]" : "translate-x-0"
                }`}
              >
                {theme === "dark" ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-600"
                  >
                    <path
                      d="M13.0125 8.42903C12.0087 8.73865 10.9437 8.81784 9.90506 8.65963C8.86642 8.50142 7.88346 8.11064 7.02935 7.51564C6.17525 6.92064 5.47116 6.13595 4.97088 5.22577C4.4706 4.31559 4.18727 3.30279 4.14221 2.26685C4.09715 1.23091 4.29142 0.197695 4.71023 -0.75C3.67007 -0.401047 2.73811 0.190694 2.00272 0.976843C1.26734 1.76299 0.752128 2.71933 0.508199 3.76251C0.264271 4.80568 0.299537 5.89573 0.610608 6.92045C0.921679 7.94517 1.49808 8.86756 2.28377 9.60326C3.06947 10.339 4.04001 10.8614 5.09673 11.1188C6.15344 11.3763 7.25861 11.3609 8.30737 11.0742C9.35614 10.7875 10.3115 10.2389 11.0724 9.48347C11.8333 8.72805 12.3742 7.79219 12.6375 6.76903C12.7458 7.34371 12.9335 7.89831 13.1958 8.41903L13.0125 8.42903Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400"
                  >
                    <path
                      d="M7 10.5C8.933 10.5 10.5 8.933 10.5 7C10.5 5.067 8.933 3.5 7 3.5C5.067 3.5 3.5 5.067 3.5 7C3.5 8.933 5.067 10.5 7 10.5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M7 2.333V0M7 14v-2.333M2.333 7H0M14 7h-2.333M3.5 3.5L1.867 1.867M12.133 12.133l-1.633-1.633M10.5 3.5l1.633-1.633M1.867 12.133l1.633-1.633"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </button>
          </div>
          {user ? <LogoutButton /> : <SignInButton />}
        </div>
      </div>
    </nav>
  );
};
