"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getTodo } from "@/api/todoApi";
import { TodoType } from "@/types/userTypes";
import { addNote, editNote, getNote } from "@/api/noteApi";
import { NoteType } from "@/types/apiTypes";
import { useModal } from "@/hooks/useModal";
import Image from "next/image";
import LoadingScreen from "@/components/Loading";
// import TextEditor from "@/components/Editor";
import UploadLink from "@/components/modal/upload-link";
import Link from "next/link";

export default function Note() {
  // const todoId = params.noteID;
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const goalId = Number(searchParams.get("goalId"));
  const todoId = Number(pathName.split("/").pop());
  const { Modal, openModal, closeModal } = useModal();
  const [todo, setTodo] = useState<TodoType>();
  const [noteDetail, setNoteDetail] = useState<NoteType>();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [link, setLink] = useState<string>("");
  const [isLinkClicked, setIsLinkClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetail = async () => {
    const response = await getTodo(goalId, undefined, 9999);
    if (response && response.data && response.data.todos) {
      const thisTodo = response.data.todos.find(
        (todo: TodoType) => todo.id === todoId
      );
      if (thisTodo) {
        setTodo(thisTodo);
        if (thisTodo.noteId) {
          const noteResponse = await getNote(thisTodo.noteId);
          if (noteResponse && noteResponse.data) {
            setNoteDetail(noteResponse.data);
            setText(noteResponse.data.content);
            setTitle(noteResponse.data.title);
            setLink(noteResponse.data.linkUrl);
          }
        }
      }
    }
    setIsLoading(false);
  };

  const handleSubmit = async (type: string) => {
    if (type === "create") {
      const response = await addNote(todoId, title, text, link ? link : null);
      if (response) {
        alert("작성완료");
        setNoteDetail(response.data);
        console.log(response);
      }
    } else {
      const response = await editNote(
        Number(noteDetail?.id),
        title,
        text,
        link ? link : null
      );
      if (response) {
        alert("수정완료");
        setNoteDetail(response.data);
        console.log(response);
      }
    }
  };

  useEffect(() => {
    fetchDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex">
      {isLinkClicked && (
        <div className="w-1/2 flex flex-col justify-center items-center gap-3 relative">
          <Image
            className="absolute left-3 top-3 cursor-pointer"
            src="/modal-close.svg"
            width={24}
            height={24}
            alt="close-icon"
            onClick={() => setIsLinkClicked((prev) => !prev)}
          />
          <iframe
            src={link.includes("https://") ? link : `https://${link}`}
            className="w-full h-3/4 "
            title="Embeded Link"
          />
          <Link
            className="hover:underline"
            href={link.includes("https://") ? link : `https://${link}`}
            target="_blank"
          >
            <h2>새창에서 열기</h2>
          </Link>
        </div>
      )}
      <main
        className={`${
          isLinkClicked ? "w-1/2" : "w-full"
        } h-[calc(100vh-51px)] lg:h-screen bg-white mt-[51px] lg:mt-0`}
      >
        <div
          className={`w-[343px] sm:w-full ${
            isLinkClicked ? "2xl:w-full" : "2xl:w-[1200px]"
          } h-[calc(100vh-40px)] mx-auto p-[24px]`}
        >
          <div className="mb-[24px] flex justify-between items-center">
            <h2 className=" text-[1.8rem] font-semibold">
              {noteDetail ? "노트 수정" : "노트 작성"}
            </h2>
            <div className="flex items-center gap-[31px] text-[1.4rem]">
              <h6 className="text-[#3B82F6] cursor-pointer">임시저장</h6>
              <h6
                className={`px-[24px] py-[12px] text-white rounded-[12px] cursor-pointer ${
                  title && text ? "bg-[#3B82F6]" : "bg-[#94A3B8] cursor-default"
                }`}
                onClick={() =>
                  title && text && noteDetail
                    ? handleSubmit("edit")
                    : handleSubmit("create")
                }
              >
                {noteDetail ? "수정하기" : "작성 완료"}
              </h6>
            </div>
          </div>
          <div className="mb-[12px] flex gap-[6px] items-center">
            <div className="w-[24px] h-[24px] bg-[#1E293B] rounded-[6px] flex justify-center items-center">
              <Image
                src="/goal-flag.svg"
                width={16}
                height={16}
                alt="recent-task-icon"
              />
            </div>
            <h1 className="font-medium">{todo?.goal.title}</h1>
          </div>
          <div className="mb-[24px] flex gap-[8px] items-center">
            <h2 className="px-[3px] py-[2px] bg-[#f1f5f9] rounded-[4px] text-[1.2rem]">
              {todo?.done ? "Done" : "To do"}
            </h2>
            <h2 className="text-[1.4rem]">{todo?.title}</h2>
          </div>
          <input
            value={title}
            type="text"
            placeholder="노트의 제목을 입력해주세요"
            className="w-full mb-[12px] py-[12px] border-y focus:outline-none text-[1.8rem]"
            onChange={(e) => setTitle(e.target.value)}
          />
          <h2 className="mb-[8px] text-[1.2rem] font-medium">{`공백포함 : 총 ${
            text.length
          }자 | 공백제외 : 총 ${text.replace(/\s+/g, "").length}자`}</h2>
          {link ? (
            <div className="w-full mt-[12px] mb-[16px] px-[6px] py-[4px] flex justify-between bg-[#E2E8F0] rounded-[20px]">
              <div className="flex gap-[8px] items-center">
                <Image
                  src="/note-embed.svg"
                  width={24}
                  height={24}
                  alt="embed-icon"
                />
                <p
                  className="cursor-pointer hover:underline"
                  onClick={() => setIsLinkClicked((prev) => !prev)}
                >
                  {link}
                </p>
              </div>
              <Image
                className="cursor-pointer"
                src="/note-delete.svg"
                width={18}
                height={18}
                alt="delete-icon"
                onClick={() => {
                  setLink("");
                  setIsLinkClicked(false);
                }}
              />
            </div>
          ) : (
            <div
              className="mt-[12px] mb-[16px] px-[6px] py-[4px] flex gap-[8px] cursor-pointer hover:underline"
              onMouseDown={() => openModal("upload-link")}
            >
              <Image
                className="cursor-pointer"
                src="/button-link.png"
                width={24}
                height={24}
                alt="link-icon"
              />
              <span>링크첨부</span>
            </div>
          )}
          {/* <TextEditor
            text={text}
            setText={setText}
            openModal={() => openModal("upload-link")}
          /> */}
          <textarea
            value={text}
            placeholder="이 곳을 클릭해 노트 작성을 시작해주세요"
            className="w-full h-[500px] p-5 overflow-y-auto focus:outline-none"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </main>
      <Modal name="upload-link" title="링크 업로드">
        <UploadLink
          closeModal={closeModal}
          atNote={true}
          linkForNote={link}
          setLinkForNote={setLink}
        />
      </Modal>
    </div>
  );
}
