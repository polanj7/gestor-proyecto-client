import { get, post, remove } from '../repositories/axiosRepository';


export const getRangoPresupuesto = async () => {
    const resp = await get(`RangoPresupuestario`);
    return resp;
 }


 export const getRangoPresupuestoByID = async (id) => {
    const resp = await get(`RangoPresupuestario/${id}`);
    return resp;
 }