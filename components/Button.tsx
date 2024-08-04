import { ReactNode } from "react";

export default function Button({
  children,
  onClick,
  color,
}: {
  children: ReactNode;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      className={`w-full py-[12px] ${
        color ? color : "bg-[#94A3B8]"
      } rounded-xl text-white`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
