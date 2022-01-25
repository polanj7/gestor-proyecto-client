import React, { useState } from 'react';
import { getToken } from '../../services/auth'
import { setAccessToken, getAccessToken } from '../../services/accessToken';
import { Link } from "react-router-dom";


export default function Login() {
    
 const callTokens = () =>{
    getToken('jortiz', '123456789').then(resp =>{        
        /*save data in local storage*/
        setAccessToken(resp);     
    });
 }

  return (
    <>
        <button className='btn btn-warning' onClick={() => { callTokens() }}>
            Get Token
        </button>       

   
    </>  
  );
}

