import React, { useContext } from 'react';
//mui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';

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

export default function SelectProvinces({provinces, disabled}) { 

  const {projectData, setProjectData} = useContext(ProjectContext);
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setPersonName(typeof value === 'string' ? value.split(',') : value);

    let data = {
      nombre: typeof value === "string" ? value.split(",") : value,
      id: 123,
    };

    setProjectData({...projectData, lugaresImplementaciones: data})
    //setProjectData({...projectData, tareas: [...projectData.tareas, tareass]})

  };

  return (
    <>
      <FormControl  variant="standard" style={{ width: "100%", marginBottom: "20px" }}>
        <InputLabel id="selectImplementacion">Lugar Implementación</InputLabel>
        <Select
             disabled={disabled}
          required      
          label ="Lugar Implementación"          
          multiple
          value={personName}
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {provinces.map(({ idProvincia, nombre }) => (
            <MenuItem key={idProvincia} value={nombre}>
              <Checkbox checked={personName.indexOf(nombre) > -1} />
              <ListItemText primary={nombre} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>      
    </>
  );
}
