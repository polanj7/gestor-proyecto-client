import { get, post, put, remove } from '../repositories/axiosRepository';

export const getProjectByID = async (id) => {
    const resp = await get(`Proyectos/${id}`);   
    return resp;
}

export const getProjects= async () => {
   const resp = await get(`Proyectos`);   
   const dataTransform = await resp.map(({idProyecto, codigo, nombre, descripcion, fechaInicio, fechaFinal, isDelete, idGerente}) => {
      return {
        idProyecto,
        id: idProyecto,
        codigo,
        nombre,
        descripcion,
        fechaInicio,
        fechaFinal,
        cantidadTareas: 0,
        cantidadTareasCompletadas: 0,
        isDelete,
        idGerente
      };
   });

   console.log(dataTransform)
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