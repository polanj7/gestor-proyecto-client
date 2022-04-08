import React, { useContext, useState, useEffect } from 'react';
//mui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import SelectReact from 'react-select';

//context
import { ProjectContext } from '../../context/ProjectContext'

import Select2 from 'react-select'

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

const style = {
  control: base => ({
    ...base,
    border: 0,
    // This line disable the blue border
    boxShadow: 'none'
  })
};

export default function SelectProvinces({provinces, disabled, provincesIDs, setProvincesIDs, idTest}) { 

  const {projectData, setProjectData} = useContext(ProjectContext);

  const [seletedData, setSeletedData] = useState([]);
  const [test, setTest] = useState('');
 
  const handleChange = async(event) => {
    const { target } = event;
    setProvincesIDs(target.value);
    setProjectData(
      (prev) =>
        (prev = {
          ...prev,
          lugaresImplementacione: { ...prev.lugaresImplementacione, idProvincia: target.value },
        })
    )
  };  

  const handleChangeSelect =(prov) =>{
    let newIDs = [];
    prov.map(x =>{
      newIDs.push(x.nombre);
    })
    setProvincesIDs(newIDs);   
  }  

  const handleDataSelect =(e) => {    
    let newArray = [];
    e.map(({value}) => {
      newArray.push({
        idDesafioProyecto: 0,
        idProyecto: 0,
        idDesafio: value
      }); 
    })
    setProjectData(prev => prev = {...prev, desafiosProyectos: newArray});    
  }
  

  return (
    <>
      <FormControl /*variant="standard"*/ sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">
        Provincias
        </InputLabel>
        <Select
          disabled={disabled}
          value={projectData.lugaresImplementacione.idProvincia}
          onChange={handleChange}
          label="Provincias"
          sx={{
            marginBottom: "16px",
          }}
        >
          {provinces.length > 0 ? (
            provinces.map(({ idProvincia, nombre }) => {
              return (
                <MenuItem key={idProvincia} value={idProvincia}>
                  {nombre}
                </MenuItem>
              );
            })
          ) : (
            <></>
          )}
        </Select>
      </FormControl>

      {/* <p>Provincias</p>
      <Select2
        isMulti
        options={provinces}
        onChange={handleDataSelect}
        // value={[{label: "Salud", value: "Salud"}, {label: "Saluds", value: "Saluds"}]}
        style={{ width: "100%", marginBottom: "20px" }}
      /> */}

      {/* <FormControl
        // variant="standard"
        style={{ width: "100%", marginBottom: "20px" }}
      >     
        <InputLabel id="selectImplementacion">Provincias</InputLabel>
        <Select
          disabled={disabled}
          required
          label="Provincias"
          multiple
          value={seletedData}
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {provinces.map((prov) => (
            <MenuItem key={prov.nombre} value={prov.nombre}>
              <Checkbox checked={seletedData.indexOf(prov.nombre) > -1} />
              <ListItemText primary={prov.nombre} />
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
    </>
  );
}



// import React, { useContext } from 'react';
// //mui
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
// import InputLabel from '@mui/material/InputLabel';
// import ListItemText from '@mui/material/ListItemText';

// //context
// import { ProjectContext } from '../../context/ProjectContext'

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// export default function SelectProvinces({provinces, disabled}) { 

//   const {projectData, setProjectData} = useContext(ProjectContext);
//   const [personName, setPersonName] = React.useState([]);

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;

//     setPersonName(typeof value === 'string' ? value.split(',') : value);

//     let data = {
//       nombre: typeof value === "string" ? value.split(",") : value,
//       id: 123,
//     };

//     setProjectData({...projectData, lugaresImplementaciones: data})
//     //setProjectData({...projectData, tareas: [...projectData.tareas, tareass]})

//   };

//   return (
//     <>
//       <FormControl  variant="standard" style={{ width: "100%", marginBottom: "20px" }}>
//         <InputLabel id="selectImplementacion">Lugar Implementación</InputLabel>
//         <Select
//              disabled={disabled}
//           required      
//           label ="Lugar Implementación"          
//           multiple
//           value={personName}
//           onChange={handleChange}
//           renderValue={(selected) => selected.join(", ")}
//           MenuProps={MenuProps}
//         >
//           {provinces.map(({ idProvincia, nombre }) => (
//             <MenuItem key={idProvincia} value={nombre}>
//               <Checkbox checked={personName.indexOf(nombre) > -1} />
//               <ListItemText primary={nombre} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>      
//     </>
//   );
// }
