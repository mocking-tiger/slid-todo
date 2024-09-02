import { ChangeEvent, Dispatch, FocusEvent, SetStateAction } from "react";

export type InputType = {
  span: string;
  placeholder: string;
  type?: string;
  isPassword?: boolean;
  // eslint-disable-next-line
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};

export type ProgressDivType = {
  ratio: number;
  progressValue: number;
  setProgressValue: React.Dispatch<React.SetStateAction<number>>;
};

export type NewTodoType = {
  title: string;
  fileUrl?: string;
  linkUrl?: string;
  goalId: number;
};

export type GoalSectionType = {
  id: number;
};

export type TextEditorType = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  // eslint-disable-next-line
  openModal: (name: string) => void;
};
