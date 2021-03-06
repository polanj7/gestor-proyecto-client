import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import {forgotPassword} from '../../services/auth'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function ForgotDialog() {
  const [open, setOpen] = useState(false);
  const [usuario, setUsuario] = useState('');

  const handleClosed = async () => {
    forgotPassword(usuario);
    setOpen(false);
  };

  const handleOpen = async () => {
    setOpen(true);
  };

  return (
    <>
      <Grid container>
        <Grid item xs>
          <Link variant="body2" onClick={() => handleOpen()}>
            Has olvidado tu contraseña?
          </Link>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClosed}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ color: "primary.dark" }}>
          {"Recuperación de contraseña"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Puedes digitar el usuario para recuperar la misma. Se le estará enviando una contraseña temporal al correo registrado en la plataforma.
          </DialogContentText>
          <TextField
            margin="normal"
            required
            fullWidth
            id="user"
            label="Usuario"
            name="user"
            autoComplete="user"
            autoFocus
            variant="outlined"
            value={usuario}
            onChange={({ target }) => setUsuario(target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosed} variant="contained">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
