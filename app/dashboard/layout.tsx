"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TodoProvider } from "@/context/TodoContext";
import LoadingScreen from "@/components/Loading";
import Cookies from "js-cookie";
import SideBar from "@/components/SideBar";

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

  return (
    <TodoProvider>
      <div className="lg:flex">
        <SideBar />
        <main className="flex-1 bg-[#F1F5F9]">{children}</main>
      </div>
    </TodoProvider>
  );
}
