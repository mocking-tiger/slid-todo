import { BASE_URL } from "./constants/url";
import { ErrorType } from "../types/apiTypes";
import instance from "./instance/default-instance";

export async function uploadFile(file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await instance.post(`${BASE_URL}files`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (e) {
    const error = e as ErrorType;
    alert(error.response.data.message);
  }
}
