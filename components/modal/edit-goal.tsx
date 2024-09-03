"use client";

import { KeyboardEvent, useState } from "react";
import { editGoal } from "@/api/goalApi";
import { useTodoContext } from "@/context/TodoContext";
import Button from "../Button";

export default function EditGoal({
  goalId,
  closeModal,
}: {
  goalId: number | undefined;
  closeModal: () => void;
}) {
  const { updateTodos } = useTodoContext();
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    const response = await editGoal(goalId as number, title);
    if (response) {
      alert("수정완료");
      closeModal();
      updateTodos();
    }
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-[24px] select-none">
      <div>
        <h2 className="mb-[12px] font-[600]">제목</h2>
        <input
          className="w-full px-[24px] py-[12px] bg-[#F8FAFC] rounded-[12px] focus:outline-none"
          placeholder="목표의 새 타이틀"
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}
        ></input>
      </div>
      <div className="">
        <Button disabled={!title && true} onClick={handleSubmit}>
          확인
        </Button>
      </div>
    </div>
  );
}
