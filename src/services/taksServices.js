import { get, post, put, remove } from '../repositories/axiosRepository';

export const getTaksByProject = async (idProject) => {
   const resp = await get(`Tareas?idProyecto=${idProject}`);
   
   const dataTransform = await resp.map(({idTarea, descripcion, fechaInicio, fechaFinal}) => {
      return {
        idTarea,        
        descripcion,
        fechaInicio,
        fechaFinal       
      };
   });
   return dataTransform;  
}

export const getTaksByID = async (idTarea) => {
   const resp = await get(`Tareas/${idTarea}`);  
   return resp;  
}

export const addTaks = async (data) =>{
   console.log('add', data);
   const resp = await post(`Tareas`, data);     
   return resp;  
}

export const updateTaks = async (id, data) =>{
   console.log('update', id, data);
   const resp = await put(`Tareas/id?=${id}`, data);    
   return resp;  
}

export const deleteTaks = async (idTarea) => {
   const resp = await remove(`Tareas/${idTarea}`);  
   return resp;  
}