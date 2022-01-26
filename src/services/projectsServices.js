import { get, post, remove } from '../repositories/axiosConnetion';


export const getProject = async (id) => {
    const project = await get(`Proyectos?idProyecto=${id}`);
    return project[0];
 }

export const getProjects= async () => {
   const project = await get(`Proyectos`); 
   return project;  
}

export const addProject = async (data) => {
    const project = await post(`Proyectos`, data);
    return project;
}

 export const deleteProject = async (id) => {
    const project = await remove(`Proyectos/${id}`);

    return project.data.data[0];
 }