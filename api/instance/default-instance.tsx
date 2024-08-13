import { BASE_URL } from "../constants/url";
import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (err) => {
    console.log(err);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const token = async () => {
        const getNewToken = await instance.post(`${BASE_URL}auth/tokens`);
        Cookies.set("accessToken", getNewToken.data.accessToken, {
          expires: 1,
        });
        Cookies.set("refreshToken", getNewToken.data.refreshToken, {
          expires: 1,
        });

        error.config.headers = {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        };
        const response = await axios.request(error.config);
        console.log("instance에서 토큰 재발급");
        return response;
      };
      await token();
    }
  }
);

export default instance;
