export default function ProgressBar() {
  const temp = 76;

  return (
    <div className="w-full h-auto px-[9px] bg-white rounded-[13px] border border-[#F1F5F9] flex items-center gap-[8px]">
      <div className="w-full h-[4px] bg-[#F1F5F9] rounded-[6px] relative">
        <div
          style={{ width: `${temp}%` }}
          className="h-[4px] bg-[#000] rounded-[6px] absolute"
        ></div>
      </div>
      <span className="text-[1.2rem] font-semibold">{temp}%</span>
    </div>
  );
}
