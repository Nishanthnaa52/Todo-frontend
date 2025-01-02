import axios from 'axios';

const API = axios.create({
    baseURL: 'https://nishanthdev22.pythonanywhere.com/api/', // Relative path
});

export default API;
