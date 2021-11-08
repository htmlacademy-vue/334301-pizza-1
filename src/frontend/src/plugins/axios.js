import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/",
});

const onSuccess = (response) => response;
const onFail = (err) => {
  throw err;
};

axiosInstance.interceptors.response.use(onSuccess, onFail);

export default axiosInstance;
