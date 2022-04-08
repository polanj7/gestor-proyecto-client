import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom'

//mui
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

/*alert*/
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import LoadingButton from '@mui/lab/LoadingButton';
/*services*/
import { signIn } from '../../services/auth';
import { setAccessToken, setUserProfile } from '../../services/accessToken';

/*context*/
import { UserContext } from "../../context/UserContext";

/*cookies*/
import Cookies from 'js-cookie'

import logo from "../../image/logo.png";
import ForgotDialog from './ForgotDialog';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.grupoasaic.org" target="_blank" >
        www.grupoasaic.org
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {

  const {setUser} = useContext(UserContext);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usern, setUsern] = useState('');
  const [pass, setPass] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    
    if(usern.length === 0 || pass.length === 0){
      setIsOpenAlert(true);
    }else{

        setIsLoading(true)
        const dataUser = await signIn(usern, pass);

        if(!dataUser){
          setPass('');
          setIsOpenAlert(true);
          setIsLoading(false);
          return;
        }
        
        setUserProfile(dataUser);
        setAccessToken(dataUser.token);
        setUser(dataUser.nombre);        

        Cookies.set('userName', dataUser.nombre, { expires: 1, path: '/' })
        Cookies.set('userProfile', JSON.stringify(dataUser), { expires: 1, path: '/' });
        
        navigate('/project', { replace: true });      
    } 
    
  };  
  
  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        maxWidth="sm"
        sx={{ bgColor: "primary.main", width: "500px", height: "400px" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            marginBottom: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            boxShadow: 3,
            bgcolor: "#FCFDFF",
            borderColor: "primary.main",
            "& .MuiDataGrid-cell:hover": {
              color: "secundary.light",
            },
          }}
        >
          <Box
            sx={{
              marginBottom: 0,
            }}
          >
            <img width="200px" src={logo} alt="logo asic" loading="lazy" />
          </Box>
          <Typography
            component="h3"
            variant="h6"
            sx={{ textAlign: "center" }}
            style={{color: "#083240"}}
          >
            <strong>TORRE DE CONTROL</strong>
          </Typography>

          <Box component="form" onSubmit={handleLogin} noValidate>
            <Box sx={{ width: "100%" }}>
              <Collapse in={isOpenAlert}>
                <MuiAlert
                  severity="warning"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setIsOpenAlert(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  El usuario y/o contraseña son incorrectos!
                </MuiAlert>
              </Collapse>
            </Box>
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
              bgcolor="warning.main"
              type="submit"
              fullWidth
              loading={isLoading}
              variant="contained"
              sx={{
                marginTop: 2,
              }}
            >
              Iniciar sesión
            </LoadingButton>{" "}
            <ForgotDialog />
          </Box>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}