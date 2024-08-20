import { ReactNode } from "react";

export default function Button({
  children,
  onClick,
  color,
  text,
  border,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  color?: string;
  text?: string;
  border?: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={`w-full py-[12px] rounded-xl ${
        color ? color : disabled ? "bg-[#94A3B8]" : "bg-[#3B82F6]"
      } ${text ? text : "text-white"} ${border ? border : ""} `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
