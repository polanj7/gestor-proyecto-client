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

  const handleChange = async(event) => {
    const { target } = event;   
    setProjectData(
      (prev) =>
        (prev = {
          ...prev,
          tiposBeneficiarioProyecto: { ...prev.tiposBeneficiarioProyecto, idTipo: target.value },
        })
    )
  }; 

  return (
    <>
      <FormControl sx={{ width: "49%" }}>
        <InputLabel>
          Tipo de Beneficiario
        </InputLabel>
        <Select 
          disabled={disabled}
          value={projectData.tiposBeneficiarioProyecto.idTipo}
          onChange={handleChange}     
          label="Tipo de Beneficiario"
        >
          {beneficiaries.length > 0 ? (
            beneficiaries.map(({ idTipo, nombre }) => {
              return <MenuItem key={idTipo} value={idTipo}>{nombre}</MenuItem>;
            })
          ) : (
            <></>
          )}
        </Select>
      </FormControl>      
    </>
  );
}
  