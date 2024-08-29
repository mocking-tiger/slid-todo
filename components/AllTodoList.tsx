import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTodoContext } from "@/context/TodoContext";
import { deleteTodo, patchTodo } from "@/api/todoApi";
import { TodoType } from "@/types/apiTypes";
import Image from "next/image";
import { useModal } from "@/hooks/useModal";
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

  console.log(todo);

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

  return (
    <div
      key={todo.id}
      className={`relative group rounded-2xl ${goal ? "hover:border" : ""} `}
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
        {todo.noteId === null ? (
          <Image
            className="cursor-pointer"
            src="/todo-write.svg"
            width={24}
            height={24}
            alt="kebab-icon"
            title="노트 작성"
            onClick={() => router.push("/dashboard/note")}
          />
        ) : (
          <Image
            className="cursor-pointer"
            src="/todo-note.svg"
            width={24}
            height={24}
            alt="kebab-icon"
            title="노트 보기"
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
    </div>
  );
}
