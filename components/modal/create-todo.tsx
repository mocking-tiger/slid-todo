"use client";

import { useState } from "react";
import { GoalType } from "@/types/apiTypes";
import { NewTodoType } from "../types/componentTypes";
import Image from "next/image";
import Button from "../Button";

export default function CreateTodo({ goals }: { goals: GoalType[] }) {
  const [isGoalListClicked, setIsGoalListClicked] = useState(false);
  const [newTodo, setNewTodo] = useState<NewTodoType>({ title: "", goalId: 0 });

  console.log(goals);
  return (
    <div className="flex flex-col gap-[24px]">
      <div>
        <h2 className="mb-[12px] font-[600]">제목</h2>
        <input
          className="w-full px-[24px] py-[12px] bg-[#F8FAFC] rounded-[12px] focus:outline-none"
          placeholder="할 일의 제목을 적어주세요"
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        ></input>
      </div>
      <div>
        <h2 className="mb-[12px] font-[600]">자료</h2>
        <div className="mb-[12px] flex gap-[12px]">
          <div className="w-fit p-[8px] border flex gap-[7px] rounded-[8px] bg-[#F1F5F9] cursor-pointer">
            <Image
              src="/modal-unchecked.svg"
              width={24}
              height={24}
              alt="checkbox-icon"
            />
            <span>파일 업로드</span>
          </div>
          <div className="w-fit p-[8px] border flex gap-[7px] rounded-[8px] bg-[#F1F5F9] cursor-pointer">
            <Image
              src="/modal-unchecked.svg"
              width={24}
              height={24}
              alt="checkbox-icon"
            />
            <span>링크 첨부</span>
          </div>
        </div>
        <div className="w-full h-[184px] flex justify-center items-center bg-[#F8FAFC] rounded-[12px] cursor-pointer">
          {
            <div className="text-[#94A3B8] text-center">
              <p>+</p>
              <p>파일을 업로드해주세요</p>
            </div>
          }
        </div>
      </div>
      <div className="relative">
        <h2 className="mb-[12px] font-[600]">목표</h2>
        <div
          className="w-full px-[20px] py-[12px] flex justify-between bg-[#F8FAFC] rounded-[12px] cursor-pointer"
          onClick={() => setIsGoalListClicked((prev) => !prev)}
        >
          <p className={`${newTodo.goalId ? "" : "text-[#94A3B8]"}`}>
            {newTodo?.goalId
              ? goals.find((goal) => goal.id === newTodo.goalId)?.title
              : "목표를 선택해주세요"}
          </p>
          <Image
            src="/modal-arrowdown.svg"
            width={24}
            height={24}
            alt="arrowdown-icon"
          />
        </div>
        {isGoalListClicked && (
          <div className="w-full max-h-[200px] px-[20px] py-[12px] bg-white absolute select-none rounded-[12px] overflow-y-scroll">
            <ul>
              {goals.map((goal) => (
                <li
                  key={goal.id}
                  className="p-3 hover:bg-[#bce0fe] rounded-lg"
                  onClick={() => {
                    setNewTodo({ ...newTodo, goalId: goal.id });
                    setIsGoalListClicked(false);
                  }}
                >
                  {goal.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Button onClick={() => {}}>확인</Button>
    </div>
  );
}
