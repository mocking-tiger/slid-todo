"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/api/authApi";
import { useUserStore } from "../../zustand/userStore";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import LoadingScreen from "@/components/Loading";

export default function SignIn() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUserInfo);
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async () => {
    const response = await signIn(email, password);
    if (response.user) {
      setUser(response.user);
      router.push("/dashboard");
    } else {
      setErrorMessage(response.response.data.message);
    }
  };

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="h-screen py-12 sm:py-16 xl:py-[120px] select-none">
      <div className="w-[343px] sm:w-[640px] mx-auto">
        <div className="w-fit mx-auto mb-[40px] py-[20.3px] pl-[12.7px] pr-[13.2px]">
          <Image src="/logo.svg" width={244} height={48} alt="로고" priority />
        </div>
        <div className="mb-[48px] flex flex-col gap-[24px]">
          <Input
            span="아이디"
            placeholder="이메일을 입력해주세요"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setErrorMessage("")}
          />
          {errorMessage && errorMessage !== "비밀번호가 올바르지 않습니다." && (
            <span className="-my-[20px] text-red-500 animate-shake">
              {errorMessage}
            </span>
          )}
          <Input
            span="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            isPassword
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setErrorMessage("")}
          />
          {errorMessage && errorMessage === "비밀번호가 올바르지 않습니다." && (
            <span className="-my-[20px] text-red-500 animate-shake">
              {errorMessage}
            </span>
          )}
        </div>
        <Button onClick={handleSignIn}>로그인</Button>
        <p className="w-fit mx-auto mt-[40px] text-[1.4rem]">
          슬리드 투 두가 처음이신가요?{" "}
          <Link href="/sign-up" className="text-[#3182F6] text-[1.4rem]">
            회원가입
          </Link>
        </p>
      </div>
      <h6 className="fixed right-1 bottom-0">v 1.1</h6>
    </main>
  );
}
