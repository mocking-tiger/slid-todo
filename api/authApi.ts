import { BASE_URL } from "./constants/url";
import instance from "./instance/default-instance";
import Cookies from "js-cookie";

export const signIn = async (
  email: string | undefined,
  password: string | undefined
) => {
  try {
    const response = await instance.post(`${BASE_URL}auth/login`, {
      email,
      password,
    });
    if (response.status === 201) {
      //Cookies.set('accessToken',)
      return response.data;
    }
  } catch (e) {}
};
