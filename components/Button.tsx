import { ReactNode } from "react";

export default function Button({
  children,
  onClick,
  color,
  text,
  border,
}: {
  children: ReactNode;
  onClick: () => void;
  color?: string;
  text?: string;
  border?: string;
}) {
  return (
    <button
      className={`w-full py-[12px] rounded-xl ${
        color ? color : "bg-[#94A3B8]"
      } ${text ? text : "text-white"} ${border ? border : ""} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
