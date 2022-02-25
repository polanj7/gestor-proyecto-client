import React from 'react';

//mui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


export default function SelectBeneficiaries({beneficiaries, disabled}) {
    
  return (
    <>
      <FormControl variant="standard" sx={{ width: "49%" }}>
        <InputLabel id="demo-simple-select-standard-label">
          Tipo de Beneficiario
        </InputLabel>
        <Select
          disabled={disabled}
          // value={age}
          // onChange={handleChange}
          label="Tipo de Beneficiario"
          variant="standard"
        >
          {beneficiaries.length == 0 ? (
            beneficiaries.map(({ IdBeneficiario, Nombre }) => {
              return <MenuItem value={IdBeneficiario}>{Nombre}</MenuItem>;
            })
          ) : (
            <></>
          )}
        </Select>
      </FormControl>      
    </>
  );
}
