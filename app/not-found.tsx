import Link from "next/link";
import Image from "next/image";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <Image src="/404.jpg" alt="404 Error" width={300} height={300} />
        <h1 className="text-[5rem] font-bold text-gray-800 mt-8">404</h1>
        <p className="text-[3rem] text-gray-600 mt-4">
          페이지를 찾을 수 없습니다.
        </p>
        <p className="text-[2rem] text-gray-500 mt-2">
          주소를 확인하시고 다시 시도해 주세요.
        </p>
        <Link href="/" passHref>
          <button className="mt-6 px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
            홈으로 돌아가기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
