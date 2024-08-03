"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../zustand/userStore";
import Cookies from "js-cookie";
import LoadingScreen from "@/components/Loading";

export default function Dashboard() {
  const router = useRouter();
  const user = useUserStore((state) => state.userInfo);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!Cookies.get("accessToken")) {
      router.push("/");
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <h2>{user.email}</h2>
      <h2>{user.name}</h2>
    </div>
  );
}
