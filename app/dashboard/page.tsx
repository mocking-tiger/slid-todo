"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LoadingScreen from "@/components/Loading";
import SideBar from "@/components/SideBar";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!Cookies.get("accessToken")) {
      router.push("/");
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <aside>
      <SideBar />
      <main className="w-full h-screen bg-[#F1F5F9]">
        <div className="w-fit p-[24px] mx-auto">
          <h2>대시보드</h2>
          <div className="flex gap-[24px]">
            <div className="max-w-[588px] min-w-[306px] h-[250px] bg-white">
              최근 등록한 할 일
            </div>
            <div className="max-w-[588px] min-w-[306px] h-[250px] bg-[#3B82F6]">
              내 진행 상황
            </div>
          </div>
          <div>목표 별 할 일</div>
        </div>
      </main>
    </aside>
  );
}
