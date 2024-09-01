"use client";

import { useState } from "react";

export default function NoteContent() {
  const [text, setText] = useState("");

  const handleSubmit = (text: string) => {
    console.log(text);
  };

  return (
    <div className="relative">
      <textarea
        value={text}
        placeholder="이 곳을 클릭해 노트 작성을 시작해주세요"
        className="w-full min-h-[600px] p-5 overflow-y-auto focus:outline-none border"
        onChange={(e) => setText(e.target.value)}
      />
      <div className="w-fit mx-auto p-5 relative bottom-40 flex gap-10 bg-gray-300 rounded-lg">
        <button>bold</button>
        <button>italic</button>
        <button>underline</button>
        <button>left</button>
        <button>center</button>
        <button>right</button>
        <button>color</button>
        <button>link</button>
      </div>
      <button onClick={() => handleSubmit(text)}>submit</button>
    </div>
  );
}
