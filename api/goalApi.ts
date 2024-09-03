import { BASE_URL } from "./constants/url";
import { ErrorType } from "../types/apiTypes";
import instance from "./instance/default-instance";

export async function getGoals(size: number = 999, cursor?: number) {
  try {
    const response = await instance.get(
      `${BASE_URL}goals?${cursor ? `cursor=${cursor}&` : ""}size=${size}`
    );
    return response;
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

export async function getGoalDetail(goalID: number) {
  try {
    const response = await instance.get(`${BASE_URL}goals/${goalID}`);
    return response;
  } catch (e) {
    const error = e as ErrorType;
    console.log(error);
    if (error.response.data.message === "목표를 찾을 수 없습니다.") {
      window.location.href = "/not-found";
    }
  }
}

export async function editGoal(goalID: number, title: string) {
  try {
    const payload = {
      title,
    };
    const response = await instance.patch(
      `${BASE_URL}goals/${goalID}`,
      payload
    );
    return response;
  } catch (e) {
    const error = e as ErrorType;
    console.log(error);
  }
}

export async function deleteGoal(goalID: number) {
  try {
    const response = await instance.delete(`${BASE_URL}goals/${goalID}`);
    return response;
  } catch (e) {
    const error = e as ErrorType;
    console.log(error);
  }
}
