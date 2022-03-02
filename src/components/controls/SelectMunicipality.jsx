
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

    setProjectData({...projectData, lugaresImplementacionessss: data})
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
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >          

          {municipality.map((prov) => {
            return prov.municipios.map((mun) => {
              return (
                <div key={mun.nombre}>
                  <ListSubheader key={mun.nombre}>
                    {prov.nombre} | Municipio : {mun.nombre}
                  </ListSubheader>
                  {mun.barrios.map((barr, idx) => {
                    return (
                      <MenuItem key={idx} value={`${barr.nombre}`}>
                        <Checkbox checked={personName.indexOf(barr.nombre) > -1} />
                        <ListItemText primary={barr.nombre} />
                      </MenuItem>
                    );
                  })}
                </div>
              );
            });
          }
          )} 
        </Select>
      </FormControl>
    </>
  );
}
