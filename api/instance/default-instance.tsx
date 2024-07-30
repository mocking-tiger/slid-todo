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

export default instance;
