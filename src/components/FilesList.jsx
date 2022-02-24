import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import IconButton from '@mui/material/IconButton';
import FileCopy from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';

export default function FilesList(props) {
  
  const convertSizeFile =(size) =>{
    if (size >= 1 && size < 1000000) {
      return (size / 1000).toFixed(2) + " kb";
    } else if (size >= 1000000 && size < 1000000000) {
      return (size / 1000000).toFixed(2) + " mb";
    } else {
      return (size / 1000).toFixed(2) + " gb";
    }
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <List>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon color="error" />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <FileCopy />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={props.file.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Size
                    </Typography>
                    {" - " + convertSizeFile(props.file.size)}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </Grid>
      </Grid>
    </>
  );
}
