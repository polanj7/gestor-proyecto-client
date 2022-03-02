import { get, post, put, remove } from '../repositories/axiosRepository';

export const getTaksByProject = async (idProject) => {
   const resp = await get(`Tareas?idProyecto=${idProject}`);   
   return resp;  
}

export const getTaksByID = async (idTarea) => {
   const resp = await get(`Tareas/${idTarea}`);   
   return resp;  
}

export const addTaks = async (data) =>{
   const resp = await post(`Tareas`, data);     
   return resp;  
}

export const updateTaks = async (id, data) =>{   
   const resp = await put(`Tareas/${id}`, data);    
   return resp;  
}

export const deleteTaks = async (idTarea) => {
   const resp = await remove(`Tareas/${idTarea}`);  
   return resp;  
}