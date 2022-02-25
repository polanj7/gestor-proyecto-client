import React, {useState, useContext, useEffect, useCallback} from 'react';

//services
import { getFiles, postFiles } from '../../services/filesServices'

//mui
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import { Box } from '@mui/system';

//icon
import FilesList from '../FilesList';
import DragnDrop from '../controls/DragnDrop';

//dnd
import Dropzone, {useDropzone} from 'react-dropzone'

//context
import { ProjectContext } from '../../context/ProjectContext';


export default function FileForm() {

  const {projectData, setProjectData} = useContext(ProjectContext);


  const [files, setFiles] = React.useState([]);
  const onDrop = useCallback(acceptedFiles => {
    setFiles(prev => [...prev, ...acceptedFiles]);
    setProjectData(prev => prev = {...prev, documentosProyectos: [...prev.documentosProyectos, ...acceptedFiles]}); 
  }, []);

  const {getRootProps, getInputProps} = useDropzone({onDrop});


  const removeFile = async (e) => {
   
  }
  
  console.log('projectData.documentosProyectos', projectData)    
  //documentosProyectos
 

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
            <List>
              {projectData.documentosProyectos?.map((f, idx) => {
                return <FilesList key={idx} file={f} removeFile={removeFile} />;
              })}
            </List>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
