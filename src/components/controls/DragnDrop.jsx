import React from 'react'

import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';

const dropzoneStyle = {
    width  : "100%",  
    border : "1px solid #F3C09C",
    padding: "50px",
    textAlign: "center",
    borderStyle: "dashed"
};

const asideStyle = {
  marginTop  : "24px"  
};

export default function DragnDrop({acceptedFiles, getRootProps, getInputProps}) {
  
    const files = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
  
    return (
      <section>
        <Box component="div" style={dropzoneStyle} {...getRootProps({})}>
          <input {...getInputProps()} />
          <Typography
            sx={{ display: "inline" }}
            component="h2"
            variant="body1"
            color="text.primary"
          >
            Arrastre y suelte los documentos aquí, o haga clic para seleccionar
            documentos
          </Typography>
        </Box>

        {/* <aside style={asideStyle}>
          <Typography
            sx={{ display: "inline" }}
            component="h2"
            variant="h6"
            color="text.primary"
          >
            Documentos cargados
          </Typography>
        </aside> */}
      </section>
    );
}
