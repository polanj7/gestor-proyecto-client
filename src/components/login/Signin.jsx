import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom'

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
/*alert*/
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

/*services*/
import { signIn } from '../../services/auth';
import { setAccessToken, verifity } from '../../services/accessToken';

/*context*/
import { UserContext } from "../../context/UserContext";

/*cookies*/
import Cookies from 'js-cookie'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        www.xxx.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignIn() {

  const {setUser} = useContext(UserContext);
  // const [isLogin, setIsLogin] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpenAlert(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let data = new FormData(event.currentTarget);
    let user = data.get('user');
    let pass = data.get('password');

    if(user.length === 0 || pass.length === 0){
        setIsOpenAlert(true);
    }else{
      signIn(user, pass).then((resp) => {        
        setAccessToken(resp.token);
        setUser(resp.nombre);

        let dataUser = {
          nombre: resp.nombre, 
          token: resp.token
        }

        Cookies.set('userName', resp.nombre, { expires: 1, path: '/' })
        Cookies.set('userProfile', dataUser, { expires: 1, path: '/' })       
      });
    }  
  };
  
  if(verifity()){    
    navigate('/', { replace: true });
  }
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
        </Avatar> */}
            <Typography component="h1" variant="h5">
              Iniciar sesión
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="Usuario"
                name="user"
                autoComplete="user"
                required
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar sesión
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Has olvidado tu contraseña?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>

      <Snackbar
        open={isOpenAlert}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} variant="outlined" severity="error" sx={{ width: "100%" }}>
           <AlertTitle>Datos incorrectos</AlertTitle>
           Usuario y Contraseña son requeridos!
        </Alert>
      </Snackbar>
    </>
  );
}