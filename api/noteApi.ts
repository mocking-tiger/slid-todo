import { BASE_URL } from "./constants/url";
import { ErrorType } from "../types/apiTypes";
import instance from "./instance/default-instance";

export async function getNote(id: number) {
  try {
    const response = await instance.get(`${BASE_URL}notes/${id}`);
    return response;
  } catch (e) {
    const error = e as ErrorType;
    console.log(error);
  }
}

export async function addNote(
  todoId: number,
  title: string,
  content: string,
  linkUrl?: string | null
) {
  try {
    const payload: {
      todoId: number;
      title: string;
      content: string;
      linkUrl?: string | null;
    } = {
      todoId,
      title,
      content,
    };

    if (linkUrl) {
      payload.linkUrl;
    }

    const response = await instance.post(`${BASE_URL}notes`, payload);
    return response;
  } catch (e) {
    const error = e as ErrorType;
    console.log(error);
    alert(error.response.data.message);
  }
}

export async function editNote(
  noteId: number,
  title: string,
  content: string,
  linkUrl?: string | null
) {
  try {
    const payload: {
      noteId: number;
      title: string;
      content: string;
      linkUrl?: string | null;
    } = {
      noteId,
      title,
      content,
    };

    if (linkUrl) {
      payload.linkUrl;
    } else if (linkUrl === null) {
      payload.linkUrl = null;
    }

    const response = await instance.patch(
      `${BASE_URL}notes/${noteId}`,
      payload
    );
    return response;
  } catch (e) {
    const error = e as ErrorType;
    console.log(error);
    alert(error.response.data.message);
  }
}
