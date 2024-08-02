"use client";

import { useEffect, useState } from "react";
import { signUp } from "@/api/userApi";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import LoadingScreen from "@/components/Loading";
import Cookies from "js-cookie";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [passwordRepeat, setPasswordRepeat] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const handleSignUp = async () => {
    if (password === passwordRepeat) {
      const response = await signUp(name, email, password);
      if (response) {
        alert("회원가입이 완료되었습니다.");
        router.push("/");
      }
    } else {
      alert("비밀번호를 확인해주세요.");
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
          <Link href="/">
            <Image src="/logo.svg" width={244} height={48} alt="로고" />
          </Link>
        </div>
        <div className="mb-[48px] flex flex-col gap-[24px]">
          <Input
            span="이름"
            placeholder="이름을 입력해주세요"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            span="이메일"
            placeholder="이메일을 입력해주세요"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            span="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            isPassword
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            span="비밀번호 확인"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            isPassword
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
        </div>
        <Button onClick={handleSignUp}>회원가입</Button>
        <p className="w-fit mx-auto text-[1.4rem]">
          이미 회원이신가요?{" "}
          <Link href="/" className="text-[#3182F6] text-[1.4rem]">
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
}
