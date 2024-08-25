"use client";

import { useUserStore } from "@/zustand/userStore";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { addGoal, getGoals } from "@/api/goalApi";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import { GoalType } from "@/types/apiTypes";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import Cookies from "js-cookie";
import CreateTodo from "./modal/create-todo";

export default function SideBar() {
  const router = useRouter();
  const user = useUserStore((state) => state.userInfo);
  const clearUser = useUserStore((state) => state.clearUserInfo);
  const { Modal, openModal, closeModal } = useModal();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isHide, setIsHide] = useState(false);
  const [isAddGoal, setIsAddGoal] = useState(false);
  const [newGoalName, setNewGoalName] = useState("");
  const [goals, setGoals] = useState<GoalType[]>([]);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    clearUser();
    router.push("/");
  };

  const createNewGoal = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      if (newGoalName !== "") {
        setNewGoalName("");
        setIsAddGoal(false);
        await addGoal(newGoalName);
        const updatedGolas = await getGoals();
        setGoals(updatedGolas);
      } else {
        alert("목표를 입력해 주세요.");
        setIsAddGoal(false);
      }
    }
  };

  const fetchGoals = async () => {
    const goalsData = await getGoals();
    if (goalsData) {
      setGoals(goalsData);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddGoal]);

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <>
      <aside
        className={`transition-all duration-500 ease-in-out ${
          isHide ? "w-0" : "w-[280px]"
        }`}
      >
        {/* <button onClick={getNewToken}>api테스트</button> */}
        <div className="w-screen px-[16px] py-[12px] flex gap-[16px] lg:hidden fixed top-0 z-20 bg-white border border-b">
          <div className="w-[24px] h-[24px] px-[6px] py-[8px] flex justify-center items-center cursor-pointer">
            <Image
              src="/sidebar-kebab.svg"
              width={12}
              height={8}
              alt="kebab-button"
            />
          </div>
          <h2
            className="text-[1.8rem] font-semibold cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            대시보드
          </h2>
        </div>
        <div
          className={`w-[280px] h-screen py-[12px] float-left sticky top-0 
            bg-white transform transition-transform duration-500 ease-in-out hidden ${
              isHide ? "-translate-x-full" : "translate-x-0"
            } lg:block`}
        >
          <div className="mb-[13px] px-[21px] flex justify-between items-center">
            <Link href="/">
              <Image
                src="/logo.svg"
                width={0}
                height={0}
                style={{ width: "106px", height: "auto" }}
                alt="logo-sidebar"
                priority
              />
            </Link>
            <button
              className="p-[8px] border-2 rounded-[8px]"
              onClick={() => setIsHide((prev) => !prev)}
            >
              <Image
                src="/sidebar-hide.svg"
                width={0}
                height={0}
                style={{ width: "8px", height: "auto" }}
                alt="sidebar-button"
              />
            </button>
          </div>
          <div className="mb-[24px] px-[24px] flex gap-[12px]">
            <Image
              src="/sidebar-profile.svg"
              width={0}
              height={0}
              style={{ width: "64px", height: "auto" }}
              alt="profile-sidebar"
            />
            <div>
              <h2 className="">{user.name}</h2>
              <h2>{user.email}</h2>
              <button
                className="text-[1.2rem] text-gray-400"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </div>
          </div>
          <div className="px-[24px] pb-[24px] border-b border-b-[#E2E8F0]">
            <Button
              onClick={() => openModal("create-todo")}
              color="bg-[#3B82F6]"
            >
              {"+ 새 할 일"}
            </Button>
          </div>
          <div className="px-[24px] py-[16px] flex gap-[8px] border-b border-b-[#E2E8F0]">
            <Image
              className="ml-2"
              src="/sidebar-home.svg"
              width={0}
              height={0}
              style={{ width: "13px", height: "auto" }}
              alt="sidebar-home"
            />
            <Link href="/">
              <span>대시보드</span>
            </Link>
          </div>
          <div className="px-[24px] py-[16px]">
            <div className=" flex gap-[8px]">
              <Image
                src="/sidebar-flag.svg"
                width={24}
                height={24}
                alt="sidebar-flag"
              />
              <span>목표</span>
            </div>
            <div className="max-h-[400px] pt-[16px] mb-[24px] overflow-y-auto">
              <div className="flex flex-col">
                {goals.map((goal) => (
                  <Link key={goal.id} href={`/dashboard/goal/${goal.id}`}>
                    {goal.title}
                  </Link>
                ))}
              </div>
              {isAddGoal && (
                <input
                  ref={inputRef}
                  type="text"
                  className="block w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  onChange={(e) => setNewGoalName(e.target.value)}
                  onKeyDown={(e) => createNewGoal(e)}
                />
              )}
            </div>
            <div>
              <Button
                onClick={() => setIsAddGoal((prev) => !prev)}
                text="text-[#3B82F6]"
                color="bg-white"
                border="border border-[#3B82F6]"
              >
                {"+ 새 목표"}
              </Button>
            </div>
          </div>
        </div>

        <Modal name="create-todo" title="할 일 생성">
          <CreateTodo goals={goals} closeThis={closeModal} />
        </Modal>
      </aside>
      {isHide && (
        <div
          className="w-fit h-screen px-[14px] py-[16px] float-left bg-white lg:flex flex-col 
            items-center gap-[16px] hidden"
        >
          <Link href="/">
            <Image
              src="/sidebar-logo.svg"
              width={19}
              height={23}
              alt="sidebar-logo-hide"
            />
          </Link>
          <button
            className="p-[8px] border-2 rounded-[8px]"
            onClick={() => setIsHide((prev) => !prev)}
          >
            <Image
              src="/sidebar-hide-R.svg"
              width={8}
              height={8}
              alt="sidebar-button"
            />
          </button>
        </div>
      )}
    </>
  );
}
