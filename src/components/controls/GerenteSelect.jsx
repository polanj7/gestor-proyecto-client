import React, { useContext, useEffect, useState } from 'react';
//mui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

//context
import { ProjectContext } from '../../context/ProjectContext'

export default function GerenteSelect({responsables, disabled}) { 
    const {projectData, setProjectData} = useContext(ProjectContext);

  const handleChange = async(event) => {
    console.log('event', event)
    const { target } = event;    
    
    setProjectData(
        (prev) =>
          (prev = {
            ...prev, idGerente: target.value ,
          })
      )          
  }; 

  return (
    <>
      <FormControl sx={{ width: "49%" }}>
        <InputLabel>
          Gerente Proyecto
        </InputLabel>
        <Select
          disabled={disabled}
          value={projectData.idGerente}
          onChange={handleChange}
          label="Gerente Proyecto"
          sx={{
            marginBottom: "16px",
          }}
        >
          {responsables.length > 0 ? (
            responsables.map(({ idUsuario, nombre, apellido }) => {
              return (
                <MenuItem key={idUsuario} value={idUsuario}>
                  {`${nombre} ${apellido}`}
                </MenuItem>
              );
            })
          ) : (
            <></>
          )}
        </Select>
      </FormControl>
    </>
  );
}
