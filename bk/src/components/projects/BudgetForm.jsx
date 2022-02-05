import React, {useContext} from 'react';

//mui
import Typography from "@mui/material/Typography";

//context
import { ProjectContext } from '../../context/ProjectContext'

export default function BudgetForm() {

  const {projectData, setProjectData} = useContext(ProjectContext); 
  
  return (
    <>
      <Typography mt={2} mb={3} variant="h5" component="h1" color="primary">
        Presupuesto
      </Typography>
      <br />
      <div className="w-75">
        <div className="form-group">
          <label htmlFor="nombre">Monto Presupuestado</label>
          <input
            type="number"
            className="form-control form-control-border w-100"
            id="nombre"
            placeholder="$ monto"
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Tipo</label>
          <input
            type="text"
            className="form-control form-control-border w-100"
            id="descripcion"
            placeholder="tipo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fechafin">Descripción</label>
          <textarea
            className="form-control form-control-border w-100"
            id="fechaFin"
            placeholder="descripción"
          />
        </div>
      </div>
    </>
  );
}
