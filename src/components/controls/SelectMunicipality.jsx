
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

export default function SelectMunicipality({municipality, disabled, municipiosIDs, setMunicipiosIDs}) { 


  const {projectData, setProjectData} = useContext(ProjectContext);
  const [personName, setPersonName] = React.useState([]);

  const handleChange = async(event) => {
    const { target } = event;
    setMunicipiosIDs(target.value);
    setProjectData(
      (prev) =>
        (prev = {
          ...prev,
          lugaresImplementacione: { ...prev.lugaresImplementacione, idMunicipio: target.value },
        })
    )
  }; 


  const headerList = ({nombre: nombreProv}, {nombre: nombreMun}) =>{
   return <ListSubheader key={nombreMun}>
      {nombreProv} | Municipio : {nombreMun}
    </ListSubheader>
  }

  const handleChangeSelect =(prov) =>{
    let newIDs = [];
    // prov.map(x =>{
    //   newIDs.push(x.nombre);
    // })
    // setProvincesIDs(newIDs);   
  }

  // useEffect(() =>{
  //     if (projectData.idProyecto > 0){
  //     setPersonName(['CERRO DE LOS CACHEOS'])
  //   }

  // }, [projectData.idProyecto])
    
  return (
    <>

      <FormControl /*variant="standard"*/ sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">
        Municipios
        </InputLabel>
        <Select
          disabled={disabled}
          value={projectData.lugaresImplementacione.idMunicipio}
          onChange={handleChange}
          label="Municipios"
          sx={{
            marginBottom: "16px",
          }}
        >
          {municipality.length > 0 ? (
            municipality.map(({ idMunicipio, nombre }) => {
              return (
                <MenuItem key={idMunicipio} value={idMunicipio}>
                  {nombre}
                </MenuItem>
              );
            })
          ) : (
            <></>
          )}
        </Select>
      </FormControl>
     
        {/* <SelectReact
          options={municipality}
          onChange={handleChangeSelect}
          isMulti
        /> */}

        {/* <InputLabel id="selectImplementacion">
          Municipios
        </InputLabel>
        <Select
          disabled={disabled}
          required
          label="Municipios"
          multiple
          value={personName}
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {municipality.map(({idMunicipio, nombre}) => {           
                return (
                  <MenuItem key={idMunicipio} value={nombre}>
                    <Checkbox checked={personName.indexOf(nombre) > -1} />
                    <ListItemText primary={`${nombre}`} />
                  </MenuItem>
                );               
          })}
        </Select>
      </FormControl> */}
    </>
  );
}
