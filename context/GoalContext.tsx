"use client";

import { createContext, useContext, useState } from "react";
import { getGoals } from "@/api/goalApi";
import { GoalType } from "@/types/apiTypes";

type GoalContextType = {};

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export const GoalProvider = ({ children }: { children: React.ReactNode }) => {
  const [goals, setGoals] = useState<GoalType[]>([]);
  const [isUpdated, setIsUpdated] = useState(false);

  const updateGoals = async () => {
    const fetchedGoals = await getGoals();
    setGoals(fetchedGoals);
    setIsUpdated((prev) => !prev); // 상태 업데이트를 트리거
  };

  return (
    <GoalContext.Provider value={{ goals, isUpdated, updateGoals }}>
      {children}
    </GoalContext.Provider>
  );
};

export const useGoalContext = () => {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error("useGoalContext must be used within a GoalProvider");
  }
  return context;
};
