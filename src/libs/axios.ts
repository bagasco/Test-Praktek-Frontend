import 'server-only';

import axios from "axios";

export const publicReq = axios.create({
    baseURL: process.env.API_URL
})

export const privateReq = (token: string) => axios.create({
    baseURL: process.env.API_URL,
    headers: {
        'Authorization': `Bearer ${token}`
    }
})