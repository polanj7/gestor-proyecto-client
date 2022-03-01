import React, {useContext} from 'react'
import Moment from 'react-moment';
//context
import { ProjectContext } from '../../context/ProjectContext'

export default function ValidationForm() {
    const {projectData} = useContext(ProjectContext);  
  return (
    <>
      <p>Resumen</p>
      <p>Nombre del Proyecto: {projectData.nombre}</p>
      <p>Descripcion del Proyecto: {projectData.descripcion}</p>    
      <p>Tiempo: desde {<Moment format="DD/MM/YYYY">{projectData.fechaInicio}</Moment>} hasta {<Moment format="DD/MM/YYYY">{projectData.fechaFinal}</Moment>}</p>    

      <p>Monto Presupuestado: $ {projectData.rangoPresupuestado}</p>

      <p>Listado de Tareas</p>
      <ul>
        {
          projectData.tareas.map(({idTarea, descripcion}, idx) => {
            return <li key={idx}> {idTarea < 1 && "(NEW)"} {idx + 1} - {descripcion}</li>;
          })
        }
      </ul>

      <p>Listado de Documentos</p>
      <ul>
        {
          projectData.documentosProyectos.map(({idDocumento, nombreArchivo}, idx) => {
            return <li key={idx}>{idDocumento < 1 && "(NEW)"} {nombreArchivo}</li>;
          })
        }
      </ul>

      
    </>
  );
}
