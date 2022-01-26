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

// export const put = async (endPoint) => {
//     const data = await authAxios.get(`${urlApi}/${endPoint}`);
//     return data;
// }


/*
export const getProject = async (id) => {
    const project = await authAxios.get(`${API_URL}/Proyectos?idProyecto=${id}`);    

    return project.data.data[0];
 }

*/
