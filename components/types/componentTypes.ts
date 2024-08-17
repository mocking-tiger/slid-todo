import { ChangeEvent } from "react";

export type InputType = {
  span: string;
  placeholder: string;
  type?: string;
  isPassword?: boolean;
  // eslint-disable-next-line
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type ProgressDivType = {
  ratio: number;
  progressValue: number;
  setProgressValue: React.Dispatch<React.SetStateAction<number>>;
};
