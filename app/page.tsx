"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  if (Cookies.get("accessToken")) {
    router.push("/dashboard");
  } else {
    router.push("/sign-in");
  }
}
