"use client";

import { Dispatch, SetStateAction } from "react";
import { NoteType } from "@/types/apiTypes";
import Image from "next/image";

export default function NoteViewer({
  isNoteClicked,
  setIsNoteClicked,
  noteContent,
}: {
  isNoteClicked: boolean;
  setIsNoteClicked: Dispatch<SetStateAction<boolean>>;
  noteContent: NoteType | undefined;
}) {
  const handleLinkClick = (linkUrl: string) => {
    const url = linkUrl.includes("https://") ? linkUrl : `https://${linkUrl}`;
    const screen = window.screen.width;
    const windowWidth = screen > 450 ? window.screen.width * 0.5 : screen;
    const windowHeight = window.screen.height;
    const windowLeft = window.screenX;
    const windowTop = window.screenY + 100;

    window.open(
      url,
      "_blank",
      `width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop}`
    );
  };

  return (
    <div className="relative">
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
          <h1 className="text-[1.6rem] font-semibold">
            {noteContent?.goal.title}
          </h1>
        </div>
        <div className="mb-[24px] flex items-center justify-between">
          <div className="flex gap-[8px] items-center">
            <span className="px-[3px] py-[2px] bg-[#f1f5f9] rounded-[4px] text-[1.2rem]">
              {noteContent?.todo.done ? "Done" : "To do"}
            </span>
            <h2 className="text-[1.4rem] text-[#334155]">
              {noteContent?.todo.title}
            </h2>
          </div>
          <span className="text-[1.2rem] text-[#64748B]">
            {noteContent?.updatedAt.slice(0, 10)}
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
              <p
                className="cursor-pointer hover:underline text-ellipsis overflow-hidden"
                onClick={() => handleLinkClick(noteContent.linkUrl)}
              >
                {noteContent?.linkUrl}
              </p>
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
