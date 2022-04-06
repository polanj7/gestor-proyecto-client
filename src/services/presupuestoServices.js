import { get, post, remove } from '../repositories/axiosRepository';


export const getRangoPresupuesto = async () => {
    const resp = await get(`RangoBeneficiarios`);
    return resp;
 }


 export const getRangoPresupuestoByID = async (id) => {
    const resp = await get(`RangoBeneficiarios/${id}`);
    return resp;
 }