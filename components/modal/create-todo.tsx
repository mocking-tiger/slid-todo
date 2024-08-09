"use client";

import Image from "next/image";
import Button from "../Button";

export default function CreateTodo() {
  return (
    <div className="flex flex-col gap-[24px]">
      <div>
        <h2 className="mb-[12px] font-[600]">제목</h2>
        <input
          className="w-full px-[24px] py-[12px] bg-[#F8FAFC] rounded-[12px] focus:outline-none"
          placeholder="할 일의 제목을 적어주세요"
        ></input>
      </div>
      <div>
        <h2 className="mb-[12px] font-[600]">자료</h2>
        <div className="mb-[12px] flex gap-[12px]">
          <div className="w-fit p-[8px] border flex gap-[7px] rounded-[8px] bg-[#F1F5F9] cursor-pointer">
            <Image
              src="/modal-unchecked.svg"
              width={24}
              height={24}
              alt="checkbox-icon"
            />
            <span>파일 업로드</span>
          </div>
          <div className="w-fit p-[8px] border flex gap-[7px] rounded-[8px] bg-[#F1F5F9] cursor-pointer">
            <Image
              src="/modal-unchecked.svg"
              width={24}
              height={24}
              alt="checkbox-icon"
            />
            <span>링크 첨부</span>
          </div>
        </div>
        <div className="w-full h-[184px] flex justify-center items-center bg-[#F8FAFC] rounded-[12px] cursor-pointer">
          {
            <div className="text-[#94A3B8] text-center">
              <p>+</p>
              <p>파일을 업로드해주세요</p>
            </div>
          }
        </div>
      </div>
      <div>
        <h2 className="mb-[12px] font-[600]">목표</h2>
        <div className="w-full px-[20px] py-[12px] flex justify-between bg-[#F8FAFC] rounded-[12px] cursor-pointer">
          <p className="text-[#94A3B8]">목표를 선택해주세요</p>
          <Image
            src="/modal-arrowdown.svg"
            width={24}
            height={24}
            alt="arrowdown-icon"
          />
        </div>
      </div>
      <Button onClick={() => {}}>확인</Button>
    </div>
  );
}
