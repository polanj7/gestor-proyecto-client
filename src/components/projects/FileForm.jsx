import React, {useState} from 'react';

//services
import { getFiles, postFiles } from '../../services/filesServices'

//mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
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
import FilesList from '../FilesList';
import DragnDrop from '../controls/DragnDrop';

//dnd
import {useDropzone} from 'react-dropzone'
import { Box } from '@mui/system';

export default function FileForm() {

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const files = acceptedFiles.map(f => (
    <FilesList key={f.path} file={f} />
  ));

  // const handleOnChangeDialog = (e) => {  
  //   setFiles([...e.target.files]) 
  // }

  // const loadFile =async()=>{
  //   let dataFiles = new FormData();
  //   for(let index =0;index < files.length; index++){
  //     dataFiles.append("files", files[index])
  //   }

  return (
    <div className="container">
      <DragnDrop
        acceptedFiles={acceptedFiles}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
      />
      <Box
        sx={{ flexGrow: 1 }}
        style={{ overflow: "hidden", overflowY: "auto", maxHeight: "350px", marginTop: "10px" }}
      >
        <Grid container spacing={2}>
          {files}
        </Grid>
      </Box>
    </div>
  );
}
