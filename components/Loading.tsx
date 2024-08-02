import Image from "next/image";

export default function LoadingScreen() {
  return (
    <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
      <div>
        <Image
          src="/logo.svg"
          width={244}
          height={48}
          alt="로고"
          className="animate-bounce"
        />
        <h2 className="w-full text-[2rem] text-center">now Loading...</h2>
      </div>
    </div>
  );
}
