import React from 'react';

//mui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


export default function SelectBeneficiaries({beneficiaries, disabled, handleChangeBeneficiaries}) {
    
  return (
    <>
      <FormControl /*variant="standard"*/ sx={{ width: "49%" }}>
        <InputLabel>
          Tipo de Beneficiario
        </InputLabel>
        <Select 
          disabled={disabled}
          // value={age}
          onChange={handleChangeBeneficiaries}          
          label="Tipo de Beneficiario"
          // variant="standard"
        >
          {beneficiaries.length > 0 ? (
            beneficiaries.map(({ IdTipo, nombre }) => {
              return <MenuItem key={IdTipo} value={IdTipo}>{nombre}</MenuItem>;
            })
          ) : (
            <></>
          )}
        </Select>
      </FormControl>      
    </>
  );
}
  