"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { getTodoAll, patchTodo } from "@/api/todoApi";
import { AllTodoType, GoalType } from "@/types/apiTypes";
import Image from "next/image";
import CreateTodo from "@/components/modal/create-todo";
import { getGoals } from "@/api/goalApi";
import { useTodoContext } from "@/context/TodoContext";

export default function TodoAll() {
  const { Modal, openModal, closeModal } = useModal();
  const { isUpdated, updateTodos } = useTodoContext();
  const [todos, setTodos] = useState<AllTodoType>();
  const [status, setStatus] = useState<"All" | "Todo" | "Done">("All");
  const [goals, setGoals] = useState<GoalType[]>([]);

  const getTodos = async () => {
    const todosData = await getTodoAll();
    if (todosData) {
      setTodos(todosData.data);
      console.log(todosData);
    }
  };

  const fetchGoals = async () => {
    const goalsData = await getGoals();
    if (goalsData) {
      setGoals(goalsData);
    }
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
    getTodos();
    fetchGoals();
  }, [isUpdated]);

  return (
    <div>
      <main className="w-full h-[calc(100vh-51px)] lg:h-screen bg-[#F1F5F9] mt-[51px] lg:mt-0">
        <div className="w-[343px] sm:w-full 2xl:w-[1200px] h-[calc(100vh-40px)] mx-auto p-[24px] ">
          <div className="flex justify-between">
            <h2 className="mb-[12px] text-[1.8rem] font-semibold">
              모든 할 일 {`(${todos && todos.totalCount})`}
            </h2>
            <span
              className="text-[1.4rem] text-[#3B82F6] cursor-pointer"
              onClick={() => openModal("create-todo")}
            >
              + 할일 추가
            </span>
          </div>
          <div className="h-full flex">
            <div className="w-full h-auto px-[24px] py-[16px] flex flex-col gap-[16px] rounded-[12px] bg-white">
              <div className="flex items-center gap-[8px]">
                <div
                  className={`px-[12px] py-[4px] border border-gray-300 rounded-[17px] cursor-pointer ${
                    status === "All" ? "bg-[#3B82F6] text-white" : ""
                  }`}
                  onClick={() => setStatus("All")}
                >
                  All
                </div>
                <div
                  className={`px-[12px] py-[4px] border border-gray-300 rounded-[17px] cursor-pointer ${
                    status === "Todo" ? "bg-[#3B82F6] text-white" : ""
                  }`}
                  onClick={() => setStatus("Todo")}
                >
                  To do
                </div>
                <div
                  className={`px-[12px] py-[4px] border border-gray-300 rounded-[17px] cursor-pointer ${
                    status === "Done" ? "bg-[#3B82F6] text-white" : ""
                  }`}
                  onClick={() => setStatus("Done")}
                >
                  Done
                </div>
              </div>
              <ul>
                {status === "All" &&
                  todos?.todos.map((todo) => (
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

                      <span className={todo.done ? "line-through" : ""}>
                        {todo.title}
                      </span>
                    </li>
                  ))}
                {status === "Todo" &&
                  todos?.todos
                    .filter((todo) => todo.done === false)
                    .map((todo) => (
                      <li key={todo.id} className="flex gap-[8px]">
                        <Image
                          className={`cursor-pointer ${
                            todo.done ? "ml-[4px] mr-[2px]" : ""
                          }`}
                          src={"/checkbox-unchecked.svg"}
                          width={24}
                          height={24}
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
                {status === "Done" &&
                  todos?.todos
                    .filter((todo) => todo.done === true)
                    .map((todo) => (
                      <li key={todo.id} className="flex gap-[8px]">
                        <Image
                          className={`cursor-pointer ${
                            todo.done ? "ml-[4px] mr-[2px]" : ""
                          }`}
                          src={"/checkbox-checked.svg"}
                          width={18}
                          height={18}
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
                        <span className="line-through">{todo.title}</span>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Modal name="create-todo" title="할 일 생성">
        <CreateTodo goals={goals} closeThis={closeModal} />
      </Modal>
    </div>
  );
}
