"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { NewTodoType } from "../types/componentTypes";
import Button from "../Button";

export default function UploadLink({
  closeModal,
  newTodo,
  setNewTodo,
  atNote = false,
  setLinkForNote,
}: {
  closeModal: () => void;
  newTodo?: NewTodoType;
  setNewTodo?: Dispatch<SetStateAction<NewTodoType>>;
  atNote?: boolean;
  linkForNote?: string;
  setLinkForNote?: Dispatch<SetStateAction<string>>;
}) {
  const [link, setLink] = useState("");
  const [tempLink, setTempLink] = useState("");

  const handleChangeLink = () => {
    if (setNewTodo && newTodo) {
      setNewTodo({ ...newTodo, linkUrl: link });
      closeModal();
    }
  };

  const handleChangeLinkForNote = () => {
    const text = tempLink;
    setLinkForNote && setLinkForNote(text);
    closeModal();
  };

  return (
    <div className="flex flex-col gap-[24px] select-none">
      <div>
        <h2 className="mb-[12px] font-[600]">제목</h2>
        <input
          className="w-full px-[24px] py-[12px] bg-[#F8FAFC] rounded-[12px] focus:outline-none"
          placeholder="영상이나 글, 파일의 링크를 넣어주세요"
          onChange={(e) =>
            atNote ? setTempLink(e.target.value) : setLink(e.target.value)
          }
        ></input>
      </div>
      <div className="">
        <Button
          disabled={
            atNote
              ? tempLink !== ""
                ? false
                : true
              : link !== ""
              ? false
              : true
          }
          onClick={atNote ? handleChangeLinkForNote : handleChangeLink}
        >
          확인
        </Button>
      </div>
    </div>
  );
}
