import React, {useContext} from 'react'
import Moment from 'react-moment';
import Chip from '@mui/material/Chip';
//context
import { ProjectContext } from '../../context/ProjectContext'

export default function ValidationForm() {
    const {projectData} = useContext(ProjectContext);  
  return (
    <>
      <p>Resumen</p>
      <p>Nombre del Proyecto: {projectData.nombre}</p>
      <p>Descripcion del Proyecto: {projectData.descripcion}</p>    
    
      <p>Listado de Documentos</p>
      {/* <ul>
        {
          projectData.documentosProyectos.map(({idDocumento, nombreArchivo}, idx) => {
            return <li key={idx}>{idDocumento < 1 && <Chip label="nuevo" color="primary" />} {nombreArchivo}</li>;
          })
        }
      </ul> */}

      
    </>
  );
}
