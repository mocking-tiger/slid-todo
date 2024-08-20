"use client";

import { useCallback, useState } from "react";
import { ReactNode } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";

interface ModalProps {
  name: string;
  children: ReactNode;
  title: string;
}

export const useModal = () => {
  const [modalName, setModalName] = useState("");

  const openModal = (name: string) => {
    setModalName(name);
  };

  const closeModal = () => {
    setModalName("");
  };

  const Modal = useCallback(
    ({ name, children, title }: ModalProps) => {
      if (typeof document === "undefined") return null;

      return ReactDOM.createPortal(
        name === modalName ? (
          <div
            className="w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.6)] z-20 flex justify-center items-center"
            onClick={closeModal}
          >
            <div
              className="w-[520px] h-auto p-[24px] bg-white rounded-[12px] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                className="cursor-pointer absolute right-[24px]"
                src="/modal-close.svg"
                width={0}
                height={0}
                style={{ width: 24, height: "auto" }}
                alt="모달닫기버튼"
                onClick={closeModal}
              />
              <h1 className="mb-[24px] text-[1.8rem] font-semibold">{title}</h1>
              {children}
            </div>
          </div>
        ) : null,
        document.body
      );
    },
    [modalName]
  );

  return { Modal, openModal, closeModal };
};
