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
