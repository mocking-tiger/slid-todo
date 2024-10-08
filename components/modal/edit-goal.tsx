"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { editGoal } from "@/api/goalApi";
import { useTodoContext } from "@/context/TodoContext";
import { toast } from "react-toastify";
import Button from "../Button";

export default function EditGoal({
  goalId,
  mototitle,
  closeModal,
}: {
  goalId: number | undefined;
  mototitle: string | undefined;
  closeModal: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { updateTodos } = useTodoContext();
  const [title, setTitle] = useState(mototitle);

  const handleSubmit = async () => {
    const response = await editGoal(goalId as number, title as string);
    if (response) {
      toast.success("수정완료");
      closeModal();
      updateTodos();
    }
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col gap-[24px] select-none">
      <div>
        <h2 className="mb-[12px] font-[600]">제목</h2>
        <input
          ref={inputRef}
          value={title}
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
