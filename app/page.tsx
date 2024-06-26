import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen py-12 sm:py-16 xl:py-[120px] select-none">
      <div className="w-[343px] sm:w-[640px] mx-auto">
        <div className="w-fit mx-auto mb-10 py-[20.3px] pl-[12.7px] pr-[13.2px]">
          <Image src="/logo.svg" width={244} height={48} alt="로고" />
        </div>
        <div className="mb-12 flex flex-col gap-6">
          <Input span="아이디" placeholder="이메일을 입력해주세요" />
          <Input
            span="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            isPassword
          />
        </div>
        <Button>로그인하기</Button>
        <p className="w-fit mx-auto text-[1.4rem]">
          슬리드 투 두가 처음이신가요?{" "}
          <Link href="#" className="text-[#3182F6] text-[1.4rem]">
            회원가입
          </Link>
        </p>
      </div>
    </main>
  );
}
