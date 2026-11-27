/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-assignment */
import type { IResponse } from '@/commons/types';
import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8080/',
});

const toErrorResponse = <T>(err: any): IResponse<T> => ({
    status: err.response?.status,
    success: false,
    message: err.response?.data?.message ?? 'Não foi possível conectar ao servidor',
    data: err.response?.data
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
        response = toErrorResponse<T>(err);
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
        response = toErrorResponse<T>(err);
    }
    return response;
} 

const put = async <T>(url: string, body: object): Promise<IResponse<T>> => {
    let response = {} as IResponse<T>;  
    try {
        const res = await http.put(url, body);
        response = {
            status: res.status,
            success: true,
            data: res.data
        }
    } catch (err: any) {
        response = toErrorResponse<T>(err);
    }
    return response;
} 

const del = async <T>(url: string): Promise<IResponse<T>> => {
    let response = {} as IResponse<T>;  
    try {
        const res = await http.delete(url);
        response = {
            status: res.status,
            success: true,
            data: res.data
        }
    } catch (err: any) {
        response = toErrorResponse<T>(err);
    }
    return response;
} 

const setToken = (token: string) => {
    if (token) {
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete http.defaults.headers.common['Authorization'];
    }
}

const api = {
    get,
    post,
    put,
    del,
    setToken
};

export default api;


