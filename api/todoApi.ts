import { BASE_URL } from "./constants/url";
import { ErrorType } from "../types/apiTypes";
import instance from "./instance/default-instance";
import { toast } from "react-toastify";

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
    toast.error(error.response.data.message);
  }
}

export async function patchTodo(
  title: string,
  goalId: number,
  fileUrl: string,
  linkUrl: string,
  done: boolean,
  todoId: number
) {
  try {
    const response = await instance.patch(`${BASE_URL}todos/${todoId}`, {
      title,
      fileUrl,
      linkUrl,
      goalId,
      done,
      todoId,
    });
    // console.log(response);
    return response;
  } catch (e) {
    const error = e as ErrorType;
    toast.error(error.response.data.message);
  }
}

export async function deleteTodo(todoId: number) {
  try {
    const response = await instance.delete(`${BASE_URL}todos/${todoId}`);
    console.log(response);
    return response;
  } catch (e) {
    const error = e as ErrorType;
    toast.error(error.response.data.message);
  }
}

export async function editTodo(
  title: string,
  goalId: number,
  todoId: number,
  fileUrl?: string | null,
  linkUrl?: string | null
) {
  try {
    const payload: {
      title: string;
      goalId: number;
      fileUrl?: string | null;
      linkUrl?: string | null;
    } = {
      title,
      goalId,
    };

    if (fileUrl) {
      payload.fileUrl = fileUrl;
    } else if (fileUrl === null) {
      payload.fileUrl = null;
    }

    if (linkUrl) {
      payload.linkUrl = linkUrl;
    } else if (linkUrl === null) {
      payload.linkUrl = null;
    }

    const response = await instance.patch(
      `${BASE_URL}todos/${todoId}`,
      payload
    );
    return response.data;
  } catch (e) {
    const error = e as ErrorType;
    toast.error(error.response.data.message);
  }
}
