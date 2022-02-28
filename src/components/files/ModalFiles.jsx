import React, { useState, useCallback } from "react";
import ListTaks from "../taks/ListTaks";
import DragnDrop from "../controls/DragnDrop";

//mui
import Typography from "@mui/material/Typography";

//icons
import ListAltIcon from "@mui/icons-material/ListAlt";

import Modal from "react-bootstrap/Modal";
//dnd
import Dropzone, { useDropzone } from "react-dropzone";

import FilesList from '../FilesList';

//mui
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import { Box } from '@mui/system';

const isScrollable = true;

export default function ModalFiles({ id, isOpenFiles, setIsOpenFiles }) {
  console.log('Holas');

  const[files, setFiles] = useState([[]]);  
  
  const onDrop = useCallback((acceptedFiles) => {
    let formData = new FormData();
    let newArray = [];

    for (let i = 0; i < acceptedFiles.length; i++) {
      console.log(i);
      formData.append("documentosProyectos", acceptedFiles[i]);
      newArray.push(formData);
    }

    console.log("loaded", acceptedFiles.loaded);
    console.log("new", newArray);  

  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (file) => {
    console.log(file)
    const indexFile = files.indexOf(file);
    files.splice(indexFile, 1); 
    setFiles(prev => prev = {...prev, documentosProyectos: [...prev.documentosProyectos]});  
  }

  return (
    <>
      <Modal
        show={isOpenFiles}
        onHide={() => setIsOpenFiles(false)}
        style={{ marginTop: "55px", height: "85vh" }}
        size="lg"
        scrollable={isScrollable}
        centered="true"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Typography variant="h6" component="h3" color="primary">
              <ListAltIcon /> Documentos
            </Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DragnDrop
            getRootProps={getRootProps}
            getInputProps={getInputProps}
          />
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
                  component="label"
                  variant="subtile2"
                  sx={{
                    color: "primary.dark",
                  }}
                >                  
                </Typography>
                <List>
                  {files?.map((f, idx) => {
                    return (
                      <FilesList
                        key={idx}
                        file={f}
                        removeFile={handleRemoveFile}
                      />
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </Box>
        </Modal.Body>
      </Modal>
    </>
  );
}
