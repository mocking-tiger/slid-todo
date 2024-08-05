"use client";

import { useUserStore } from "@/zustand/userStore";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import Cookies from "js-cookie";

export default function SideBar() {
  const user = useUserStore((state) => state.userInfo);
  const clearUser = useUserStore((state) => state.clearUserInfo);
  const [isHide, setIsHide] = useState(false);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    clearUser();
    location.reload();
  };

  return (
    <aside>
      <div
        className={`w-[280px] h-screen mr-[24px] py-[12px] border-r float-left bg-white ${
          isHide && "hidden"
        }`}
      >
        <div className="mb-[13px] px-[21px] flex justify-between items-center">
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
        <div className="mb-[24px] px-[24px] flex gap-[12px]">
          <Image
            src="/sidebar-profile.svg"
            width={64}
            height={64}
            alt="profile-sidebar"
          />
          <div>
            <h2 className="">{user.name}</h2>
            <h2>{user.email}</h2>
            <button
              className="text-[1.2rem] text-gray-400"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
        <div className="px-[24px] pb-[24px] border-b border-b-[#E2E8F0]">
          <Button onClick={() => {}} color="bg-[#3B82F6]">
            {"+ 새 할 일"}
          </Button>
        </div>
        <div className="px-[24px] py-[16px] flex gap-[8px] border-b border-b-[#E2E8F0]">
          <Image
            className="ml-2"
            src="/sidebar-home.svg"
            width={13}
            height={13}
            alt="sidebar-home"
          />
          <span>대시보드</span>
        </div>
        <div className="px-[24px] py-[16px]">
          <div className=" flex gap-[8px]">
            <Image
              src="/sidebar-flag.svg"
              width={24}
              height={24}
              alt="sidebar-flag"
            />
            <span>목표</span>
          </div>
          <div className="pt-[16px]  pb-[24px]">목표 리스트 들어갈 곳</div>
          <div>
            <Button
              onClick={() => {}}
              text="text-[#3B82F6]"
              color="bg-white"
              border="border border-[#3B82F6]"
            >
              {"+ 새 목표"}
            </Button>
          </div>
        </div>
      </div>
      {isHide && (
        <div className="w-fit h-screen px-[14px] py-[16px] border-r float-left bg-white flex flex-col items-center gap-[16px]">
          <Link href="/">
            <Image
              src="/sidebar-logo.svg"
              width={19}
              height={23}
              alt="sidebar-logo-hide"
            />
          </Link>
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
