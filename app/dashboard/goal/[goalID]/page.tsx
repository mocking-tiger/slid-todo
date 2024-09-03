"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTodoContext } from "@/context/TodoContext";
import { useModal } from "@/hooks/useModal";
import { GoalDetailType, PagePropsType, TodoType } from "@/types/userTypes";
import { deleteGoal, getGoalDetail } from "@/api/goalApi";
import { getTodo } from "@/api/todoApi";
import Image from "next/image";
import LoadingScreen from "@/components/Loading";
import ProgressBar from "@/components/ProgressBar";
import AllTodoList from "@/components/AllTodoList";
import CreateTodo from "@/components/modal/create-todo";
import EditGoal from "@/components/modal/edit-goal";

export default function GoalDetail(params: PagePropsType) {
  const id = params.params.goalID;
  const router = useRouter();
  const { isUpdated } = useTodoContext();
  const { Modal, openModal, closeModal } = useModal();
  const [goalDetail, setGoalDetail] = useState<GoalDetailType>();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const getPageDetail = async () => {
    const goalData = await getGoalDetail(Number(id));
    const todoData = await getTodo(Number(id));
    if (goalData && todoData) setIsLoading(false);
    // console.log(goalData);
    setGoalDetail(goalData?.data);
    console.log(todoData);
    setTodos(todoData?.data.todos);
    const ratio =
      ((todoData?.data.todos.filter((todo: TodoType) => todo.done === true))
        .length /
        todoData?.data.totalCount) *
      100;
    setProgress(ratio);
  };

  const handleDelete = async () => {
    const really = confirm("정말 삭제하시겠습니까?");
    if (really) {
      const response = await deleteGoal(goalDetail?.id as number);
      if (response) {
        alert("삭제완료");
        router.push("/");
      }
    }
  };

  const checkNoteExist = (todos: TodoType[]) => {
    const hasNote = todos.find((todo) => todo.noteId !== null);
    hasNote
      ? router.push(`/dashboard/note-all/${goalDetail?.id}`)
      : alert("이 목표에 작성된 노트가 없습니다.");
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
      <main className="w-full min-h-[calc(100vh)] h-auto lg:h-screen bg-[#F1F5F9] mt-[51px] lg:mt-0 select-none">
        <div className="w-[343px] sm:w-full 2xl:w-[1200px] p-[24px] mx-auto">
          <h2 className="mb-[12px] text-[1.8rem] font-semibold">목표</h2>
          <div className="w-[306px] sm:w-auto h-full my-[24px] px-[24px] py-[16px] flex flex-col gap-[16px] rounded-[12px] bg-white">
            <div className="flex justify-between relative">
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
              <Image
                className="cursor-pointer"
                src="/goal-kebab.svg"
                width={24}
                height={24}
                alt="kebab-icon"
                onClick={() => setIsClicked((prev) => !prev)}
              />
              {isClicked && (
                <div
                  className="absolute right-0 -bottom-[100px] border bg-white z-10 rounded-lg"
                  onMouseLeave={() => setIsClicked(false)}
                >
                  <h6
                    className="p-5 hover:bg-gray-200 cursor-pointer"
                    onClick={() => openModal("edit-goal")}
                  >
                    수정하기
                  </h6>
                  <h6
                    className="p-5 hover:bg-gray-200 cursor-pointer"
                    onClick={handleDelete}
                  >
                    삭제하기
                  </h6>
                </div>
              )}
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
              <h2
                className="text-[1.8rem] font-semibold cursor-pointer"
                onClick={() => checkNoteExist(todos)}
              >
                노트 모아보기
              </h2>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row 2xl:flex-row gap-[24px] items-start select-none">
            <div className="w-full 2xl:w-[588px] min-h-[250px] px-[24px] py-[16px] relative flex flex-col gap-[16px] rounded-[12px] bg-white">
              <div className="flex items-center gap-[8px]">
                <h2 className="text-[1.8rem] font-semibold">To do</h2>
                <p
                  className="min-w-[74px] text-[1.4rem] text-[#3B82F6] grow text-right cursor-pointer"
                  onClick={() => openModal("create-todo")}
                >
                  {"+ 할일 추가"}
                </p>
              </div>
              <ul>
                {todos
                  .filter((todo) => todo.done === false)
                  .map((todo) => (
                    <AllTodoList key={todo.id} todo={todo} goal={false} />
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
                    <AllTodoList key={done.id} todo={done} goal={false} />
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
      </main>
      <Modal name="create-todo" title="할 일 생성">
        <CreateTodo closeThis={closeModal} startsFrom={Number(id)} />
      </Modal>
      <Modal name="edit-goal" title="목표 수정">
        <EditGoal
          goalId={goalDetail?.id}
          mototitle={goalDetail?.title}
          closeModal={closeModal}
        />
      </Modal>
    </aside>
  );
}
