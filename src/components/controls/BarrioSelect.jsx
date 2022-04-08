
import React, { useContext, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import SelectReact from 'react-select';

//context
import { ProjectContext } from '../../context/ProjectContext'

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

export default function BarrioSelect({barrios, disabled}) { 


  const {projectData, setProjectData} = useContext(ProjectContext);
  const [personName, setPersonName] = React.useState([]);

  

  const headerList = ({nombre: nombreProv}, {nombre: nombreMun}) =>{
   return <ListSubheader key={nombreMun}>
      {nombreProv} | Municipio : {nombreMun}
    </ListSubheader>
  }

  const handleChange = async(event) => {
    const { target } = event;
    //setProvincesIDs(target.value);
    setProjectData(
      (prev) =>
        (prev = {
          ...prev,
          lugaresImplementacione: { ...prev.lugaresImplementacione, idBarrio: target.value },
        })
    )
  };  
    
  return (
    <>
       <FormControl /*variant="standard"*/ sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">
         Barrios / Parajes
        </InputLabel>
        <Select
          disabled={disabled}
          value={projectData.lugaresImplementacione.idBarrio}
          onChange={handleChange}
          label="Barrios / Parajes"
          sx={{
            marginBottom: "16px",
          }}
        >
          {barrios.length > 0 ? (
            barrios.map(({ idBarrio, nombre }) => {
              return (
                <MenuItem key={idBarrio} value={idBarrio}>
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
