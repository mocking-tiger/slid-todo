"use client";

import { useEffect, useState } from "react";
import { getTodo } from "@/api/todoApi";
import ProgressBar from "./ProgressBar";
import { getGoalDetail } from "@/api/goalApi";
import { GoalType, TodoType } from "@/types/apiTypes";

export default function GoalSection({ id }: { id: number }) {
  const [goalDetail, setGoalDetail] = useState<GoalType>();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [dones, setDones] = useState<TodoType[]>([]);
  const [progress, setProgress] = useState(0);

  const getDetails = async () => {
    const fetchGoal = await getGoalDetail(id);
    const fetchTodos = await getTodo(id, false, 5);
    const fetchDones = await getTodo(id, true, 5);
    if (fetchTodos && fetchDones && fetchGoal) {
      console.log(fetchGoal);
      setGoalDetail(fetchGoal.data);
      console.log(fetchTodos);
      setTodos(fetchTodos.data.todos);
      console.log(fetchDones);
      setDones(fetchDones.data.todos);
      const totalCount =
        fetchTodos.data.totalCount + fetchDones.data.totalCount;
      setProgress(Math.round((fetchDones.data.totalCount / totalCount) * 100));
    }
  };

  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-auto min-h-[257px] p-[24px] bg-[#EFF6FF] rounded-[32px]">
      <div className="flex justify-between">
        <h1 className="mb-[8px] text-[1.8rem] font-bold">
          {goalDetail?.title}
        </h1>
        <span className="text-[1.4rem] text-[#3B82F6] cursor-pointer">
          + 할일 추가
        </span>
      </div>
      <div className="mb-[16px]">
        <ProgressBar progress={progress} />
      </div>
      <div className="w-full flex">
        <div className="w-full">
          <h2 className="mb-[12px] text-[1.4rem] font-semibold">To do</h2>
          <ul>
            {todos.length > 0 ? (
              todos.map((todo) => (
                <li key={todo.id} className="text-[1.4rem]">
                  {todo.title}
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
                <li key={done.id} className="text-[1.4rem]">
                  {done.title}
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
    </div>
  );
}
