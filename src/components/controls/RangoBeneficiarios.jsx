import React from 'react';

//mui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


export default function RangoBeneficiarios({rango, disabled, handleChangeRango}) {
    
  return (
    <>
      <FormControl /*variant="standard"*/ sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">
          Rango de Beneficiarios
        </InputLabel>
        <Select
          disabled={disabled}
          // value={age}
          onChange={handleChangeRango}          
          label="Rango de Beneficiarios"
          // variant="standard"
          sx={{           
            marginBottom: "16px"           
          }}
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
  