import { BasicUserType } from "@/types/userTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userInfo: BasicUserType;
  // eslint-disable-next-line no-unused-vars
  setUserInfo: (userInfo: BasicUserType) => void;
  clearUserInfo: () => void;
}

const initialState = {
  createdAt: "",
  email: "",
  id: 0,
  name: "",
  updatedAt: "",
};

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      userInfo: {
        ...initialState,
      },
      setUserInfo: (userInfo: BasicUserType) => {
        set(() => ({ userInfo }));
      },
      clearUserInfo: () => set({ userInfo: { ...initialState } }),
    }),
    { name: "userInfo" }
  )
);
