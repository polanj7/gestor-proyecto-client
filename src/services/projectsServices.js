import { get, post, remove } from '../repositories/axiosRepository';


export const getProject = async (id) => {
    const resp = await get(`Proyectos?idProyecto=${id}`);
    return resp[0];
 }

export const getProjects= async () => {
   const resp = await get(`Proyectos`); 
   return resp;  
}

export const addProject = async (data) => {
    const resp = await post(`Proyectos`, data);
    return resp;
}

 export const deleteProject = async (id) => {
    const resp = await remove(`Proyectos/${id}`);
    return resp[0];
 }