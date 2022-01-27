import axios from "axios";
import { getAccessToken } from '../services/accessToken';

const token = getAccessToken();

const urlApi = 'https://gestorproyectosapi20220125225929.azurewebsites.net/api';

const authAxios = axios.create({
    baseURL: urlApi,
    headers:{
        Authorization: `Bearer ${token}`
    }
});

export const get = async (endPoint) => {
    const resp = await authAxios.get(`${urlApi}/${endPoint}`);    
    return resp.data.data;
}

export const post = async (endPoint, data) => {
    const resp = await authAxios.post(`${urlApi}/${endPoint}`, data);
    return resp;
}

export const remove = async (endPoint) => {
    const resp = await authAxios.delete(`${urlApi}/${endPoint}`);
    return resp;
}


export const singin = async (endPoint, data) => {
    const resp = await axios.post(`${urlApi}/${endPoint}`, data);
    return resp.data;
}