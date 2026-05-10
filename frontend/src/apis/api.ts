import axios from 'axios'
import { useUserInfoStore } from '../store/useUserStore';
import { jwtDecode } from 'jwt-decode'


const axiosClient = axios.create({
    baseURL: 'http://localhost:5189',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});



axiosClient.interceptors.request.use(
    (config) => {
        const token = useUserInfoStore.getState().info?.token;


        if (token) {

            const decodedToken = jwtDecode(token)

            const currentTime = Date.now() / 1000

            if (decodedToken.exp && decodedToken.exp < currentTime) {

                useUserInfoStore.setState({ info: null });
                window.location.href = "/login";
                console.log('token expired')

                return Promise.reject("Token expired");
            }


            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {

        console.error('API Error:', error.response?.data || error.message);

        if (error.response?.status == 401) {
            useUserInfoStore.setState({ info: null })
            console.log('error 401')
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);



export default axiosClient;