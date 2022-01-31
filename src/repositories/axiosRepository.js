import axios from "axios";
import { getAccessToken } from '../services/accessToken';

const token = getAccessToken();

const baeeURL = 'https://gestorproyectosapi20220125225929.azurewebsites.net/api';

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
    const resp = await authAxios.post(`${baeeURL}/${endPoint}`, data);
    return resp;
}

export const remove = async (endPoint) => {
    const resp = await authAxios.delete(`${baeeURL}/${endPoint}`);
    return resp;
}

export const singin = async (endPoint, data) => {
    const resp = await authAxios.post(`${baeeURL}/${endPoint}?usuario=${data.usuario}&clave=${data.clave}`);
    
    console.log(resp)
    return resp.data;
}