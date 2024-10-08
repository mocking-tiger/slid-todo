import { BASE_URL } from "./constants/url";
import { ErrorType } from "../types/apiTypes";
import instance from "./instance/default-instance";
import { toast } from "react-toastify";

export async function getNote(id: number) {
  try {
    const response = await instance.get(`${BASE_URL}notes/${id}`);
    return response;
  } catch (e) {
    const error = e as ErrorType;
    toast.error(error.response.data.message);
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
      payload.linkUrl = linkUrl;
    }

    const response = await instance.post(`${BASE_URL}notes`, payload);
    return response;
  } catch (e) {
    const error = e as ErrorType;
    toast.error(error.response.data.message);
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
      payload.linkUrl = linkUrl;
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
    toast.error(error.response.data.message);
  }
}

export async function getAllNotes(goalId: number) {
  try {
    const response = await instance.get(
      `${BASE_URL}notes?goalId=${goalId}&size=9999`
    );
    return response;
  } catch (e) {
    const error = e as ErrorType;
    console.log(error);
    toast.error(error.response.data.message);
  }
}

export default async function deleteNote(noteId: number) {
  try {
    const response = await instance.delete(`${BASE_URL}notes/${noteId}`);
    return response;
  } catch (e) {
    const error = e as ErrorType;
    console.log(error);
    toast.error(error.response.data.message);
  }
}
