'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";

export const Footer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories"); // Kendi API'ne göre değiştir
        const data = await res.json();
        setCategories(data.slice(0, 6)); // İlk 6 kategori
      } catch (error) {
        console.error("Kategori verisi alınamadı:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="bg-[#F6F6F7] dark:bg-[#141624] w-full mt-auto">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* About */}
          <div className="max-w-md">
            <h1 className="mb-2 text-[18px] font-[600] leading-[28px] text-[#181A2A] dark:text-white">
              About
            </h1>
            <p className="w-72 text-[16px] font-[400] leading-[24px] text-[#696A75] mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
            <p className="text-[#181A2A] font-semibold dark:text-white">
              Email: <span className="font-normal text-[#696A75]">info@jstemplate.net</span>
            </p>
            <p className="text-[#181A2A] font-semibold dark:text-white">
              Phone: <span className="font-normal text-[#696A75]">+880 123 456 789</span>
            </p>
          </div>

          {/* Quick Link */}
          <div>
            <h1 className="mb-2 text-[18px] font-[600] leading-[28px] dark:text-white text-[#181A2A]">
              Quick Link
            </h1>
            <ul className="text-[16px] gap-[16px] font-medium text-gray-500 dark:text-gray-400">
              <li className="mb-2 hover:underline">
                <a href="#">Home</a>
              </li>
              <li className="mb-2 hover:underline">
                <a href="#">Write a Blog</a>
              </li>
              <li className="mb-2 hover:underline">
                <a href="#">My Blogs</a>
              </li>
              <li className="mb-2 hover:underline">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          {/* Category */}
          <div>
            <h1 className="mb-2 text-[18px] font-[600] leading-[28px] text-[#181A2A] dark:text-white">
              Category
            </h1>
            <ul className="text-[16px] gap-[16px] font-medium text-gray-500 dark:text-gray-400">
              {categories.map((category) => (
                <li key={category.id} className="mb-2 hover:underline">
                  <Link href={`/homepage/?category=${category.id}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src="/images/mindcanvas_main_logo.png"
              className="h-12 select-none"
              alt=""
            />
            <div className="flex flex-col justify-center ml-2">
              <p className="text-[20px] whitespace-nowrap dark:text-white">
                Mind
                <span className="font-semibold ml-1 dark:text-white">
                  Canvas
                </span>
              </p>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                © JS Template 2023. All Rights Reserved.
              </span>
            </div>
          </div>

          <ul className="flex justify-end items-center text-sm gap-[16px] font-medium text-gray-500 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
