"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTodoContext } from "@/context/TodoContext";
import { NoteListType, NoteType } from "@/types/apiTypes";
import Image from "next/image";
import deleteNote, { getNote } from "@/api/noteApi";

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
        alert("삭제되었습니다.");
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
          <h1 className="text-[1.6rem] font-semibold">{note.goal.title}</h1>
        </div>
        <div className="mb-[24px] flex items-center justify-between">
          <div className="flex gap-[8px] items-center">
            <span className="px-[3px] py-[2px] bg-[#f1f5f9] rounded-[4px] text-[1.2rem]">
              {note.todo.done ? "Done" : "To do"}
            </span>
            <h2 className="text-[1.4rem] text-[#334155]">{note.todo.title}</h2>
          </div>
          <span className="text-[1.2rem] text-[#64748B]">
            {note.updatedAt.slice(0, 10)}
          </span>
        </div>
        <h3 className="w-full mb-[12px] py-[12px] border-y focus:outline-none text-[1.8rem]">
          {note.title}
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
