import axios from 'axios';
const https = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 50000
});

https.interceptors.request.use(function (config) {
    const { store } = require('../store');
    const db = store.getState();
    const token = db.login.accessToken ? db.login.accessToken : db.token.accessToken;
    config.headers.Authorization =  'Bearer ' + token;
    return config;
});

export const currencyConversionHttps = axios.create({
    baseURL: 'https://api.apilayer.com/currency_data/convert',
    timeout: 10000
});

export default https;