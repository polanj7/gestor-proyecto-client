import React from 'react';

//mui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


export default function AliadosSelect({aliados, disabled, handleChangeAliados}) {

    
  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">
          Aliado
        </InputLabel>
        <Select
          disabled={disabled}
          // value={age}
          onChange={handleChangeAliados}          
          label="Aliado" 
          sx={{           
            marginBottom: "16px"           
          }}         
        >
          {aliados.length > 0 ? (
            aliados.map(({ idAliado, nombre }) => {
              return <MenuItem key={idAliado} value={idAliado}>{nombre}</MenuItem>;
            })
          ) : (
            <></>
          )}
        </Select>
      </FormControl>      
    </>
  );
}
  