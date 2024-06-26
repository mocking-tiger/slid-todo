"use client";

import Image from "next/image";
import { InputType } from "./types/componentTypes";
import { useState } from "react";

export default function Input({
  span,
  placeholder,
  type = "text",
  isPassword = false,
}: InputType) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <label className="flex flex-col relative">
      <span className="mb-3 text-[1.6rem] font-semibold">{span}</span>
      <input
        className="px-[24px] py-[12px] bg-[#F8FAFC] rounded-xl focus:outline-none focus:shadow-input transition-shadow duration-500"
        placeholder={placeholder}
        type={isPassword ? (isVisible ? type : "password") : "text"}
      />
      {isPassword && (
        <Image
          src={isVisible ? "/eye-on.svg" : "/eye-off.svg"}
          width={24}
          height={24}
          alt="패스워드 숨기기 아이콘"
          className="cursor-pointer absolute right-[24px] top-[43px]"
          onClick={() => setIsVisible((prev) => !prev)}
        />
      )}
    </label>
  );
}
