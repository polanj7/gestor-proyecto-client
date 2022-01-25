import axios from "axios";
import { getAccessToken, urlApi } from './accessToken';

const API_URL = urlApi;
const token = getAccessToken();

const authAxios = axios.create({
    baseURL: API_URL,
    headers:{
        Authorization: `Bearer ${token}`
    }
});

export const getProjects= async () => {
   const project = await authAxios.get(`${API_URL}/Proyectos`);
   return project.data.data;  
}

export const addProject = async (data) => {
    const project = await authAxios.post(`${API_URL}/Proyectos`,  data);
    return project;
}

export const getProject = async (id) => {
    const project = await authAxios.get(`${API_URL}/Proyectos?idProyecto=${id}`);    

    return project.data.data[0];
 }