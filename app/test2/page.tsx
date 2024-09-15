"use client";

import { useState, useRef } from "react";

export default function TextEditor() {
  const [text, setText] = useState(""); // 전체 텍스트
  const [highlightedText, setHighlightedText] = useState(""); // 하이라이트 된 텍스트
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleHighlight = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      const start = textarea.selectionStart; // 선택 시작 지점
      const end = textarea.selectionEnd; // 선택 끝 지점

      if (start === end) return; // 아무것도 선택하지 않은 경우

      // 선택한 텍스트 범위
      const selectedText = text.slice(start, end);
      const beforeText = text.slice(0, start);
      const afterText = text.slice(end);

      // 선택한 텍스트를 빨간색으로 변경하여 HTML에 적용
      setHighlightedText(
        `${beforeText}<span style="color: red;">${selectedText}</span>${afterText}`
      );
    }
  };

  return (
    <div>
      <div
        className="absolute"
        dangerouslySetInnerHTML={{ __html: highlightedText || text }}
      />
      <textarea
        className="text-transparent"
        ref={textareaRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setHighlightedText(""); // 텍스트가 변경되면 하이라이트 제거
        }}
      />
      <button onClick={handleHighlight}>Turn RED</button>
    </div>
  );
}
