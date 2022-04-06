import { get, post, remove } from '../repositories/axiosRepository';


export const getDesafios = async () => {
    const resp = await get(`Desafios`);
    return resp;
 }