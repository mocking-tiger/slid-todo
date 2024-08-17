"use client";

import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import Image from "next/image";
import Link from "next/link";
import ProgressDiv from "@/components/ProgressDiv";
import { getGoals } from "@/api/goalApi";
import { GoalType } from "@/types/apiTypes";
import GoalSection from "@/components/GoalSection";

export default function Dashboard() {
  const [progressValue, setProgressValue] = useState(0);
  const [goals, setGoals] = useState<GoalType[]>();

  const temp = 72;

  const fetchGoals = async () => {
    const response = await getGoals(3);
    if (response) {
      console.log(response);
      setGoals(response);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <main className="relative">
      <SideBar />
      <div className="w-full h-[calc(100vh-51px)] lg:h-screen bg-[#F1F5F9]">
        {
          <div className="w-[343px] sm:w-full 2xl:w-[1200px] p-[24px] mx-auto">
            <h2 className="mb-[12px] text-[1.8rem] font-semibold">대시보드</h2>
            <div className="flex flex-col sm:flex-row 2xl:flex-row gap-[24px]">
              <div className="w-full 2xl:w-[588px] h-[250px] px-[24px] py-[16px] flex flex-col gap-[16px] rounded-[12px] bg-white">
                <div className="flex items-center gap-[8px]">
                  <div className="w-[40px] h-[40px] bg-[#3B82F6] rounded-[15px] flex justify-center items-center">
                    <Image
                      src="/dashboard-recent.svg"
                      width={16}
                      height={16}
                      alt="recent-task-icon"
                    />
                  </div>
                  <h2 className="text-[1.8rem] font-semibold">
                    최근 등록한 할 일
                  </h2>
                  <Link href="/dashboard/todo-all" className="grow text-right ">
                    <p className="min-w-[74px] text-[1.4rem] text-[#475569] cursor-pointer">
                      {"모두 보기 >"}
                    </p>
                  </Link>
                </div>
                <div>할 일 목록 들어갈 곳</div>
              </div>
              <ProgressDiv
                temp={temp}
                progressValue={progressValue}
                setProgressValue={setProgressValue}
              />
            </div>
            <div className="w-[306px] sm:w-auto h-full mt-[24px] px-[24px] py-[16px] flex flex-col gap-[16px] rounded-[12px] bg-white">
              <div className="flex items-center gap-[8px]">
                <div className="w-[40px] h-[40px] bg-[#F97316] rounded-[15px] flex justify-center items-center">
                  <Image
                    src="/dashboard-flag.svg"
                    width={24}
                    height={24}
                    alt="recent-task-icon"
                  />
                </div>
                <h2 className="text-[1.8rem] font-semibold">목표 별 할 일</h2>
              </div>
              <div className="grid gap-[16px] grid-cols-2">
                {goals?.map((goal, index) => (
                  <div
                    key={goal.id}
                    className={`${
                      (index + 1) % 3 === 0 ? "col-span-2" : "col-span-1"
                    }`}
                  >
                    <GoalSection />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      </div>
    </main>
  );
}
