import { BASE_URL } from "./constants/url";
import { ErrorType } from "./types/apiTypes";
import instance from "./instance/default-instance";

export async function signUp(
  name: string | undefined,
  email: string | undefined,
  password: string | undefined
) {
  try {
    const response = await instance.post(`${BASE_URL}user`, {
      email,
      name,
      password,
    });
    if (response.status === 201) {
      return response.data;
    }
  } catch (e) {
    const error = e as ErrorType;
    alert(error.response.data.message);
  }
}
