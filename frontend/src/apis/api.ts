import axios from 'axios'

const axiosClient = axios.create({
    baseURL: '127.0.0.1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {

        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;