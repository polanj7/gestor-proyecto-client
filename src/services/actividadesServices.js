import { get, post, remove } from '../repositories/axiosRepository';


export const getActividades = async () => {
    const resp = await get(`Actividades`);
    return resp;
 }

 
export const postActividades = async (data) => {
    const resp = await post(`Actividades`, data);
    return resp;
 }