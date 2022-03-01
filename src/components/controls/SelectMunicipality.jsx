
import React, { useContext } from 'react';

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

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

export default function SelectMunicipality({municipality, disabled}) { 
  console.log('municipality', municipality)

  const {projectData, setProjectData} = useContext(ProjectContext);
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {

    console.log('event111', event)

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
      <FormControl
        variant="standard"
        style={{ width: "100%", marginBottom: "20px" }}
      >
        <InputLabel id="selectImplementacion">
          Territorios Impactados
        </InputLabel>
        <Select
        
          disabled={disabled}
          required
          label="Lugar Implementación"
          multiple
          value={personName}
          onSelect={handleChange}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          

          {municipality.map((z) => {
            return (
              <div key={z.nombre}>                
                {                  
                  z.municipios.map((x) => {
                    return (
                      <div key={x.nombre}>
                        <ListSubheader key={x.nombre}>Municipio - {x.nombre}, {z.nombre}</ListSubheader>
                        {
                          x.barrios.map((y, idx) =>{
                            return (
                              <MenuItem key={idx} value={`${y.nombre}`} >
                                <Checkbox
                                  checked={personName.indexOf(y.nombre) > -1}
                                />
                                <ListItemText primary={y.nombre} secundary={z.nombre} />
                              </MenuItem>
                            );
                          })
                        }                      
                      </div>
                    )
                  })
                }
              </div>
            )
          }
          )} 
        </Select>
      </FormControl>
    </>
  );
}
