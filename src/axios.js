import axios from "axios";
import { controlOnrefresh } from "./userStore";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
    async (config) => {

        const user = localStorage.getItem("user");

        if (user) {

            const token = await controlOnrefresh();

            if (token) {
                config.headers.Authorization = `Bearer ` + token;
            }
        }

        return config;
    },

    (error) => {

        if (error.response?.status === 401) {
            localStorage.clear();
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;