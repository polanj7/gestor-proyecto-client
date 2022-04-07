import React, {useContext} from 'react';

//mui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
//context
import { ProjectContext } from "../../context/ProjectContext";

export default function ClasificacionAliadosSelect({clasificacionAliados}) {
  const { projectData, setProjectData } = useContext(ProjectContext);  

  return (
    <>
      <FormControl sx={{ width: "100%", marginBottom: "16px" }}>
        <InputLabel id="demo-simple-select-standard-label">
          Clasificación Aliado
        </InputLabel>
        <Select      
            value={projectData.aliado.idClasificacion}
            onChange={({ target }) =>
                  setProjectData(
                    (prev) =>
                      (prev = {
                        ...prev,
                        aliado: { ...prev.aliado, idClasificacion: target.value },
                      })
                  )
                }        
          label="Clasificación Aliado"
          
        >
          {clasificacionAliados.length > 0 ? (
            clasificacionAliados.map(({ idClasificacion, nombre }) => {
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
  