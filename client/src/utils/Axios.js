import axios from 'axios';
import { getAccessToken } from '../utils/localstorage';

const Axios = axios.create({
    baseURL: 'http://localhost:3000'
})

Axios.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

/*
Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return refreshToken(getRefreshToken()).then((res) => {
                if (res.status === 200) {
                    setTokens(res.data.data)
                    Axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`;
                    return Axios(originalRequest);
                }
            });
        }
        return Promise.reject(error);
    }
);
*/


export default Axios;