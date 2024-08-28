import { patchTodo } from "@/api/todoApi";
import { useTodoContext } from "@/context/TodoContext";
import { TodoType } from "@/types/apiTypes";
import Image from "next/image";

export default function AllTodoList({ todo }: { todo: TodoType }) {
  const { updateTodos } = useTodoContext();

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
  return (
    <div key={todo.id} className="relative group hover:border rounded-2xl">
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

        <span className={todo.done ? "line-through" : ""}>{todo.title}</span>
      </li>
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
      <div className="absolute top-[25%] right-1 hidden group-hover:flex gap-[4px]">
        {todo.noteId === null ? (
          <Image
            className="cursor-pointer"
            src="/todo-write.svg"
            width={24}
            height={24}
            alt="kebab-icon"
            title="노트 작성"
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
        />
      </div>
    </div>
  );
}
