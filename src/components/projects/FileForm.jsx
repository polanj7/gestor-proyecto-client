import React from 'react';


//mui
import Button from '@mui/material/Button'

//icon
import AttachFileIcon from '@mui/icons-material/AttachFile';


export default function FileForm() {
  return (
    <>
      <div className="form-group col-sm-6">
        <label htmlFor="tipoBeneficiario">Tipo de Documento</label>
        <select
          className="custom-select form-control-border"
          data-placeholder="Select a State"
          style={{ width: "100%" }}
        >
          <option>Sin definir</option>
          <option>Sin definir</option>
        </select>
      </div>

      <div className="form-group col-sm-6">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          className="form-control form-control-border w-100"
          id="descripcion"
          placeholder="Descipción Documento"
          rows={3}
        />
      </div>
      <Button
        variant="contained"
        component="label"
        style={{ width: "100%", marginTop: "12px", marginBottom: "12px", padding: "12px" }}
        startIcon={<AttachFileIcon />}
      >
        Cargar Documento
        <input type="file" hidden />
      </Button>
    </>
  );
}
