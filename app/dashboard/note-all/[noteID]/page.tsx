"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getAllNotes } from "@/api/noteApi";
import { NoteListType } from "@/types/apiTypes";
import Image from "next/image";
import LoadingScreen from "@/components/Loading";
import NoteListItem from "@/components/NoteListItem";
import { useTodoContext } from "@/context/TodoContext";
import Link from "next/link";

export default function NoteAll() {
  const path = usePathname();
  const goalId = Number(path.split("/").pop());
  const { isUpdated } = useTodoContext();
  const [notes, setNotes] = useState<NoteListType[]>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = async () => {
    const response = await getAllNotes(goalId);
    if (response) {
      console.log(response);
      setNotes(response.data.notes);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <main className="w-full h-[calc(100vh-51px)] lg:h-screen bg-[#F1F5F9] mt-[51px] lg:mt-0">
        <div className="w-[343px] sm:w-full 2xl:w-[1200px] h-[calc(100vh-60px)] mx-auto p-[24px] overflow-y-auto select-none">
          <div className="flex justify-between">
            <h2 className="mb-[12px] text-[1.8rem] font-semibold">
              노트 모아보기
            </h2>
          </div>
          <div className="mb-[16px] bg-white px-[24px] py-[16px] rounded-[12px] flex gap-[8px] items-center">
            <div className="w-[24px] h-[24px] bg-[#1E293B] rounded-[8px] flex justify-center items-center">
              <Image
                src="/goal-flag.svg"
                width={14}
                height={14}
                alt="recent-task-icon"
              />
            </div>
            <h1 className="text-[1.4rem] font-semibold">
              <Link
                href={`http://localhost:3000/dashboard/goal/${
                  notes && notes[0].goal.id
                }`}
              >
                {notes && notes[0].goal.title}
              </Link>
            </h1>
          </div>
          <div className="flex flex-col gap-[16px]">
            {notes?.map((note) => (
              <NoteListItem key={note.id} note={note} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
