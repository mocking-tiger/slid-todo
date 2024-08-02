"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("accessToken")) {
      router.push("/");
    }
  });

  return <p>대시보드 입니다</p>;
}
