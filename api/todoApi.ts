import { BASE_URL } from "./constants/url";
import { ErrorType } from "../types/apiTypes";
import instance from "./instance/default-instance";

export async function getTodo(goalID: number) {
  try {
    const response = await instance.get(
      `${BASE_URL}todos?goalId=${goalID}&size=20`
    );
    return response;
  } catch (e) {
    const error = e as ErrorType;
    console.log(error);
  }
}

export async function getTodoAll() {
  try {
    const response = await instance.get(`${BASE_URL}todos?size=40`);
    return response;
  } catch (e) {
    const error = e as ErrorType;
    console.log(error);
  }
}
