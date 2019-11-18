import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://localhost:3333',
    baseURL: 'http://172.16.0.218:3333',
    //baseURL: 'http://192.168.15.21:3333',
});

export default api;
