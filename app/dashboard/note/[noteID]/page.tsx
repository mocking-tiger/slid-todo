"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { getTodo } from "@/api/todoApi";
import { TodoType } from "@/types/userTypes";

export default function Note() {
  // const todoId = params.noteID;
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const goalId = searchParams.get("goalId");
  const todoId = pathName.split("/").pop();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [todo, setTodo] = useState<TodoType>();

  const fetchDetail = async () => {
    const response = await getTodo(Number(goalId), undefined, 9999);
    if (response) {
      console.log(response);
      setTodo(
        response.data.todos.find((todo: TodoType) => todo.id === Number(todoId))
      );
    }
  };

  const handleSubmit = () => {};
  // console.log(todoId);
  // console.log(goalId);

  useEffect(() => {
    fetchDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p></p>
      <main className="w-full h-[calc(100vh-51px)] lg:h-screen bg-white mt-[51px] lg:mt-0">
        <div className="w-[343px] sm:w-full 2xl:w-[1200px] h-[calc(100vh-40px)] mx-auto p-[24px] ">
          <div className="mb-[24px] flex justify-between items-center">
            <h2 className=" text-[1.8rem] font-semibold">노트 작성</h2>
            <div className="flex items-center gap-[31px] text-[1.4rem]">
              <h6 className="text-[#3B82F6] cursor-pointer">임시저장</h6>
              <h6
                className="px-[24px] py-[12px] text-white bg-[#94A3B8] rounded-[12px] cursor-pointer"
                onClick={handleSubmit}
              >
                작성 완료
              </h6>
            </div>
          </div>
          <div className="mb-[12px] flex gap-[6px] items-center">
            <div className="w-[24px] h-[24px] bg-[#1E293B] rounded-[6px] flex justify-center items-center">
              <Image
                src="/goal-flag.svg"
                width={16}
                height={16}
                alt="recent-task-icon"
              />
            </div>
            <h1 className="font-medium">{todo?.goal.title}</h1>
          </div>
          <div className="mb-[24px] flex gap-[8px] items-center">
            <h2 className="px-[3px] py-[2px] bg-[#f1f5f9] rounded-[4px] text-[1.2rem]">
              {todo?.done ? "Done" : "To do"}
            </h2>
            <h2 className="text-[1.4rem]">{todo?.title}</h2>
          </div>
          <input
            type="text"
            placeholder="노트의 제목을 입력해주세요"
            className="w-full mb-[12px] py-[12px] border-y focus:outline-none text-[1.8rem]"
            onChange={(e) => setTitle(e.target.value)}
          />
          <h2 className="mb-[8px] text-[1.2rem] font-medium">{`공백포함 : 총 ${
            text.length
          }자 | 공백제외 : 총 ${text.replace(/\s+/g, "").length}자`}</h2>
          <textarea
            value={text}
            placeholder="이 곳을 클릭해 노트 작성을 시작해주세요"
            className="w-full min-h-[600px] overflow-y-auto focus:outline-none"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </main>
    </div>
  );
}
