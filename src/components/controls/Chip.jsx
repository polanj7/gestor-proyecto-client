import React from 'react'


//mui
import Box from '@mui/material/Box';
import ChipMui from '@mui/material/Chip';
//icons


export default function Chip(props) {
  return (
    <Box
      sx={{
        color: "azure",
        textAlign: "center",
        width: "140px",
        marginLeft: "8px",
        marginBottom: "12px",
      }}
    >
      <ChipMui
        {...props}
      />
    </Box>
  );
}
