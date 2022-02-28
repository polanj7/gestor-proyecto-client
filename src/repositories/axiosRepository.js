import axios from "axios";
import { getAccessToken } from '../services/accessToken';

const token = getAccessToken();

const baeeURL = 'https://netzer.somee.com/api';
// const baeeURL = 'https://10.1.0.115/GPApi/api';

const authAxios = axios.create({
    baseURL: baeeURL,
    headers:{
        Authorization: `Bearer ${token}`
    }
});

export const get = async (endPoint) => {
    const resp = await authAxios.get(`${baeeURL}/${endPoint}`);    
    return resp.data.data;
}

export const post = async (endPoint, data) => {
    console.log('data', data);
    const resp = await authAxios.post(`${baeeURL}/${endPoint}`, data);
    return resp;
}

export const put = async (endPoint, data) => {
    console.log('data', data);
    const resp = await authAxios.put(`${baeeURL}/${endPoint}`, data);
    return resp;
}

export const remove = async (endPoint) => {
    const resp = await authAxios.delete(`${baeeURL}/${endPoint}`);
    return resp;
}

export const singin = async (endPoint, data) => {    

    const resp = await authAxios.post(`${baeeURL}/${endPoint}?usuario=${data.usuario}&clave=${data.clave}`);

    return resp.data;
}