import { ChangeEvent, FocusEvent } from "react";

export type InputType = {
  span: string;
  placeholder: string;
  type?: string;
  isPassword?: boolean;
  // eslint-disable-next-line
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
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
