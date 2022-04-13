import React, {useState,useContext,useEffect} from 'react'

//mui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';

import Select2 from 'react-select'

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

export default function SelectChallenges({challenges, disabled}) {
  const { projectData, setProjectData } = useContext(ProjectContext);

  const handleDataSelect =(e) => {    
    let newArray = [];
    e.map(({value}) => {
      newArray.push({
        idDesafioProyecto: 0,
        idProyecto: 0,
        idDesafio: value
      }); 
    })
    setProjectData(prev => prev = {...prev, desafiosProyecto: newArray});    
  }

  const handleChange = async(event) => {
    const { target } = event;
    setProjectData(
      (prev) =>
        (prev = {
          ...prev,
          desafiosProyecto: { ...prev.desafiosProyecto, idDesafio: target.value },
        })
    )
  }; 

  return (
    <>

      <FormControl /*variant="standard"*/ sx={{ width: "49%" }}>
        <InputLabel id="demo-simple-select-standard-label">
          Desafios
        </InputLabel>
        <Select
          disabled={disabled}
          value={projectData.desafiosProyecto.idDesafio}
          onChange={handleChange}
          label="Desafios"        
        >
          {challenges.length > 0 ? (
            challenges.map(({ idDesafio, nombre }) => {
              return (
                <MenuItem key={idDesafio} value={idDesafio}>
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
        // variant="standard"
        style={{ width: "100%", marginBottom: "20px" }}
      >
        <InputLabel id="selectImplementacion">
          Desafío(s) Impactado(s)
        </InputLabel>

       
        {/* <Select
          disabled={disabled}
          required
          label="Lugar Implementación"
          multiple
          value={personName}
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {challenges.map(({ text, value }) => (
            <MenuItem key={value} value={value}>
              <Checkbox checked={personName.indexOf(text) > -1} />
              <ListItemText primary={text} />
            </MenuItem>
          ))}
        </Select> */}

      {/* </FormControl>  */}
      {/* <p>Desafios</p>
      <Select2
        isMulti
        options={challenges}
        onChange={handleDataSelect}
        // value={[{label: "Salud", value: "Salud"}, {label: "Saluds", value: "Saluds"}]}
        style={{ width: "100%", marginBottom: "20px" }}
      /> */}
    </>
  );
}
