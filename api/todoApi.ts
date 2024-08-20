import { BASE_URL } from "./constants/url";
import { ErrorType } from "../types/apiTypes";
import instance from "./instance/default-instance";

export async function getTodo(goalID: number, done?: boolean, size?: number) {
  try {
    const response = await instance.get(
      `${BASE_URL}todos?goalId=${goalID}&${
        done ? `done=${done}&` : done === false ? "done=false&" : ""
      }${size ? `size=${size}` : "size=20"}`
    );
    return response;
  } catch (e) {
    const error = e as ErrorType;
    console.log(error);
  }
}

export async function getTodoAll() {
  try {
    const response = await instance.get(`${BASE_URL}todos?size=9999`);
    return response;
  } catch (e) {
    const error = e as ErrorType;
    console.log(error);
  }
}

export async function addTodo(
  title: string,
  goalId: number,
  fileUrl?: string,
  linkUrl?: string
) {
  try {
    const payload: {
      title: string;
      goalId: number;
      fileUrl?: string;
      linkUrl?: string;
    } = {
      title,
      goalId,
    };

    if (fileUrl) {
      payload.fileUrl = fileUrl;
    }

    if (linkUrl) {
      payload.linkUrl = linkUrl;
    }
    const response = await instance.post(`${BASE_URL}todos`, payload);
    return response.data;
  } catch (e) {
    const error = e as ErrorType;
    alert(error.response.data.message);
  }
}
