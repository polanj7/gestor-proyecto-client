import React, {useState, useMemo} from 'react';

import NotFount404 from './components/NotFount404';
import Index from './components/projects/Index';
import Edit from './components/projects/Edit';
import Delete from './components/projects/Delete';
import ProjectForm from './components/projects/ProjectForm';
import ContentForm from './components/projects/ContentForm';
import BudgetForm from './components/projects/BudgetForm';
import TaksForm from './components/projects/TaksForm';
import FileForm from './components/projects/FileForm';

import SignIn from './components/login/Signin';
import Main from './components/main/Main';
import Dashboard from './components/Dashboard';
import {getUserCookies, getUserProfileCookies} from './services/auth'

import {
  BrowserRouter,
  Routes,
  Route   
} from "react-router-dom";

//context
import { UserContext } from './context/UserContext';
import { ParameterContext } from './context/ParameterContext'



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

  return (
    <>
      <UserContext.Provider value={providerUser}>
        <ParameterContext.Provider value={providerParameter}>
          <BrowserRouter>
            <Routes>
              <Route
                path="project"
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

              <Route path="sign-in" element={<SignIn />} />
              <Route path="Dashboard" element={<Dashboard />} />
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
          </BrowserRouter>
        </ParameterContext.Provider>
      </UserContext.Provider>
    </>
  );
}


