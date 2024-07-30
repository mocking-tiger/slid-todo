import { ReactNode } from "react";

export default function Button({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="w-full mb-[40px] py-[12px] bg-[#94A3B8] rounded-xl text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
