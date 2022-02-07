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
import { UserContext } from './context/UserContext';



export default function App() {

  getUserProfileCookies();
  let userName = getUserCookies();
  const [user, setUser] = useState(userName);
  const providerUser = useMemo(() => ({user, setUser}), [user, setUser]);

  return (
    <>
      <UserContext.Provider value={providerUser}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Main>
                  <Index />
                </Main>
              }
            />
            <Route
              path="project"
              element={
                <Main>
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
            </Route>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="Dashboard" element={<Dashboard />} />
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
      </UserContext.Provider>
    </>
  );
}


