import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Index from './components/projects/Index';
import Edit from './components/projects/Edit';
import NotFount404 from './components/NotFount404';
import Delete from './components/projects/Delete';

import Aside from './components/Aside';
import Content from './components/Content';
import Header from './components/Header';

import {
  BrowserRouter,
  Routes,
  Route
   
} from "react-router-dom";

ReactDOM.render(
  <>
  <h1>Hola nundio</h1>


    <BrowserRouter>
    
      <Header />
      <Aside />
      <Content>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="project" element={<Index />} />
            <Route path="project/new" element={<Edit />} />
            <Route path="project/edit/:id" element={<Edit />} />
            <Route path="project/delete/:id" element={<Delete />} />  
            <Route path="*" element={<NotFount404 />} />

          {/* <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="teams" element={<Teams />}>
            <Route path=":teamId" element={<Team />} />
            <Route path="new" element={<NewTeamForm />} />
            <Route index element={<LeagueStandings />} />
            </Route>
          </Route> */}
        </Routes>
      </Content>

     
    </BrowserRouter>
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
