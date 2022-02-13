import React from 'react';

//mui
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Divider } from '@mui/material';

//icons
import AddIcon from '@mui/icons-material/Add';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';


//icon
import AttachFileIcon from '@mui/icons-material/AttachFile';


export default function FileForm() {
  return (
    <>
      
      <div className="form-group col-sm-6">
        <TextField
          required
          label="Tipo de Documento"
          variant="standard"
          placeholder="-Select-"
          sx={{ width: "100%", marginBottom: "16px" }}
        />
      </div>
      <div className="form-group col-sm-6">
        <TextField
          label="Descripción"
          variant="standard"
          placeholder="Descripción del Documento"
          sx={{ width: "100%", marginBottom: "16px" }}
          multiline
          rows={3}
        />
      </div>
      <div className="form-group col-sm-6">
        <Button
          variant="contained"
          component="label"
          style={{
            width: "100%",
            marginTop: "12px",
            marginBottom: "12px",
            padding: "6px",
          }}
          startIcon={<AttachFileIcon />}
        >
          Cargar Documento
          <input type="file" hidden />
        </Button>
      </div>
    </>
  );
}
