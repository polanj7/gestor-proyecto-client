import React, { useEffect, useState } from 'react';
import Index from './projects/Index';
import Edit from './projects/Edit';
import SelectEstados from './controls/SelectEstados'
import {getEstados} from '../services/estados'
import Login from './login/Login.js';
import NotFount404 from './NotFount404';
import Delete from './projects/Delete';

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet 
} from "react-router-dom";

export default function Content() {

  return (
    <div className='content-wrapper'>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={< Index />} />
          <Route path="/project" element={<Index />} />         
          <Route path="/project/new" element={<Edit />} />         
          <Route path="/project/edit/:id" element={<Edit />} />         
          <Route path="/project/delete/:id" element={<Delete />} />         
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
        </BrowserRouter>   
        
        <Outlet />           
    </div>
  )
}
