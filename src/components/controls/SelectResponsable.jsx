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

export default function SelectResponsable({responsables,responsable, setResponsable, setResponsableLabel, disabled}) { 


  const handleChange = async(event) => {
    console.log('event', event)
    const { target } = event;
    //let name = responsables.fin(target.value).nombre
    setResponsable(target.value);
    //setResponsableLabel(name);   
  }; 

  return (
    <>
      <FormControl /*variant="standard"*/ sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">
          Responsable
        </InputLabel>
        <Select
          disabled={disabled}
          value={responsable}
          onChange={handleChange}
          label="Responsable"
          sx={{
            marginBottom: "16px",
          }}
        >
          {responsables.length > 0 ? (
            responsables.map(({ idUsuario ,nombre, apellido }) => {
              return (
                <MenuItem key={idUsuario} value={idUsuario}>
                  {`${nombre} ${apellido}`}
                </MenuItem>
              );
            })
          ) : (
            <></>
          )}
        </Select>
      </FormControl>

      {/* <FormControl  style={{ width: "100%", marginBottom: "20px" }}>
        <InputLabel id="selectImplementacion">Responsable</InputLabel>
        <Select
          disabled={disabled}
          required  
          label ="Responsable"          
          value={responsable}
          onChange={handleChange}          
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
      </FormControl>       */}
    </>
  );
}
