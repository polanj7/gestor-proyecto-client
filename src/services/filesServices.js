import { get, post } from '../repositories/axiosRepository';

export const getFiles= async (id) => {
   const data = await get(`Documentos/${id}`);
   return data;
} 

 export const postFiles= async (files) => {
    const data = await post(`Documentos`, files);
    return data;
 } 