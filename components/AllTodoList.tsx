import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import { useTodoContext } from "@/context/TodoContext";
import { deleteTodo, patchTodo } from "@/api/todoApi";
import { NoteType, TodoType } from "@/types/apiTypes";
import { getNote } from "@/api/noteApi";
import Image from "next/image";
import CreateTodo from "./modal/create-todo";

export default function AllTodoList({
  todo,
  goal = true,
}: {
  todo: TodoType;
  goal?: boolean;
}) {
  const router = useRouter();
  const { Modal, openModal, closeModal } = useModal();
  const { updateTodos } = useTodoContext();
  const [isClicked, setIsClicked] = useState(false);
  const [isNoteClicked, setIsNoteClicked] = useState(false);
  const [noteContent, setNoteContent] = useState<NoteType>();

  const fetchNoteContent = async () => {
    if (todo.noteId) {
      const response = await getNote(todo.noteId);
      if (response) {
        console.log(response);
        setNoteContent(response.data);
      }
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
    fetchNoteContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteTodo = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await deleteTodo(todo.id);
      updateTodos();
    }
  };

  return (
    <div
      key={todo.id}
      className={`relative group rounded-2xl ${
        goal ? "hover:border" : "hover:underline"
      } `}
    >
      <li className="flex gap-[8px]">
        <Image
          className={`cursor-pointer ${todo.done ? "ml-[4px] mr-[2px]" : ""}`}
          src={todo.done ? "/checkbox-checked.svg" : "/checkbox-unchecked.svg"}
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

        <span className={`text-[1.4rem] ${todo.done ? "line-through" : ""}`}>
          {todo.title}
        </span>
      </li>
      {goal && (
        <div className="flex items-center gap-[8px]">
          <Image
            className="ml-[35px]"
            src="/goal-summit.png"
            width={24}
            height={24}
            alt="goal-summit-icon"
          />
          <p className="text-[1.4rem]">{todo.goal.title}</p>
        </div>
      )}
      <div
        className={`absolute ${
          goal ? "top-[25%]" : "top-0"
        } right-1 hidden group-hover:flex gap-[4px]`}
      >
        <Image
          className="cursor-pointer"
          src="/todo-write.svg"
          width={24}
          height={24}
          alt="kebab-icon"
          title="노트 작성/수정"
          onClick={() =>
            router.push(`/dashboard/note/${todo.id}?goalId=${todo.goal.id}`)
          }
        />
        {todo.noteId && (
          <Image
            className="cursor-pointer"
            src="/todo-note.svg"
            width={24}
            height={24}
            alt="kebab-icon"
            title="노트 보기"
            onClick={() => setIsNoteClicked((prev) => !prev)}
          />
        )}
        <Image
          className="cursor-pointer"
          src="/todo-kebab.svg"
          width={24}
          height={24}
          alt="kebab-icon"
          title="수정 / 삭제"
          onClick={() => setIsClicked((prev) => !prev)}
        />
      </div>
      {isClicked && (
        <div
          className="absolute right-0 border bg-white z-10 rounded-lg"
          onMouseLeave={() => setIsClicked(false)}
        >
          <h6
            className="p-5 hover:bg-gray-200 cursor-pointer"
            onClick={() => openModal("edit-todo")}
          >
            수정하기
          </h6>
          <h6
            className="p-5 hover:bg-gray-200 cursor-pointer"
            onClick={handleDeleteTodo}
          >
            삭제하기
          </h6>
        </div>
      )}
      <Modal name="edit-todo" title="할 일 수정">
        <CreateTodo
          closeThis={closeModal}
          startsFrom={todo.goal.id}
          title={todo.title}
          fileUrl={todo.fileUrl}
          linkUrl={todo.linkUrl}
          todoId={todo.id}
          isEdit
        />
      </Modal>
      {isNoteClicked && (
        <div
          className="w-screen h-screen bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-10"
          onClick={() => setIsNoteClicked((prev) => !prev)}
        ></div>
      )}
      <div
        className={`w-full sm:w-3/4 xl:w-1/2 h-full p-[24px] fixed top-0 right-0 bg-white transition-transform duration-700 z-20 ${
          isNoteClicked ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-[16px]">
          <Image
            className="cursor-pointer"
            src="/modal-close.svg"
            width={13}
            height={13}
            alt="close-icon"
            onClick={() => setIsNoteClicked((prev) => !prev)}
          />
        </div>
        <div className="mb-[16px] bg-white rounded-[12px] flex gap-[8px] items-center">
          <div className="w-[24px] h-[24px] bg-[#1E293B] rounded-[8px] flex justify-center items-center">
            <Image
              src="/goal-flag.svg"
              width={14}
              height={14}
              alt="recent-task-icon"
            />
          </div>
          <h1 className="text-[1.6rem] font-semibold">{todo.goal.title}</h1>
        </div>
        <div className="mb-[24px] flex items-center justify-between">
          <div className="flex gap-[8px] items-center">
            <span className="px-[3px] py-[2px] bg-[#f1f5f9] rounded-[4px] text-[1.2rem]">
              {todo.done ? "Done" : "To do"}
            </span>
            <h2 className="text-[1.4rem] text-[#334155]">{todo.title}</h2>
          </div>
          <span className="text-[1.2rem] text-[#64748B]">
            {todo.updatedAt.slice(0, 10)}
          </span>
        </div>
        <h3 className="w-full mb-[12px] py-[12px] border-y focus:outline-none text-[1.8rem]">
          {noteContent?.title}
        </h3>
        {noteContent?.linkUrl && (
          <div className="w-full mt-[12px] mb-[16px] px-[6px] py-[4px] flex justify-between bg-[#E2E8F0] rounded-[20px]">
            <div className="flex gap-[8px] items-center">
              <Image
                src="/note-embed.svg"
                width={24}
                height={24}
                alt="embed-icon"
              />
              <a
                href={
                  noteContent?.linkUrl.includes("https://")
                    ? noteContent.linkUrl
                    : `https://${noteContent.linkUrl}`
                }
                target="_blank"
              >
                <p className="cursor-pointer hover:underline">
                  {noteContent?.linkUrl}
                </p>
              </a>
            </div>
          </div>
        )}
        <textarea
          value={noteContent ? noteContent.content : "불러오는중..."}
          readOnly
          className="w-full h-[500px] overflow-y-auto focus:outline-none"
        />
      </div>
    </div>
  );
}
