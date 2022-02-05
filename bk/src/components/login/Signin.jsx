import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom'

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
/*alert*/
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Avatar from '@mui/material/Avatar';
import {VerifiedUserOutlined, ExitToAppOutlined} from '@material-ui/icons';

import LoadingButton from '@mui/lab/LoadingButton';
/*services*/
import { signIn } from '../../services/auth';
import { setAccessToken, setUserProfile } from '../../services/accessToken';

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
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpenAlert(false);
  };

  const [usern, setUsern] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    
    if(usern.length === 0 || pass.length === 0){
      setIsOpenAlert(true);
    }else{
      setIsLoading(true)
      signIn(usern, pass).then((resp) => { 

        if(!resp){
          setIsOpenAlert(true);
          setIsLoading(false);
          setPass('');
          return;
        }
        setUserProfile(resp);

        setAccessToken(resp.token);
        setUser(resp.nombre);        

        Cookies.set('userName', resp.nombre, { expires: 1, path: '/' })
        Cookies.set('userProfile', JSON.stringify(resp), { expires: 1, path: '/' })  
        
        navigate('/', { replace: true });
      });
    } 
    
  };  
  
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
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar sesión
            </Typography>

            <Box
              component="form"
              onSubmit={handleLogin}
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
                onChange={({ target }) => setUsern(target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                onChange={({ target }) => setPass(target.value)}
              />

              <LoadingButton
                type="submit"
                fullWidth
                loading={isLoading}
                variant="outlined"
              >
                Iniciar sesión
              </LoadingButton>
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
        <Alert
          onClose={handleClose}
          variant="outlined"
          severity="error"
          sx={{ width: "100%" }}
        >
          <AlertTitle>Datos incorrectos</AlertTitle>
          Usuario y Contraseña son requeridos!
        </Alert>
      </Snackbar>
    </>
  );
}