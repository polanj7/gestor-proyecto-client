import React, { useContext, useEffect, useState } from 'react';
//mui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectResponsable({responsables,responsable, setResponsable, disabled}) { 

  return (
    <>
      <FormControl  variant="standard" style={{ width: "100%", marginBottom: "20px" }}>
        <InputLabel id="selectImplementacion">Responsable</InputLabel>
        <Select
          disabled={disabled}
          required  
          label ="Responsable"          
          value={responsable}
          onChange={({target}) => setResponsable(target?.value)}          
          MenuProps={MenuProps}
        >
          {responsables.map(({ idUsuario ,nombre, apellido  }) => (
            <MenuItem 
              key={idUsuario} 
              value={idUsuario}           
            >      
              <ListItemText 
                primary={`${nombre} ${apellido}`}                
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>      
    </>
  );
}
