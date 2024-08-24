import { useEffect, useState } from "react";

export default function ProgressBar({ progress }: { progress?: number }) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    // progress 값이 바뀔 때마다 애니메이션이 실행되도록 설정
    setAnimatedProgress(progress || 0);
  }, [progress]);

  return (
    <div className="w-full h-auto px-[9px] bg-white rounded-[13px] border border-[#F1F5F9] flex items-center gap-[8px]">
      <div className="w-full h-[4px] bg-[#F1F5F9] rounded-[6px] relative">
        <div
          style={{
            width: `${animatedProgress}%`,
            transition: "width 0.5s ease",
          }}
          className="h-[4px] bg-[#000] rounded-[6px] absolute"
        ></div>
      </div>
      <span className="text-[1.2rem] font-semibold">
        {progress ? progress : 0}%
      </span>
    </div>
  );
}
