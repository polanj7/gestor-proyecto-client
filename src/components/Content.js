import React, { useEffect, useState } from 'react';
import Index from './projects/Index';
import Edit from './projects/Edit';
import SelectEstados from '../components/controls/SelectEstados'
import {getEstados} from '../services/estados'
import Login from './login/Login.js';
import { getAccessToken } from '../services/accessToken'




import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

 


export default function Content() {

  const [estados, setEstados] = useState([]);

  useEffect(() =>{
    
    if(!!getAccessToken){    
        getEstados().then(x => {     
        setEstados(x.data);
      }); 
    }
  
  }, []); 

  return (
    <div className='content-wrapper'>

      <Login />    

      <BrowserRouter>
          <Routes>
          <Route path="/" element={<h1>Hola</h1>} />
          <Route path="/project" element={<Index />} />         
          <Route path="/project/new" element={<Edit />} />         
          <Route path="/project/edit/:id" element={<Edit />} />         
        
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


            
        {/* <SelectEstados Estados = {estados} /> */}
        {/* <Index /> */}
    </div>
  )
}
