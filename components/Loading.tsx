import Image from "next/image";

export default function LoadingScreen() {
  return (
    <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
      <div>
        <Image
          src="/logo.svg"
          width={0}
          height={0}
          style={{ width: "244px", height: "auto" }}
          alt="로고"
          className="animate-bounce"
          priority
        />
        <h2 className="w-full text-[2rem] text-center">now Loading...</h2>
      </div>
    </div>
  );
}
