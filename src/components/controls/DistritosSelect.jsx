
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

export default function DistritosSelect({districts, disabled, distritosIDs, setDistritosIDs}) { 


  const {projectData, setProjectData} = useContext(ProjectContext);
  const [personName, setPersonName] = React.useState([]);

  const handleChange = async(event) => {
    const { target } = event;
    setDistritosIDs(target.value);
    setProjectData(
      (prev) =>
        (prev = {
          ...prev,
          lugaresImplementacione: { ...prev.lugaresImplementacione, idDistrito: target.value },
        })
    )
  }; 

  const headerList = ({nombre: nombreProv}, {nombre: nombreMun}) =>{
   return <ListSubheader key={nombreMun}>
      {nombreProv} | Municipio : {nombreMun}
    </ListSubheader>
  }

    
  return (
    <>


  <FormControl /*variant="standard"*/ sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">
          Distritos Municipales
        </InputLabel>
        <Select
          disabled={disabled}
          value={projectData.lugaresImplementacione.idDistrito}
          onChange={handleChange}
          label="Distritos Municipales"
          sx={{
            marginBottom: "16px",
          }}
        >
          {districts.length > 0 ? (
            districts.map(({ idDistrito, nombre }) => {
              return (
                <MenuItem key={idDistrito} value={idDistrito}>
                  {nombre}
                </MenuItem>
              );
            })
          ) : (
            <></>
          )}
        </Select>
      </FormControl>

      {/* <FormControl        
        style={{ width: "100%", marginBottom: "20px" }}
      >
        <InputLabel id="selectImplementacion">
        Distritos Municipales
        </InputLabel>
        <Select
          disabled={disabled}
          required
          label="Distritos Municipales"
          multiple
          value={personName}
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {districts.map(({idDistrito, nombre}) => {
            return(
            <MenuItem key={idDistrito} value={nombre}>
              <Checkbox checked={personName.indexOf(nombre) > -1} />
              <ListItemText primary={`${nombre}`} />
            </MenuItem>)
          })}
        </Select>
      </FormControl> */}
    </>
  );
}
