"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LoadingScreen from "@/components/Loading";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!Cookies.get("accessToken")) {
      router.push("/");
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <p>대시보드 입니다</p>;
}
