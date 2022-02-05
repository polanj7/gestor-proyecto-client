import { get, post, remove } from '../repositories/axiosRepository';


export const getTaksByProject = async (idProject) => {
   const resp = await get(`Tareas`);
   
   const dataTransform = await resp.map(({idTarea, descripcion, fechaInicio, fechaFinal}) => {
      return {
        id: idTarea,        
        descripcion,
        fechaInicio,
        fechaFinal       
      };
   });

   console.log(dataTransform)
   return dataTransform;  
}