import React, {useContext} from 'react'
//context
import { ProjectContext } from '../../context/ProjectContext'

export default function ValidationForm() {
    const {projectData} = useContext(ProjectContext);  
  return (
    <>
      <p>Resumen</p>
      <p>Nombre del Proyecto: {projectData.nombre}</p>
      <p>Descripcion del Proyecto: {projectData.descripcion}</p>    

      <p>Listado de Tareas</p>
      <ul>
        {
          projectData.tareas.map(({nombre}, idx) => {
            return <li key={idx}>{nombre}</li>;
          })
        }
      </ul>

      <p>Listado de Documentos</p>
      <ul>
        {
          projectData.documentosProyectos.map(({name}, idx) => {
            return <li key={idx}>{name}</li>;
          })
        }
      </ul>

      
    </>
  );
}
