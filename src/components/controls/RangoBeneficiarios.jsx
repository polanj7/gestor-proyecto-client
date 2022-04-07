import React, {useContext} from 'react';

//mui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
//context
import { ProjectContext } from "../../context/ProjectContext";

export default function RangoBeneficiarios({rango, disabled}) {
  const { projectData, setProjectData } = useContext(ProjectContext);
  //idRangoBeneficiario
  return (
    <>
      <FormControl /*variant="standard"*/ sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">
          Rango de Beneficiarios
        </InputLabel>
        <Select
          disabled={disabled}
          value={projectData.idRangoBeneficiario}
          onChange={({ target }) =>
           setProjectData({ ...projectData, idRangoBeneficiario: target.value })
          }      
          label="Rango de Beneficiarios"   
          sx={{           
            marginBottom: "16px"           
          }}
        >
          {rango.length > 0 ? (
            rango.map(({ idRango, nombre }) => {
              return <MenuItem key={idRango} value={idRango}>{nombre}</MenuItem>;
            })
          ) : (
            <></>
          )}
        </Select>
      </FormControl>      
    </>
  );
}
  