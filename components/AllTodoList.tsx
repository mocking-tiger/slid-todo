import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import { useTodoContext } from "@/context/TodoContext";
import { deleteTodo, patchTodo } from "@/api/todoApi";
import { NoteType, TodoType } from "@/types/apiTypes";
import { getNote } from "@/api/noteApi";
import Image from "next/image";
import CreateTodo from "./modal/create-todo";
import NoteViewer from "./NoteViewer";

export default function AllTodoList({
  todo,
  goal = true,
  atGoalSection,
}: {
  todo: TodoType;
  goal?: boolean;
  atGoalSection?: boolean;
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

  const handleDeleteTodo = async () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await deleteTodo(todo.id);
      updateTodos();
    }
  };

  useEffect(() => {
    fetchNoteContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      key={todo.id}
      className={`relative group rounded-2xl ${
        goal ? "hover:border" : "hover:underline"
      } `}
    >
      <li className="flex gap-[8px] items-center">
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

        <span
          className={`text-[1.4rem] ${todo.done ? "line-through" : ""}`}
          onClick={() =>
            todo.noteId
              ? setIsNoteClicked((prev) => !prev)
              : router.push(`/dashboard/note/${todo.id}?goalId=${todo.goal.id}`)
          }
        >
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
        className={`absolute ${atGoalSection && "bg-[#EFF6FF] rounded-3xl"} ${
          goal ? "top-[25%]" : "top-0"
        } right-1 hidden group-hover:flex gap-[4px]`}
      >
        {todo.fileUrl && (
          <a
            href={
              todo.fileUrl.includes("https://")
                ? todo.fileUrl
                : `https://${todo.fileUrl}`
            }
          >
            <Image
              className="cursor-pointer"
              src="/todo-file.png"
              width={24}
              height={24}
              alt="kebab-icon"
              title="첨부 파일"
            />
          </a>
        )}
        {todo.linkUrl && (
          <a
            href={
              todo.linkUrl.includes("https://")
                ? todo.linkUrl
                : `https://${todo.linkUrl}`
            }
            target="_blank"
          >
            <Image
              className="cursor-pointer"
              src="/todo-link.png"
              width={24}
              height={24}
              alt="kebab-icon"
              title="첨부 링크"
            />
          </a>
        )}
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
      <NoteViewer
        isNoteClicked={isNoteClicked}
        setIsNoteClicked={setIsNoteClicked}
        noteContent={noteContent}
      />
    </div>
  );
}
