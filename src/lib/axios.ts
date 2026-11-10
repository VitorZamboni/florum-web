/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-assignment */
import type { IResponse } from '@/commons/types';
import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8080/',
});

const get = async <T>(url: string, params?: unknown): Promise<IResponse<T>> => {
    let response = {} as IResponse<T>;  
    try {
        const res = await http.get(url, {params});
        response = {
            status: res.status,
            success: true,
            data: res.data
        }
    } catch (err: any) {
        response = {
            status: err.response.status,
            success: true,
            message: err.response.data.message,
            data: err.response.data
        }
    }
    return response;
} 

const post = async <T>(url: string, body: object): Promise<IResponse<T>> => {
    let response = {} as IResponse<T>;  
    try {
        const res = await http.post(url, body);
        response = {
            status: res.status,
            success: true,
            data: res.data
        }
    } catch (err: any) {
        response = {
            status: err.response.status,
            success: true,
            message: err.response.data.message,
            data: err.response.data
        }
    }
    return response;
} 

const setToken = (token: string) => [
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`
]

const api = {
    get,
    post,
    setToken
};

export default api;


