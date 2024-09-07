"use client"; // 클라이언트 전용 컴포넌트라는 것을 명시

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 컴포넌트가 클라이언트에서만 렌더링되도록 설정
    setIsClient(true);
  }, []);

  return isClient ? <ToastContainer /> : null; // 클라이언트에서만 ToastContainer 렌더링
}
