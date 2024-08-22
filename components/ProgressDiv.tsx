import React, { useEffect } from "react";
import Image from "next/image";
import { ProgressDivType } from "./types/componentTypes";
import ProgressCircle, { setProgress } from "./ProgressCircle";

export default function ProgressDiv({
  ratio,
  progressValue,
  setProgressValue,
}: ProgressDivType) {
  useEffect(() => {
    // 숫자 애니메이션 설정
    const interval = setInterval(() => {
      setProgressValue((prev) => {
        if (prev < ratio) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 10); // 숫자가 증가하는 속도 조절

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, [ratio, setProgressValue]);

  setProgress(100 - ratio);
  return (
    <div className="w-full 2xl:w-[588px] h-[280px] px-[24px] py-[16px] flex flex-col gap-[16px] rounded-[12px] bg-[#3B82F6] text-white relative">
      <Image
        src="/dashboard-progress.png"
        width={40}
        height={40}
        alt="pregress-task-icon"
      />
      <div>
        <h2>내 진행 상황</h2>
        <h2>
          <span className="text-[3rem] font-semibold">{progressValue}</span>%
        </h2>
      </div>
      <ProgressCircle />
      <Image
        className="absolute right-0 bottom-0"
        src="/bg-outter.svg"
        width={166}
        height={166}
        alt="bg-outter"
      />
    </div>
  );
}
