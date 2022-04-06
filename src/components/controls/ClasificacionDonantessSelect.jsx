import React from 'react';

//mui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export default function ClasificacionDonantesSelect({clasificacionDonantes,  handleChangeClasificacionDonantes}) {
    
  return (
    <>
      <FormControl variant="standard" sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">
        Clasificación Donante
        </InputLabel>
        <Select      
          onChange={handleChangeClasificacionDonantes}          
          label="Clasificación Donante"
          variant="standard"
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
  