"use client";

import { useState } from "react";
import { EditorState } from "draft-js";
import {
  toggleTextAlign,
  blockStyleFn,
  isTextRightAligned,
  isTextCenterAligned,
  isTextLeftAligned,
  isTextJustifyAligned,
} from "contenido";
import dynamic from "next/dynamic";
import "contenido/dist/styles.css";

// Types
import type { FC } from "react";

const DynamicEditor = dynamic(
  () => import("contenido").then((mod) => mod.Editor),
  { ssr: false }
);

// Custom Types
export interface TextAlignmentEditorProps {}

const buttons = [
  { title: "left", checker: isTextLeftAligned },
  { title: "center", checker: isTextCenterAligned },
  { title: "right", checker: isTextRightAligned },
  { title: "justify", checker: isTextJustifyAligned },
];

const TextAlignmentEditor: FC<TextAlignmentEditorProps> = () => {
  // States
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div>
      <div>
        {buttons.map((button) => (
          <button
            key={button.title}
            style={{
              minWidth: "2rem",
              padding: "0.5rem",
              backgroundColor: button.checker(editorState)
                ? "#4cb5f5"
                : "rgba(125, 125, 125, 0.25)",
              color: button.checker(editorState) ? "#fff" : "inherit",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleTextAlign(
                editorState,
                setEditorState,
                `text-align-${button.title}`
              );
            }}
          >
            {button.title}
          </button>
        ))}
      </div>
      <div
        style={{
          border: "1px solid #252525",
          borderRadius: "0.5rem",
          padding: "0.5rem 1rem",
        }}
      >
        <DynamicEditor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Write here..."
          blockStyleFn={blockStyleFn}
        />
      </div>
    </div>
  );
};

export default TextAlignmentEditor;
