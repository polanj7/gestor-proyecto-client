import { get } from '../repositories/axiosRepository';

export const getNivelAcceso = async () => {
    const resp = await get(`NivelAcceso`);    
    return resp;
}
