import { get, post, remove } from '../repositories/axiosRepository';


export const getDonantes = async () => {
    const resp = await get(`Donantes`);
    return resp;
 }

 export const getDonantesClasificacion = async () => {
   const resp = await get(`DonantesClasificaciones`);
   return resp;
}

 export const createDonantes = async (data) => {
    const resp = await post(`Donantes`, data);
    return resp;
 }