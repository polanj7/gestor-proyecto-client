import React, {useContext} from 'react';

//mui
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

//context
import { ProjectContext } from "../../context/ProjectContext";

export default function SelectBeneficiaries({beneficiaries, disabled }) {
    
  const { projectData, setProjectData } = useContext(ProjectContext);

  return (
    <>
      <FormControl /*variant="standard"*/ sx={{ width: "49%" }}>
        <InputLabel>
          Tipo de Beneficiario
        </InputLabel>
        <Select 
          disabled={disabled}
          value={projectData.idRangoBeneficiario}
          onChange={({ target }) =>
           setProjectData({ ...projectData, idRangoBeneficiario: target.value })
          }     
          label="Tipo de Beneficiario"
        >
          {beneficiaries.length > 0 ? (
            beneficiaries.map(({ IdTipo, nombre }) => {
              return <MenuItem key={IdTipo} value={IdTipo}>{nombre}</MenuItem>;
            })
          ) : (
            <></>
          )}
        </Select>
      </FormControl>      
    </>
  );
}
  