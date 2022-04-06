import React from 'react';

//mui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


export default function RangoPresupuestadoSelect({rango, disabled, handleChangeRango}) {
    
  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">
          Rango Presupuestado
        </InputLabel>
        <Select
          disabled={disabled}
          // value={age}
          onChange={handleChangeRango}          
          label="Rango Presupuestado"
          
        >
          {rango.length > 0 ? (
            rango.map(({ idRango, nombre }) => {
              return <MenuItem key={idRango} value={idRango}>{nombre}</MenuItem>;
            })
          ) : (
            <></>
          )}
        </Select>
      </FormControl>      
    </>
  );
}
  