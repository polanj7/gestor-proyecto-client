import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import NotFount404 from './components/NotFount404';
import Index from './components/projects/Index';
import Edit from './components/projects/Edit';
import Delete from './components/projects/Delete';
import ProjectForm from './components/projects/ProjectForm';
import ContentForm from './components/projects/ContentForm';
import BudgetForm from './components/projects/BudgetForm';

import Login from './components/login/Login';
import Main from './components/main/Main';


import {
  BrowserRouter,
  Routes,
  Route,
  Outlet 
} from "react-router-dom";


ReactDOM.render(
  <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Main> <App /> </Main>} />     
          <Route path="project" element={<Main> <Index /> </Main> } >            
            <Route path="new" element={<Edit />} />
            <Route path="edit/:id" element={<Edit />} />
            <Route path="delete/:id" element={<Delete />} />  
          </Route>
          <Route path="/project/new2" element={ <Main> <ContentForm /> </Main>} >
            <Route path="f-1" element={<ProjectForm />} />   
            <Route path="f-2" element={<BudgetForm />} />   
          </Route> 
           
          <Route path="login" element={<Login />} />         
          <Route path="*" element={<Main> <NotFount404 /> </Main>} />    
                
        </Routes>
      
    </BrowserRouter>
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
