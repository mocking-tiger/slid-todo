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
        Cookies.set("accessToken", getNewToken.data.accessToken);
        Cookies.set("refreshToken", getNewToken.data.refreshToken);

        error.config.headers = {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        };
        const response = await axios.request(error.config);
        return response;
      };
      token();
    }
  }
);

export default instance;
