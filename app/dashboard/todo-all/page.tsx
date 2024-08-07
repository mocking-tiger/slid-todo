import SideBar from "@/components/SideBar";

export default function TodoAll() {
  const temp = 6;

  return (
    <div>
      <SideBar />
      <main className="w-full h-[calc(100vh-51px)] lg:h-screen bg-[#F1F5F9]">
        <div className="w-[343px] sm:w-full 2xl:w-[1200px] h-[calc(100vh-40px)] mx-auto p-[24px] ">
          <div className="flex justify-between">
            <h2 className="mb-[12px] text-[1.8rem] font-semibold">
              모든 할 일 {`(${temp})`}
            </h2>
            <span className="text-[1.4rem] text-[#3B82F6] cursor-pointer">
              + 할일 추가
            </span>
          </div>
          <div className="flex">
            <div className="w-full h-[250px] px-[24px] py-[16px] flex flex-col gap-[16px] rounded-[12px] bg-white">
              <div className="flex items-center gap-[8px]">
                <div className="px-[12px] py-[4px] border border-gray-300 rounded-[17px] cursor-pointer">
                  All
                </div>
                <div className="px-[12px] py-[4px] border border-gray-300 rounded-[17px] cursor-pointer">
                  To do
                </div>
                <div className="px-[12px] py-[4px] border border-gray-300 rounded-[17px] cursor-pointer">
                  Done
                </div>
              </div>
              <div>모든 할 일 리스트 들어갈 곳</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
