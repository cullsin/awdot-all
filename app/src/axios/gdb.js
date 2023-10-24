import axios from 'axios';
console.log(process.env.REACT_APP_GDB_API);
const ghttps = axios.create({
    baseURL: process.env.REACT_APP_GDB_API,
    timeout: 50000
});

ghttps.interceptors.request.use(function (config) {
    const { store } = require('../store');
    const db = store.getState();
    const token = db.login.accessToken ? db.login.accessToken : db.token.accessToken;
    config.headers.Authorization =  'Bearer ' + token;
    return config;
});

export default ghttps;