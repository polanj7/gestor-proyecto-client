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
    const {
      target: { value }, 
    } = event;

    // console.log('nombres', nombres);
    // setSeletedData(nombres.length > 0 ? [nombres.join(',')]: [nombres[0]]);

    console.log('change', value)

    setProvincesIDs(value);
    setSeletedData(typeof value === 'string' ? value.split(',') : value); 

    // //Datos temporales
    // let dataFinal = [
    //   {
    //     idImplementacion: 0,
    //     idProyecto: 0,
    //     idProvincia: 2,
    //   },
    // ];

    //setProjectData({...projectData, lugaresImplementaciones: dataFinal})
  };  

  const handleChangeSelect =(prov) =>{
    let newIDs = [];
    prov.map(x =>{
      newIDs.push(x.nombre);
    })
    setProvincesIDs(newIDs);   
  }  


   useEffect(async() =>{

     if (idTest > 0) {
       setSeletedData((prev) => (prev = ["AZUA"]));
       //testExec();
     }

     //PROV --> AZUA
     //BARRIO --> CERRO DE LOS CACHEOS
   }, [projectData.idProyecto])

  return (
  
    <>
      <FormControl
        // variant="standard"
        style={{ width: "100%", marginBottom: "20px" }}
      >
        {/* <SelectReact
          options={provinces}
          onChange={handleChangeSelect}
          isMulti
        /> */}
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
      </FormControl>
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
