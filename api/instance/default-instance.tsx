import LoadingScreen from "@/components/Loading";
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
      let isLoading = true;
      const token = async () => {
        const refreshToken = Cookies.get("refreshToken");
        const getNewToken = await axios.post(`${BASE_URL}auth/tokens`, null, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        console.log("토큰 정보 재발급 성공");
        Cookies.set("accessToken", getNewToken.data.accessToken, {
          expires: 1,
        });
        Cookies.set("refreshToken", getNewToken.data.refreshToken, {
          expires: 1,
        });
      };
      await token();
      error.config.headers = {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      };
      const response = await axios.request(error.config);
      console.log("instance에서 토큰 재발급");
      isLoading = false;

      if (isLoading) {
        return <LoadingScreen />;
      }
      return response;
    }
    return Promise.reject(error);
  }
);

export default instance;
