import React, {useContext} from 'react'
//context
import { ProjectContext } from '../../context/ProjectContext'

export default function ValidationForm() {
    const {projectData} = useContext(ProjectContext);  
  return (
    <>
        <p>Validacion de los Datos</p>
      <h1>{projectData.nombre}</h1>
    </>
  );
}
