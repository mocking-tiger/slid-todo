"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTodoContext } from "@/context/TodoContext";
import { NoteListType, NoteType } from "@/types/apiTypes";
import { toast } from "react-toastify";
import Image from "next/image";
import deleteNote, { getNote } from "@/api/noteApi";
import NoteViewer from "./NoteViewer";

export default function NoteListItem({ note }: { note: NoteListType }) {
  const router = useRouter();
  const { updateTodos } = useTodoContext();
  const [isKebabClicked, setIsKebabClicked] = useState(false);
  const [isNoteClicked, setIsNoteClicked] = useState(false);
  const [noteContent, setNoteContent] = useState<NoteType>();

  const fetchNoteContent = async () => {
    const response = await getNote(note.id);
    if (response) {
      console.log(response);
      setNoteContent(response.data);
    }
  };

  const handleDelete = async () => {
    const really = confirm("정말 삭제하시겠습니까?");
    if (really) {
      const response = await deleteNote(note.id);
      if (response) {
        toast.success("삭제되었습니다.");
        updateTodos();
      }
    }
  };

  useEffect(() => {
    fetchNoteContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          onClick={() => setIsKebabClicked((prev) => !prev)}
        />
      </div>
      <h2
        className="text-[1.8rem] hover:underline cursor-pointer"
        onClick={() => setIsNoteClicked((prev) => !prev)}
      >
        {note.title}
      </h2>
      <hr className="my-[12px]" />
      <div className="flex gap-[8px]">
        <span className="px-[3px] py-[2px] bg-[#f1f5f9] rounded-[4px] text-[1.2rem]">
          {note.todo.done ? "Done" : "To do"}
        </span>
        <h3>{note.todo.title}</h3>
      </div>
      {isKebabClicked && (
        <div
          className="absolute right-10 top-20 border bg-white z-10 rounded-lg"
          onMouseLeave={() => setIsKebabClicked(false)}
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
      <NoteViewer
        isNoteClicked={isNoteClicked}
        setIsNoteClicked={setIsNoteClicked}
        noteContent={noteContent}
      />
    </div>
  );
}
