import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  return (
    <main className="h-screen py-12 sm:py-16 xl:py-[120px] select-none">
      <div className="w-[343px] sm:w-[640px] mx-auto">
        <div className="w-fit mx-auto mb-[40px] py-[20.3px] pl-[12.7px] pr-[13.2px]">
          <Link href="/">
            <Image src="/logo.svg" width={244} height={48} alt="로고" />
          </Link>
        </div>
        <div className="mb-[48px] flex flex-col gap-[24px]">
          <Input span="이름" placeholder="이름을 입력해주세요" />
          <Input
            span="이메일"
            placeholder="이메일을 입력해주세요"
            type="email"
          />
          <Input
            span="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            isPassword
          />
          <Input
            span="비밀번호 확인"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            isPassword
          />
        </div>
        <Button>로그인하기</Button>
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
