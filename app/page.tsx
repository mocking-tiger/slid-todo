"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("accessToken");
      if (token) {
        router.push("/dashboard");
      } else {
        router.push("/sign-in");
      }
    }
  }, [router]);

  return null;
}
