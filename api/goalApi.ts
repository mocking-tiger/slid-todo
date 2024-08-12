import { BASE_URL } from "./constants/url";
import { ErrorType } from "../types/apiTypes";
import instance from "./instance/default-instance";

export async function getGoals() {
  try {
    const response = await instance.get(`${BASE_URL}goals?size=999`);
    return response.data.goals;
  } catch (e) {
    const error = e as ErrorType;
    console.log(error);
  }
}

export async function addGoal(title: string) {
  try {
    const response = await instance.post(`${BASE_URL}goals`, {
      title,
    });
    console.log(response);
  } catch (e) {
    const error = e as ErrorType;
    console.log(error);
  }
}
