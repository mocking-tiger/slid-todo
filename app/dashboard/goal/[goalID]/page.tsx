"use client";

import { useEffect, useState } from "react";
import { useTodoContext } from "@/context/TodoContext";
import { GoalDetailType, PagePropsType, TodoType } from "@/types/userTypes";
import { getGoalDetail } from "@/api/goalApi";
import { getTodo, patchTodo } from "@/api/todoApi";
import Image from "next/image";
import LoadingScreen from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";

export default function GoalDetail(params: PagePropsType) {
  const id = params.params.goalID;
  const { isUpdated, updateTodos } = useTodoContext();
  const [goalDetail, setGoalDetail] = useState<GoalDetailType>();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const getPageDetail = async () => {
    const goalData = await getGoalDetail(Number(id));
    const todoData = await getTodo(Number(id));
    if (goalData && todoData) setIsLoading(false);
    // console.log(goalData);
    setGoalDetail(goalData?.data);
    // console.log(todoData);
    setTodos(todoData?.data.todos);
    const ratio =
      ((todoData?.data.todos.filter((todo: TodoType) => todo.done === true))
        .length /
        todoData?.data.totalCount) *
      100;
    setProgress(ratio);
  };

  const changeTodoStatus = async (
    title: string,
    goalId: number,
    fileUrl: string,
    linkUrl: string,
    done: boolean,
    todoId: number
  ) => {
    const response = await patchTodo(
      title,
      goalId,
      fileUrl,
      linkUrl,
      !done,
      todoId
    );
    if (response) {
      updateTodos();
    }
  };

  useEffect(() => {
    getPageDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, isUpdated]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <aside>
      <main className="w-full min-h-[calc(100vh)] h-auto lg:h-screen bg-[#F1F5F9] mt-[51px] lg:mt-0">
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
              <div>
                <h3 className="mb-[8px] pl-[7px]">Progress</h3>
                <ProgressBar progress={progress} />
              </div>
            </div>
            <div className="w-[306px] sm:w-auto h-full my-[24px] px-[24px] py-[16px] flex flex-col gap-[16px] rounded-[12px] bg-[#DBEAFE]">
              <div className="flex items-center gap-[8px]">
                <Image
                  src="/note.svg"
                  style={{ width: "24px", height: "auto" }}
                  width={0}
                  height={0}
                  alt="recent-task-icon"
                />
                <h2 className="text-[1.8rem] font-semibold">노트 모아보기</h2>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row 2xl:flex-row gap-[24px] items-start">
              <div className="w-full 2xl:w-[588px] min-h-[250px] px-[24px] py-[16px] relative flex flex-col gap-[16px] rounded-[12px] bg-white">
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
                      <li key={todo.id} className="flex gap-[8px]">
                        <Image
                          className={`cursor-pointer ${
                            todo.done ? "ml-[4px] mr-[2px]" : ""
                          }`}
                          src={
                            todo.done
                              ? "/checkbox-checked.svg"
                              : "/checkbox-unchecked.svg"
                          }
                          width={todo.done === true ? 18 : 24}
                          height={todo.done === true ? 18 : 24}
                          alt="checkbox-icon"
                          onClick={() =>
                            changeTodoStatus(
                              todo.title,
                              todo.goal.id,
                              todo.fileUrl,
                              todo.linkUrl,
                              todo.done,
                              todo.id
                            )
                          }
                        />
                        <span>{todo.title}</span>
                      </li>
                    ))}
                </ul>
                {todos.filter((done) => done.done === false).length === 0 && (
                  <div className="w-full h-full -mx-[24px] -my-[16px] absolute flex justify-center items-center text-[#64748B] text-[1.4rem]">
                    해야할 일이 아직 없어요
                  </div>
                )}
              </div>
              <div className="w-full 2xl:w-[588px] min-h-[250px] px-[24px] py-[16px] relative flex flex-col gap-[16px] rounded-[12px] bg-[#E2E8F0]">
                <div className="flex items-center gap-[8px]">
                  <h2 className="text-[1.8rem] font-semibold">Done</h2>
                </div>
                <ul>
                  {todos
                    .filter((done) => done.done === true)
                    .map((done) => (
                      <li key={done.id} className="flex gap-[8px]">
                        <Image
                          src="/checkbox-checked.svg"
                          width={18}
                          height={18}
                          alt="checkbox-icon"
                          className="cursor-pointer"
                          onClick={() =>
                            changeTodoStatus(
                              done.title,
                              done.goal.id,
                              done.fileUrl,
                              done.linkUrl,
                              done.done,
                              done.id
                            )
                          }
                        />
                        <span className="line-through">{done.title}</span>
                      </li>
                    ))}
                </ul>
                {todos.filter((done) => done.done === true).length === 0 && (
                  <div className="w-full h-full -mx-[24px] -my-[16px] absolute flex justify-center items-center text-[#64748B] text-[1.4rem]">
                    다 한 일이 아직 없어요
                  </div>
                )}
              </div>
            </div>
          </div>
        }
      </main>
    </aside>
  );
}
