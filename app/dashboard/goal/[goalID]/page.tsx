"use client";

import { useEffect, useState } from "react";
import { GoalDetailType, PagePropsType, TodoType } from "@/types/userTypes";
import SideBar from "@/components/SideBar";
import Image from "next/image";
import { getGoalDetail } from "@/api/goalApi";
import { getTodo } from "@/api/todoApi";
import LoadingScreen from "@/components/Loading";

export default function GoalDetail(params: PagePropsType) {
  const id = params.params.goalID;
  const [goalDetail, setGoalDetail] = useState<GoalDetailType>();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPageDetail = async () => {
    const goalData = await getGoalDetail(Number(id));
    const todoData = await getTodo(Number(id));
    if (goalData && todoData) setIsLoading(false);
    console.log("goalData:");
    console.log(goalData);
    setGoalDetail(goalData?.data);
    console.log("todoData: ");
    console.log(todoData);
    setTodos(todoData?.data.todos);
  };

  useEffect(() => {
    getPageDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <aside>
      <SideBar />
      <main className="w-full h-[calc(100vh-51px)] lg:h-screen bg-[#F1F5F9]">
        {
          <div className="w-[343px] sm:w-full 2xl:w-[1200px] p-[24px] mx-auto">
            <h2 className="mb-[12px] text-[1.8rem] font-semibold">목표</h2>
            <div className="w-[306px] sm:w-auto h-full my-[24px] px-[24px] py-[16px] flex flex-col gap-[16px] rounded-[12px] bg-white">
              <div className="flex items-center gap-[8px]">
                <div className="w-[40px] h-[40px] bg-[#1E293B] rounded-[15px] flex justify-center items-center">
                  <Image
                    src="/goal-flag.svg"
                    width={24}
                    height={24}
                    alt="recent-task-icon"
                  />
                </div>
                <h2 className="text-[1.8rem] font-semibold">
                  {goalDetail?.title}
                </h2>
              </div>
              <div>프로그레스 게이지 들어갈 곳</div>
            </div>
            <div className="w-[306px] sm:w-auto h-full my-[24px] px-[24px] py-[16px] flex flex-col gap-[16px] rounded-[12px] bg-[#DBEAFE]">
              <div className="flex items-center gap-[8px]">
                <Image
                  src="/note.svg"
                  width={24}
                  height={24}
                  alt="recent-task-icon"
                />
                <h2 className="text-[1.8rem] font-semibold">노트 모아보기</h2>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row 2xl:flex-row gap-[24px]">
              <div className="w-full 2xl:w-[588px] h-[250px] px-[24px] py-[16px] flex flex-col gap-[16px] rounded-[12px] bg-white">
                <div className="flex items-center gap-[8px]">
                  <h2 className="text-[1.8rem] font-semibold">To do</h2>
                  <p className="min-w-[74px] text-[1.4rem] text-[#3B82F6] grow text-right cursor-pointer">
                    {"+ 할일 추가"}
                  </p>
                </div>
                <ul>
                  {todos
                    .filter((todo) => todo.done === false)
                    .map((todo) => (
                      <li key={todo.id}>{todo.title}</li>
                    ))}
                </ul>
              </div>
              <div className="w-full 2xl:w-[588px] h-[250px] px-[24px] py-[16px] flex flex-col gap-[16px] rounded-[12px] bg-[#E2E8F0]">
                <div className="flex items-center gap-[8px]">
                  <h2 className="text-[1.8rem] font-semibold">Done</h2>
                </div>
                <ul>
                  {todos
                    .filter((todo) => todo.done === true)
                    .map((todo) => (
                      <li key={todo.id}>{todo.title}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        }
      </main>
    </aside>
  );
}
