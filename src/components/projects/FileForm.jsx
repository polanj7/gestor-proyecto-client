import React, {useState, useContext, useEffect, useCallback} from 'react';

//services
import { getFiles, addFiles } from '../../services/filesServices'

//mui
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

//icon
import FilesList from '../FilesList';
import DragnDrop from '../controls/DragnDrop';

//dnd
import Dropzone, {useDropzone} from 'react-dropzone'

//context
import { ProjectContext } from '../../context/ProjectContext';


export default function FileForm() {
  /*  
      "idDocumento": 0,
      "idProyecto": 0,
      "idTarea": 0,
      "contenido": "string",
      "fecha": "2022-02-25T19:07:24.703Z",
      "nombreArchivo": "string",
      "ext": "string",
      "url": "string"
  */
  const {projectData, setProjectData} = useContext(ProjectContext);

  const onDrop = useCallback(acceptedFiles => { 
  
    let newFiles = [];
    let newFile = {};
    let newDocumentosFisicos = [];
    let newDocumentoFisico = {};
    
    for(let i=0; i < acceptedFiles.length; i++) { 
   
      newDocumentoFisico = {
        "file": acceptedFiles[i]
      }   

      newDocumentosFisicos.push(newDocumentoFisico)   

      newFile = {
        "idDocumento": 0,
        "idProyecto": projectData.idProyecto,
        "idTarea": null,
        "contenido": "",
        "fecha": new Date(),
        "nombreArchivo": acceptedFiles[i].name,
        "ext": "string",
        "url": "string",
        "size": acceptedFiles[i].size
      }
      
      projectData.newDocumentosFisicos = newDocumentosFisicos;
      newFiles.push(newFile);
    }
        
    // setProjectData(prev => prev = {...prev, documentosProyectos: [...prev.documentosProyectos, ...acceptedFiles]});
    setProjectData(prev => prev = {...prev, documentosFisicos: [...prev.documentosFisicos, ...newDocumentosFisicos]}); 
    setProjectData(prev => prev = {...prev, documentosProyectos: [...prev.documentosProyectos, ...newFiles]}); 
  }, []);

  const {getRootProps, getInputProps} = useDropzone({onDrop});
  
  const handleRemoveFile = (file) => {   
    const indexFile = projectData.documentosProyectos.indexOf(file);    
    projectData.documentosProyectos.splice(indexFile, 1); 
    setProjectData(prev => prev = {...prev, documentosProyectos: [...prev.documentosProyectos]});  
  }

  return (
    <div className="container">
      <DragnDrop getRootProps={getRootProps} getInputProps={getInputProps} />
      <Box
        sx={{ flexGrow: 1 }}
        style={{
          overflow: "hidden",
          overflowY: "auto",
          maxHeight: "350px",
          marginTop: "10px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>        
            <Typography
              component='label'
              variant='subtile2'
              sx={{
                color: "primary.dark"
              }}           
            >
              {projectData.documentosProyectos.length > 0 ? projectData.documentosProyectos.length + " documento(s)" : ""}
            </Typography>
            <List>
              {projectData.documentosProyectos?.map((f, idx) => {
                return <FilesList key={idx} file={f} removeFile={handleRemoveFile} />;
              })}
            </List>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
