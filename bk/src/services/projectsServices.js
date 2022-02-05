import { get, post, remove } from '../repositories/axiosRepository';


export const getProject = async (id) => {
    const resp = await get(`Proyectos?idProyecto=${id}`);
    return resp[0];
 }

export const getProjects= async () => {

   const resp = await get(`Proyectos`);  
   
   const dataTransform = await resp.map(({idProyecto, codigo, nombre, descripcion, fechaInicio, fechaFinal, tareas}) => {
      return {
        id: idProyecto,
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

 export const deleteProject = async (id) => {
    const resp = await remove(`Proyectos/${id}`);
    return resp[0];
 }