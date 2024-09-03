"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTodoContext } from "@/context/TodoContext";
import { NoteListType } from "@/types/apiTypes";
import Image from "next/image";
import deleteNote from "@/api/noteApi";

export default function NoteListItem({ note }: { note: NoteListType }) {
  const router = useRouter();
  const { updateTodos } = useTodoContext();
  const [isClicked, setIsClicked] = useState(false);

  const handleDelete = async () => {
    const really = confirm("정말 삭제하시겠습니까?");
    if (really) {
      const response = await deleteNote(note.id);
      if (response) {
        alert("삭제되었습니다.");
        updateTodos();
      }
    }
  };

  return (
    <div key={note.id} className="bg-white p-[24px] rounded-[12px] relative">
      <div className="mb-[16px] flex justify-between">
        <Image
          src="/note-header.png"
          width={28}
          height={28}
          alt="note-header-icon"
        />
        <Image
          className="cursor-pointer"
          src="/note-kebab.png"
          width={28}
          height={28}
          alt="note-header-icon"
          onClick={() => setIsClicked((prev) => !prev)}
        />
      </div>
      <h2 className="text-[1.8rem]">{note.title}</h2>
      <hr className="my-[12px]" />
      <div className="flex gap-[8px]">
        <span className="px-[3px] py-[2px] bg-[#f1f5f9] rounded-[4px] text-[1.2rem]">
          {note.todo.done ? "Done" : "To do"}
        </span>
        <h3>{note.todo.title}</h3>
      </div>
      {isClicked && (
        <div
          className="absolute right-10 top-20 border bg-white z-10 rounded-lg"
          onMouseLeave={() => setIsClicked(false)}
        >
          <h6
            className="p-5 hover:bg-gray-200 cursor-pointer"
            onClick={() =>
              router.push(
                `/dashboard/note/${note.todo.id}?goalId=${note.goal.id}`
              )
            }
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
  );
}
