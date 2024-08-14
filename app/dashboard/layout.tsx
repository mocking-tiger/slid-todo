"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/Loading";
import Cookies from "js-cookie";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!Cookies.get("accessToken")) {
      router.push("/");
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <div>{children}</div>;
}
