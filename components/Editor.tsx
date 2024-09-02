"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ContentState,
  DraftBlockType,
  DraftHandleValue,
  DraftInlineStyleType,
  EditorState,
  RichUtils,
} from "draft-js";
import { toggleTextAlign, blockStyleFn } from "contenido";
import dynamic from "next/dynamic";
import Image from "next/image";
import "contenido/dist/styles.css";

const DynamicEditor = dynamic(
  () => import("contenido").then((mod) => mod.Editor),
  { ssr: false }
);

const TextEditor = ({
  text,
  setText,
  openModal,
}: {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  openModal: (name: string) => void;
}) => {
  const [editorState, setEditorState] = useState(() =>
    text
      ? EditorState.createWithContent(ContentState.createFromText(text))
      : EditorState.createEmpty()
  );
  const selectionState = editorState.getSelection();

  const handleKeyCommand = (command: string): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (inlineStyle: DraftInlineStyleType) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleBlockType = (blockType: DraftBlockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    setText(contentState.getPlainText());
  }, [editorState, setText]);

  return (
    <div className="relative">
      <div
        className="w-full h-[500px] px-5 overflow-y-auto focus:outline-none editor-content"
        onClick={() =>
          setEditorState(
            EditorState.forceSelection(editorState, selectionState)
          )
        }
        onChange={() => console.log("gd")}
      >
        <DynamicEditor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
          placeholder="이 곳을 클릭해 노트 작성을 시작해주세요"
          blockStyleFn={blockStyleFn}
        />
      </div>
      <div className="w-full mx-auto px-[16px] py-[10px] flex justify-between bg-white border rounded-[21.5px]">
        <div className="flex gap-[16px]">
          <div className="flex gap-[4px]">
            <Image
              className="cursor-pointer"
              src="/button-bold.png"
              width={24}
              height={24}
              alt="bold-icon"
              onMouseDown={(e) => {
                e.preventDefault();
                toggleInlineStyle("BOLD");
              }}
            />
            <Image
              className="cursor-pointer"
              src="/button-italic.png"
              width={24}
              height={24}
              alt="italic-icon"
              onMouseDown={(e) => {
                e.preventDefault();
                toggleInlineStyle("ITALIC");
              }}
            />
            <Image
              className="cursor-pointer"
              src="/button-underline.png"
              width={24}
              height={24}
              alt="underline-icon"
              onMouseDown={(e) => {
                e.preventDefault();
                toggleInlineStyle("UNDERLINE");
              }}
            />
          </div>
          <div className="flex gap-[4px]">
            <Image
              className="cursor-pointer"
              src="/button-left.png"
              width={24}
              height={24}
              alt="left-icon"
              onMouseDown={(e) => {
                e.preventDefault();
                toggleTextAlign(editorState, setEditorState, "text-align-left");
              }}
            />
            <Image
              className="cursor-pointer"
              src="/button-center.png"
              width={24}
              height={24}
              alt="center-icon"
              onMouseDown={(e) => {
                e.preventDefault();
                toggleTextAlign(
                  editorState,
                  setEditorState,
                  "text-align-center"
                );
              }}
            />
            <Image
              className="cursor-pointer"
              src="/button-right.png"
              width={24}
              height={24}
              alt="right-icon"
              onMouseDown={(e) => {
                e.preventDefault();
                toggleTextAlign(
                  editorState,
                  setEditorState,
                  "text-align-right"
                );
              }}
            />
          </div>
          <div className="flex gap-[4px]">
            <Image
              className="cursor-pointer"
              src="/button-unorder.png"
              width={24}
              height={24}
              alt="unorder-icon"
              onMouseDown={(e) => {
                e.preventDefault();
                toggleBlockType("unordered-list-item");
              }}
            />
            <Image
              className="cursor-pointer"
              src="/button-order.png"
              width={24}
              height={24}
              alt="order-icon"
              onMouseDown={(e) => {
                e.preventDefault();
                toggleBlockType("ordered-list-item");
              }}
            />
            <Image
              className="cursor-pointer"
              src="/button-color.svg"
              width={24}
              height={24}
              alt="color-icon"
              onMouseDown={(e) => {
                e.preventDefault();
              }}
            />
          </div>
        </div>
        <Image
          className="cursor-pointer"
          src="/button-link.png"
          width={24}
          height={24}
          alt="link-icon"
          onMouseDown={(e) => {
            e.preventDefault();
            openModal("upload-link");
          }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
