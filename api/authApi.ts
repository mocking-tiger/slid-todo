import { BASE_URL } from "./constants/url";
import { ErrorType } from "../types/apiTypes";
import instance from "./instance/default-instance";
import Cookies from "js-cookie";

export async function signIn(
  email: string | undefined,
  password: string | undefined
) {
  try {
    const response = await instance.post(`${BASE_URL}auth/login`, {
      email,
      password,
    });
    if (response.status === 201) {
      Cookies.set("accessToken", response.data.accessToken, {
        expires: 1,
      });
      Cookies.set("refreshToken", response.data.refreshToken, {
        expires: 1,
      });

      return response.data;
    }
  } catch (e) {
    const error = e as ErrorType;
    alert(error.response.data.message);
  }
}

export async function getNewToken() {
  const response = await instance.post(`${BASE_URL}auth/tokens`);
  console.log(response);
  Cookies.set("accessToken", response.data.accessToken, {
    expires: 1,
  });
  Cookies.set("refreshToken", response.data.refreshToken, {
    expires: 1,
  });
}
