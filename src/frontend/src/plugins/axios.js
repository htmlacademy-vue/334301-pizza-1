import axios from "axios";
import { Message } from "../common/const/common";

const axiosInstance = axios.create({
  baseURL: "/api/",
});

// добавляем централизованную обработку ошибок при получении ответа от сервера
axiosInstance.interceptors.response.use(
  (res) => res,
  (e) => {
    axiosInstance.$notifier.error(
      e?.response?.data?.error?.message || Message.SERVER_ERROR
    );
    console.error(e?.response?.data?.error);
    return Promise.reject(e);
  }
);

export default axiosInstance;
