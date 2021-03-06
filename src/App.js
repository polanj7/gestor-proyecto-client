import React, {useState, useMemo} from 'react';

import NotFount404 from './components/NotFount404';
import Index from './components/projects/Index';
import Edit from './components/projects/Edit';
import Delete from './components/projects/Delete';
import ContentForm from './components/projects/ContentForm';
import SignIn from './components/login/Signin';
import Main from './components/main/Main';
import Dashboard from './components/Dashboard';
import {getUserCookies} from './services/auth'

import {
  BrowserRouter,
  Routes,
  Route,
  HashRouter   
} from "react-router-dom";

//context
import { UserContext } from './context/UserContext';
import { ParameterContext } from './context/ParameterContext'
import UsuariosForm from './components/mantenimientos/UsuariosForm';
import UsuariosList from './components/mantenimientos/UsuariosList';



export default function App() {

  // getUserProfileCookies();
  let userName = getUserCookies();

  //user context
  const [user, setUser] = useState(userName);  
  const providerUser = useMemo(() => ({user, setUser}), [user, setUser]);

  //project context
  const [parameterProject, setParameterProject] = useState({
    id: 0,
    mode: 'read-only'
  });
  
  const providerParameter = useMemo(
    () => ({ parameterProject, setParameterProject }),
    [parameterProject, setParameterProject]
  ); 
  // "homepage": "https://torre-control.netlify.app/",
  return (
    <>
      <UserContext.Provider value={providerUser}>
        <ParameterContext.Provider value={providerParameter}>
          <HashRouter>
            <Routes>
              <Route
                path="/project"
                element={
                  <Main>
                    {" "}
                    <Index />
                  </Main>
                }
              >
                <Route path="edit/:id" element={<Edit />} />
                <Route path="delete/:id" element={<Delete />} />
              </Route>
              <Route path="project/new" element={<Edit />} />
              <Route
                path="/project/new2"
                element={
                  <Main>
                    <ContentForm />
                  </Main>
                }
              >
                <Route path=":id" element={<ContentForm />} />
                <Route path=":id/readonly" element={<ContentForm />} />
              </Route>

              <Route path="/mantenimiento/usuarios" element={<Main><UsuariosList /></Main>} />
              <Route path="/mantenimiento/usuario" element={<Main><UsuariosForm /></Main>} />
              <Route path="/mantenimiento/usuario/edit/:id" element={<Main><UsuariosForm /></Main>} />

              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/" element={<SignIn />} />
              <Route
                path="*"
                element={
                  <Main>
                    <NotFount404 />
                  </Main>
                }
              />
            </Routes>
          </HashRouter>
        </ParameterContext.Provider>
      </UserContext.Provider>
    </>
  );
}


