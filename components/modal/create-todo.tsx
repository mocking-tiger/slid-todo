"use client";

import { useEffect, useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useTodoContext } from "@/context/TodoContext";
import { GoalType } from "@/types/apiTypes";
import { NewTodoType } from "../types/componentTypes";
import { addTodo, editTodo } from "@/api/todoApi";
import { uploadFile } from "@/api/fileApi";
import Image from "next/image";
import Button from "../Button";
import UploadLink from "./upload-link";
import LoadingScreen from "../Loading";
import { getGoals } from "@/api/goalApi";
import { toast } from "react-toastify";

export default function CreateTodo({
  //goals,
  closeThis,
  startsFrom,
  title,
  fileUrl,
  linkUrl,
  todoId,
  isEdit,
}: {
  //goals: GoalType[];
  closeThis: () => void;
  startsFrom?: number;
  title?: string;
  fileUrl?: string | undefined;
  linkUrl?: string | undefined;
  todoId?: number;
  isEdit?: boolean;
}) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { Modal, openModal, closeModal } = useModal();
  const { updateTodos } = useTodoContext();
  const [isGoalListClicked, setIsGoalListClicked] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState("");
  const [goals, setGoals] = useState<GoalType[]>([]);
  const [newTodo, setNewTodo] = useState<NewTodoType>({
    title: "",
    linkUrl: "",
    goalId: 0,
  });

  const fetchGoals = async () => {
    const goalsData = await getGoals();
    if (goalsData) {
      setGoals(goalsData.data.goals);
    }
  };

  const handleFileChange = async () => {
    const MAX_FILE_SIZE = 3 * 1024 * 1024;
    if (
      fileInputRef.current?.files?.length &&
      fileInputRef.current.files[0].size < MAX_FILE_SIZE
    ) {
      const response = await uploadFile(fileInputRef.current.files[0]);
      if (response) {
        setFile(response.url);
        setIsFileUploaded(true);
        setFileName(fileInputRef.current.files[0].name);
      }
    } else {
      toast.error("파일은 3MB이하만 업로드 가능합니다.");
      setIsFileUploaded(false);
    }
  };

  const handleSubmit = async (type: string) => {
    setIsLoading(true);
    if (type === "edit") {
      const response = await editTodo(
        newTodo.title,
        newTodo.goalId,
        todoId as number,
        file ? file : null,
        newTodo.linkUrl ? newTodo.linkUrl : null
      );
      if (response) {
        toast.success("수정완료");
        updateTodos();
        closeThis();
      } else {
        setNewTodo({ ...newTodo, goalId: 0, linkUrl: "" });
      }
    } else {
      const response = await addTodo(
        newTodo.title,
        newTodo.goalId,
        file,
        newTodo.linkUrl ? newTodo.linkUrl : undefined
      );
      if (response) {
        toast.success("작성완료");
        updateTodos();
        closeThis();
      } else {
        setNewTodo({ ...newTodo, goalId: 0, linkUrl: "" });
      }
    }
    setIsLoading(false);
  };

  const uploadRemover = (type: string) => {
    if (type === "file") {
      setIsFileUploaded(false);
      setFile("");
      setFileName("");
    } else {
      setNewTodo({ ...newTodo, linkUrl: "" });
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  useEffect(() => {
    setNewTodo({ ...newTodo, goalId: startsFrom as number });
    console.log(newTodo.goalId);
    // eslint-disable-next-line
  }, [startsFrom]);

  useEffect(() => {
    if (title) setNewTodo((prev) => ({ ...prev, title }));
    if (fileUrl) {
      setFile(fileUrl);
      setIsFileUploaded(true);
    }
    if (linkUrl) setNewTodo((prev) => ({ ...prev, linkUrl }));
  }, [title, fileUrl, linkUrl]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  titleInputRef.current?.focus();
  return (
    <div className="flex flex-col gap-[24px] select-none">
      <div>
        <h2 className="mb-[12px] font-[600]">제목</h2>
        <input
          ref={titleInputRef}
          value={newTodo.title}
          className="w-full px-[24px] py-[12px] bg-[#F8FAFC] rounded-[12px] focus:outline-none"
          placeholder="할 일의 제목을 적어주세요"
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          maxLength={30}
          onKeyDown={(e) =>
            e.key === "Enter" && handleSubmit(isEdit ? "edit" : "create")
          }
        />
      </div>
      <div>
        <h2 className="mb-[12px] font-[600]">자료</h2>
        <div className="mb-[12px] flex gap-[12px]">
          <div
            className={`w-fit p-[8px] border flex gap-[7px] rounded-[8px] ${
              !isFileUploaded
                ? "bg-[#F1F5F9]"
                : "bg-black text-white cursor-pointer"
            } `}
            onClick={() => isFileUploaded && uploadRemover("file")}
          >
            <Image
              src={
                isFileUploaded ? "/modal-checked.svg" : "/modal-unchecked.svg"
              }
              width={isFileUploaded ? "18" : "24"}
              height={isFileUploaded ? "18" : "24"}
              alt="checkbox-icon"
            />
            <span>파일 업로드</span>
          </div>
          <div
            className={`w-fit p-[8px] border flex gap-[7px] rounded-[8px] bg-[#F1F5F9] cursor-pointer ${
              !newTodo.linkUrl ? "bg-[#F1F5F9]" : "bg-black text-white"
            }`}
            onClick={() =>
              newTodo.linkUrl ? uploadRemover("link") : openModal("upload-link")
            }
          >
            <Image
              src={
                newTodo.linkUrl ? "/modal-checked.svg" : "/modal-unchecked.svg"
              }
              width={newTodo.linkUrl ? "18" : "24"}
              height={newTodo.linkUrl ? "18" : "24"}
              alt="checkbox-icon"
            />
            <span>링크 첨부</span>
          </div>
        </div>
        <div className="w-full h-[184px] flex justify-center items-center bg-[#F8FAFC] rounded-[12px] cursor-pointer">
          {
            <div className="text-[#94A3B8] text-center">
              {fileName ? (
                <p>{fileName}</p>
              ) : (
                <div
                  className="hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  <p>+</p>
                  <p>파일을 업로드해주세요</p>
                </div>
              )}
              <input
                type="file"
                className="opacity-0 absolute"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          }
        </div>
      </div>
      <div className="relative">
        <h2 className="mb-[12px] font-[600]">목표</h2>
        <div
          className="w-full px-[20px] py-[12px] flex justify-between bg-[#F8FAFC] rounded-[12px] cursor-pointer"
          onClick={() => setIsGoalListClicked((prev) => !prev)}
        >
          <p className={`${newTodo.goalId ? "" : "text-[#94A3B8]"}`}>
            {newTodo?.goalId
              ? goals.find((goal) => goal.id === newTodo.goalId)?.title
              : "목표를 선택해주세요"}
          </p>
          <Image
            src="/modal-arrowdown.svg"
            width={24}
            height={24}
            alt="arrowdown-icon"
          />
        </div>
        {isGoalListClicked && (
          <div className="w-full max-h-[200px] px-[20px] py-[12px] bg-white absolute select-none rounded-[12px] overflow-y-scroll">
            <ul>
              {goals.map((goal) => (
                <li
                  key={goal.id}
                  className="p-3 hover:bg-[#bce0fe] rounded-lg"
                  onClick={() => {
                    setNewTodo({ ...newTodo, goalId: goal.id });
                    setIsGoalListClicked(false);
                  }}
                >
                  {goal.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {isEdit ? (
        <Button
          onClick={() => handleSubmit("edit")}
          disabled={newTodo.title === "" || newTodo.goalId === undefined}
        >
          수정
        </Button>
      ) : (
        <Button
          onClick={() => handleSubmit("create")}
          disabled={newTodo.title === "" || newTodo.goalId === undefined}
        >
          확인
        </Button>
      )}
      <Modal name="upload-link" title="링크 업로드">
        <UploadLink
          closeModal={closeModal}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          atNote={false}
        />
      </Modal>
    </div>
  );
}
