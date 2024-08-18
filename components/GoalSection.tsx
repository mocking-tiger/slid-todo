"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTodo } from "@/api/todoApi";
import { getGoalDetail } from "@/api/goalApi";
import { GoalType, TodoType } from "@/types/apiTypes";
import ProgressBar from "./ProgressBar";
import Image from "next/image";
import LoadingScreen from "./Loading";

export default function GoalSection({ id }: { id: number }) {
  const router = useRouter();
  const [goalDetail, setGoalDetail] = useState<GoalType>();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [dones, setDones] = useState<TodoType[]>([]);
  const [progress, setProgress] = useState(0);
  const [isOverFive, setIsOverFive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getDetails = async () => {
    const fetchGoal = await getGoalDetail(id);
    const fetchTodos = await getTodo(id, false, 5);
    const fetchDones = await getTodo(id, true, 5);
    if (fetchTodos && fetchDones && fetchGoal) {
      // console.log(fetchGoal);
      setGoalDetail(fetchGoal.data);
      // console.log(fetchTodos);
      setTodos(fetchTodos.data.todos);
      // console.log(fetchDones);
      setDones(fetchDones.data.todos);
      const totalCount =
        fetchTodos.data.totalCount + fetchDones.data.totalCount;
      setProgress(Math.round((fetchDones.data.totalCount / totalCount) * 100));
      if (fetchTodos.data.totalCount >= 5 || fetchDones.data.totalCount >= 5) {
        setIsOverFive(true);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full h-auto p-[24px] bg-[#EFF6FF] rounded-[32px] select-none">
      <div className="flex justify-between">
        <h1
          className="mb-[8px] text-[1.8rem] font-bold cursor-pointer"
          onClick={() => router.push(`/dashboard/goal/${goalDetail?.id}`)}
        >
          {goalDetail?.title}
        </h1>
        <span className="text-[1.4rem] text-[#3B82F6] cursor-pointer">
          + 할일 추가
        </span>
      </div>
      <div className="mb-[16px]">
        <ProgressBar progress={progress} />
      </div>
      <div className="w-full flex flex-col gap-[24px] sm:flex-row sm:gap-0">
        <div className="w-full">
          <h2 className="mb-[12px] text-[1.4rem] font-semibold">To do</h2>
          <ul>
            {todos.length > 0 ? (
              todos.map((todo) => (
                <li key={todo.id} className="text-[1.4rem] flex gap-[8px]">
                  <Image
                    src="/checkbox-unchecked.svg"
                    width={16}
                    height={16}
                    alt="checkbox-icon"
                  />
                  <span>{todo.title}</span>
                </li>
              ))
            ) : (
              <li className="py-[30px] text-[1.4rem] text-[#64748B] text-center">
                아직 해야할 일이 없어요
              </li>
            )}
          </ul>
        </div>
        <div className="w-full">
          <h2 className="mb-[12px] text-[1.4rem] font-semibold">Done</h2>
          <ul>
            {dones.length > 0 ? (
              dones.map((done) => (
                <li key={done.id} className="text-[1.4rem] flex gap-[8px]">
                  <Image
                    src="/checkbox-checked.svg"
                    width={16}
                    height={16}
                    alt="checkbox-icon"
                  />
                  <span className="line-through">{done.title}</span>
                </li>
              ))
            ) : (
              <li className="py-[30px] text-[1.4rem] text-[#64748B] text-center">
                아직 다 한 일이 없어요
              </li>
            )}
          </ul>
        </div>
      </div>
      {isOverFive && (
        <div className="w-full mt-[16px] flex justify-center">
          <div
            className="w-[120px] py-[6px] flex justify-center items-center bg-white rounded-[16px] cursor-pointer"
            onClick={() => router.push(`/dashboard/goal/${goalDetail?.id}`)}
          >
            <span>더보기</span>
            <Image
              src="/modal-arrowdown.svg"
              width={24}
              height={24}
              alt="button-arrow-icon"
            />
          </div>
        </div>
      )}
    </div>
  );
}
