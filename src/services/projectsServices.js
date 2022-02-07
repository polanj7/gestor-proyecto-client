import { get, post, put, remove } from '../repositories/axiosRepository';

export const getProjectByID = async (id) => {
    const resp = await get(`Proyectos/${id}`);    
    return resp;
}

export const getProjects= async () => {
   const resp = await get(`Proyectos`);     
   const dataTransform = await resp.map(({idProyecto, codigo, nombre, descripcion, fechaInicio, fechaFinal, tareas}) => {
      return {
        idProyecto,
        codigo,
        nombre,
        descripcion,
        fechaInicio,
        fechaFinal,
        cantidadTareas: tareas.length,
        cantidadTareasCompletadas: tareas.length,
      };
   });

   return dataTransform;  
}

export const addProject = async (data) => {
    const resp = await post(`Proyectos`, data);
    return resp;
}

export const updateProject = async (id, data) => {
   const resp = await put(`Proyectos/${id}`, data);
   return resp;
}

 export const deleteProject = async (id) => {
    const resp = await remove(`Proyectos/${id}`);
    return resp[0];
 }