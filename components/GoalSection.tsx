import ProgressBar from "./ProgressBar";

export default function GoalSection() {
  return (
    <div className="w-full h-auto p-[24px] bg-[#EFF6FF] rounded-[32px]">
      <div className="flex justify-between">
        <h1 className="mb-[8px] text-[1.8rem] font-bold">타이틀</h1>
        <span className="text-[1.4rem] text-[#3B82F6] cursor-pointer">
          + 할일 추가
        </span>
      </div>
      <div className="mb-[16px]">
        <ProgressBar />
      </div>
      <div className="w-full flex">
        <div className="w-full">
          <h2 className="text-[1.4rem]">To do</h2>
          <ul>
            <li className="text-[1.4rem]">미완료된 할 일</li>
          </ul>
        </div>
        <div className="w-full">
          <h2 className="text-[1.4rem]">Done</h2>
          <ul>
            <li className="text-[1.4rem]">완료된 할 일</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
