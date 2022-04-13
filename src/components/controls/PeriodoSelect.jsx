import React, { useContext, useEffect } from 'react';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export default function PeriodoSelect({periodos, periodo, setPerido}) { 
    
  return (
    <>
       <FormControl /*variant="standard"*/ sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">
         Período
        </InputLabel>
        <Select         
          value={periodo}
          onChange={({target}) => setPerido(target.value)}
          label="Período"
          sx={{
            marginBottom: "16px",
          }}
        >
          {periodos.length > 0 ? (
            periodos.map(({ nombre }) => {
              return (
                <MenuItem key={nombre} value={nombre}>
                  {nombre}
                </MenuItem>
              );
            })
          ) : (
            <></>
          )}
        </Select>
      </FormControl>
    </>
  );
}

