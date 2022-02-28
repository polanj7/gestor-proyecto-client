import React from 'react'

import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';

const dropzoneStyle = {
    width  : "100%",  
    border : "2px solid #F3C09C",
    padding: "48px",
    textAlign: "center",
    borderStyle: "dashed"
};

const asideStyle = {
  marginTop  : "24px"  
};

export default function DragnDrop({getRootProps, getInputProps}) {
    
    return (
      <section>
        <Box 
          component="div" 
          style={dropzoneStyle} 
          {...getRootProps({className: 'dropzone'})}
        >
          <input {...getInputProps()} />
          <Typography
            sx={{ display: "inline" }}
            component="h2"
            variant="body1"
            color="warning.main"
          >
            Arrastre y suelte los documentos aquí, o haga clic para seleccionar
            documentos
          </Typography>
        </Box>
      </section>
    );
}
