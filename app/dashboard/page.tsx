"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LoadingScreen from "@/components/Loading";
import { getUser } from "@/api/userApi";
import { BasicUserType } from "@/types/userTypes";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<BasicUserType>();

  const getUserInfo = async () => {
    const response = await getUser();
    if (response) {
      setUserInfo(response.data);
      console.log(response.data);
    }
  };

  useEffect(() => {
    if (!Cookies.get("accessToken")) {
      router.push("/");
    } else {
      getUserInfo();
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <h2>{userInfo?.email}</h2>
      <h2>{userInfo?.name}</h2>
    </div>
  );
}
