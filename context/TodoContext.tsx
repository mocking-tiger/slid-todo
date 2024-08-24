"use client";

import { createContext, useContext, useState } from "react";

type TodoContextType = {
  isUpdated: boolean;
  updateTodos: () => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUpdated, setIsUpdated] = useState(false);

  const updateTodos = async () => {
    setIsUpdated((prev) => !prev); // 상태 업데이트를 트리거
  };

  return (
    <TodoContext.Provider value={{ isUpdated, updateTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("프로바이더 없음");
  }
  return context;
};
