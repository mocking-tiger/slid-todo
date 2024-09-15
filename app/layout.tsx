import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "@/components/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slid-todo",
  description:
    "유저가 다양한 콘텐츠(아티클, 강의 영상, 줌 미팅 일정, 강의 PDF 등)를 할일 목록으로 관리하고, 학습 진도나 프로젝트 진행 상황을 대시보드로 보여주며 각 할일에 대한 노트를 작성해 관리하는 서비스",
  openGraph: {
    images: [
      {
        url: "/thumbnail.png",
        alt: "슬리드투두 오픈그래프 이미지",
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "/thumbnail.png",
        alt: "슬리드투두 오픈그래프 이미지",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
