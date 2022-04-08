import { get, post, put, remove } from '../repositories/axiosRepository';

export const getResponsables = async () => {
    const resp = await get(`Usuarios`);    
    return resp;
}


export const getUsuarios = async () => {
    const resp = await get(`Usuarios`);    
    return resp;
}

export const getUsuario = async (id) => {
    const resp = await get(`Usuarios/${id}`);    
    return resp;
}


export const addUsuario = async (data) => {
    const resp = await post(`Usuarios`, data);    
    return resp;
}

export const editUsuario = async (data) => {
    const resp = await put(`Usuarios/${data.idUsuario}`, data);    
    return resp;
}



export const forgotPass = async (usuario) => {
    const resp = await put(`Login`);    
    return resp;
}
