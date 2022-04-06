import { get, post, remove } from '../repositories/axiosRepository';


export const getAliados = async () => {
    const resp = await get(`Aliado`);
    return resp;
 }

 export const getAliadosClasificacion = async () => {
   const resp = await get(`AliadoClasificaciones`);
   console.log('services', resp)
   return resp;
}

 export const createAliados = async (data) => {
    const resp = await post(`Aliado`, data);
    return resp;
 }