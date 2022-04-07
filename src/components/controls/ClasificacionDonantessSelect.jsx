import React, {useContext} from 'react';

//mui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
//context
import { ProjectContext } from "../../context/ProjectContext";

export default function ClasificacionDonantesSelect({clasificacionDonantes}) {
  const { projectData, setProjectData } = useContext(ProjectContext);  
  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">
          Clasificación Donante
        </InputLabel>
        <Select   
          required   
          value={projectData.donante.idClasificacion}
          onChange={({ target }) =>
                setProjectData(
                  (prev) =>
                    (prev = {
                      ...prev,
                      donante: { ...prev.donante, idClasificacion: target.value },
                    })
                )
              }             
          label="Clasificación Donante"      
        >
          {clasificacionDonantes.length > 0 ? (
            clasificacionDonantes.map(({ idClasificacion, nombre }) => {
              return <MenuItem key={idClasificacion} value={idClasificacion}>{nombre}</MenuItem>;
            })
          ) : (
            <></>
          )}
        </Select>
      </FormControl>      
    </>
  );
}
  