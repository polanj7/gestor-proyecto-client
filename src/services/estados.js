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

export const getEstados= async () => {
   const estados = await authAxios.get(`${API_URL}/Estados`);
   return estados;
} 
