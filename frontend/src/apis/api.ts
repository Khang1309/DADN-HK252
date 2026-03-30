import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:5189',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjN2FlZmRkOS1mNmY4LTQ4MzMtYWYxYy1mMzc4ZDFhNTU3N2MiLCJlbWFpbCI6ImtoYW5nMTMwOUBoY211dC5lZHUudm4iLCJGdWxsTmFtZSI6ImtoYW5nIiwianRpIjoiNTJmYjQ3M2UtNjczNy00OGMwLWIwMzctYzYyZTU3OTZiOGFlIiwiZXhwIjoxNzc0OTIzNzYyLCJpc3MiOiJTbWFydEhvbWVBUEkiLCJhdWQiOiJTbWFydEhvbWVVc2VycyJ9.YCGKoux3bfP7Vhgf5cBWu_TcE2voplWC9an9j208n14',
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