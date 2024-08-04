"use client";

import { useUserStore } from "@/zustand/userStore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SideBar() {
  const user = useUserStore((state) => state.userInfo);
  const [isHide, setIsHide] = useState(false);

  return (
    <aside>
      <div
        className={`w-[280px] h-screen px-[16px] py-[12px] border-r float-left ${
          isHide && "hidden"
        }`}
      >
        <div className="mb-[13px] flex justify-between items-center">
          <Link href="/">
            <Image src="/logo.svg" width={106} height={35} alt="logo-sidebar" />
          </Link>
          <button
            className="p-[8px] border-2 rounded-[8px]"
            onClick={() => setIsHide((prev) => !prev)}
          >
            <Image
              src="/sidebar-hide.svg"
              width={8}
              height={8}
              alt="sidebar-button"
            />
          </button>
        </div>
        <div className="px-[8px] flex gap-[12px]">
          <Image
            src="/sidebar-profile.svg"
            width={64}
            height={64}
            alt="profile-sidebar"
          />
          <div>
            <h2 className="">{user.name}</h2>
            <h2>{user.email}</h2>
            <button className="text-[1.2rem] text-gray-400">로그아웃</button>
          </div>
        </div>
      </div>
      {isHide && (
        <div className="w-fit h-screen px-[14px] py-[16px] border-r float-left">
          <button
            className="p-[8px] border-2 rounded-[8px]"
            onClick={() => setIsHide((prev) => !prev)}
          >
            <Image
              src="/sidebar-hide-R.svg"
              width={8}
              height={8}
              alt="sidebar-button"
            />
          </button>
        </div>
      )}
    </aside>
  );
}
