"use client";

import { useEffect, useRef, useState } from "react";
import { useTodoContext } from "@/context/TodoContext";
import { getGoals } from "@/api/goalApi";
import { GoalType, TodoType } from "@/types/apiTypes";
import { getTodoAll } from "@/api/todoApi";
import Image from "next/image";
import Link from "next/link";
import ProgressDiv from "@/components/ProgressDiv";
import GoalSection from "@/components/GoalSection";
import LoadingScreen from "@/components/Loading";
import AllTodoList from "@/components/AllTodoList";

export default function Dashboard() {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { isUpdated } = useTodoContext();
  const [progressValue, setProgressValue] = useState(0);
  const [goals, setGoals] = useState<GoalType[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [ratio, setRatio] = useState(0);
  const [recentTodos, setRecentTodos] = useState<TodoType[]>([]);
  const [howManyGoals, setHowManyGoals] = useState(3);
  const [clickMoreGoals, setClickMoreGoals] = useState(false);
  const [totalGoals, setTotalGoals] = useState(0);

  const fetchGoals = async (howMany: number = 3) => {
    const response = await getGoals(howMany);
    const allTodo = await getTodoAll();
    if (response && allTodo) {
      console.log(response);
      setGoals(response.data.goals);
      setTotalGoals(response.data.totalCount);
      const total = allTodo.data.totalCount;
      const dones = allTodo.data.todos.filter(
        (todo: TodoType) => todo.done === true
      );
      setRatio(Math.round((dones.length / total) * 100));
      setRecentTodos(
        allTodo.data.todos
          .sort(
            (a: TodoType, b: TodoType) =>
              Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
          )
          .slice(0, 4)
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const targetNode = observerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHowManyGoals((prev) => prev + 3); // 맨 아래에 도달하면 3개의 목표 추가 로드
        }
      },
      {
        root: null, // 뷰포트가 루트
        rootMargin: "0px",
        threshold: 1.0, // 목표가 완전히 뷰포트에 들어왔을 때만 작동
      }
    );

    if (targetNode) {
      observer.observe(targetNode); // Ref를 옵저버에 연결
    }

    return () => {
      if (targetNode) {
        observer.unobserve(targetNode); // 컴포넌트 언마운트 시 옵저버 연결 해제
      }
    };
  }, [goals]);

  useEffect(() => {
    fetchGoals(howManyGoals);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated, howManyGoals]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="relative">
      <div className="w-full min-h-[calc(100vh-51px)] bg-[#F1F5F9] select-none mt-[51px] lg:mt-0">
        {
          <div className="w-[343px] sm:w-full 2xl:w-[1200px] p-[24px] mx-auto">
            <h2 className="mb-[12px] text-[1.8rem] font-semibold">대시보드</h2>
            <div className="flex flex-col sm:flex-row 2xl:flex-row gap-[24px]">
              <div className="w-full 2xl:w-[588px] h-auto px-[24px] py-[16px] flex flex-col gap-[16px] rounded-[12px] bg-white">
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
                <ul className="">
                  {recentTodos.map((todo: TodoType) => (
                    <AllTodoList todo={todo} key={todo.id} />
                  ))}
                </ul>
              </div>
              <ProgressDiv
                ratio={ratio}
                progressValue={progressValue}
                setProgressValue={setProgressValue}
              />
            </div>
            <div className="w-[306px] sm:w-auto h-auto mt-[24px] px-[24px] py-[16px] flex flex-col gap-[16px] rounded-[12px] bg-white">
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
              <div className="max-h-[675px] p-2 flex flex-col sm:grid gap-[16px] grid-cols-2 overflow-y-auto">
                {goals?.map((goal, index) => (
                  <div
                    key={goal.id}
                    className={`${
                      (index + 1) % 3 === 0 ? "col-span-2" : "col-span-1"
                    }`}
                  >
                    <GoalSection id={goal.id} />
                  </div>
                ))}
                {clickMoreGoals && <div ref={observerRef}></div>}
              </div>
              {clickMoreGoals ||
                (totalGoals > 3 && (
                  <div
                    className="w-full p-3 bg-[#3B82F6] rounded-[12px] cursor-pointer text-[white] text-center"
                    onClick={() => {
                      setHowManyGoals((prev) => prev + 3);
                      setClickMoreGoals(true);
                    }}
                  >
                    목표 더보기
                  </div>
                ))}
            </div>
          </div>
        }
      </div>
    </main>
  );
}
