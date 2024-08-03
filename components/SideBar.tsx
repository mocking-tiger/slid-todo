"use client";

import { useUserStore } from "@/zustand/userStore";
import { useState } from "react";

export default function SideBar() {
  const user = useUserStore((state) => state.userInfo);
  const [isHide, setIsHide] = useState(false);

  return (
    <aside>
      <div
        className={`w-[280px] h-screen border-r float-left ${
          isHide && "hidden"
        }`}
      >
        <p>사이드바</p>
        <h2>{user.email}</h2>
        <h2>{user.name}</h2>
        <button className="border" onClick={() => setIsHide((prev) => !prev)}>
          {"<<"}
        </button>
      </div>
      {isHide && (
        <div className="w-[32px] h-screen border-r float-left">
          <button className="border" onClick={() => setIsHide((prev) => !prev)}>
            {">>"}
          </button>
        </div>
      )}
    </aside>
  );
}
