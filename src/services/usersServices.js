import { get, post, put, remove } from '../repositories/axiosRepository';

export const getResponsables = async () => {
    const resp = await get(`Usuarios`);    
    return resp;
}
