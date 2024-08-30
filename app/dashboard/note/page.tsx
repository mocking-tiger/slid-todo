import Image from "next/image";

export default function Note() {
  return (
    <div>
      <main className="w-full h-[calc(100vh-51px)] lg:h-screen bg-white mt-[51px] lg:mt-0">
        <div className="w-[343px] sm:w-full 2xl:w-[1200px] h-[calc(100vh-40px)] mx-auto p-[24px] ">
          <div className="mb-[24px] flex justify-between items-center">
            <h2 className=" text-[1.8rem] font-semibold">노트 작성</h2>
            <div className="flex items-center gap-[31px] text-[1.4rem]">
              <h6 className="text-[#3B82F6]">임시저장</h6>
              <h6 className="px-[24px] py-[12px] text-white bg-[#94A3B8] rounded-[12px]">
                작성 완료
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
            <h1 className="font-medium">목표 타이틀 들어갈 곳</h1>
          </div>
          <div className="mb-[24px] flex gap-[8px] items-center">
            <h2 className="px-[3px] py-[2px] bg-[#f1f5f9] rounded-[4px] text-[1.2rem]">
              할일 상태
            </h2>
            <h2 className="text-[1.4rem]">할 일 타이틀 들어갈 곳</h2>
          </div>
          <input
            type="text"
            placeholder="노트의 제목을 입력해주세요"
            className="w-full mb-[12px] py-[12px] border-y focus:outline-none"
          />
          <h2 className="mb-[8px]">{`공백포함 : 총 ${0}자 | 공백제외 : 총 ${0}자`}</h2>
          <textarea
            placeholder="이 곳을 클릭해 노트 작성을 시작해주세요"
            className="w-full min-h-[600px] overflow-y-auto focus:outline-none"
          />
        </div>
      </main>
    </div>
  );
}
