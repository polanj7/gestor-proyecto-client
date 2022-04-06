import React from 'react';

//mui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


export default function DonanrtesSelect({donantes, disabled, handleChangeDonantes}) {

  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">
          Donante
        </InputLabel>
        <Select
          disabled={disabled}
          // value={age}
          onChange={handleChangeDonantes}          
          label="Donante"  
          sx={{           
            marginBottom: "16px"           
          }}      
        >
          {donantes.length > 0 ? (
            donantes.map(({ idDonante, nombre }) => {
              return <MenuItem key={idDonante} value={idDonante}>{nombre}</MenuItem>;
            })
          ) : (
            <></>
          )}
        </Select>
      </FormControl>      
    </>
  );
}
  