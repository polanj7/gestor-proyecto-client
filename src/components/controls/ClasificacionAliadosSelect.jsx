import React from 'react';

//mui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export default function ClasificacionAliadosSelect({clasificacionAliados,  handleChangeClasificacionAliados}) {
    
  return (
    <>
      <FormControl sx={{ width: "100%", marginBottom: "16px" }}>
        <InputLabel id="demo-simple-select-standard-label">
          Clasificación Aliado
        </InputLabel>
        <Select      
          onChange={handleChangeClasificacionAliados}          
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
  