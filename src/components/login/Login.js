import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'

import { getToken } from '../../services/auth'
import { setAccessToken, deleteToken, verifity } from '../../services/accessToken';



export default function Login() {

  const[isLogin, SetIsLogin] = useState(false);
  const navigate = useNavigate();
    
  const singin = () =>{
      getToken('jortiz', '123456789').then(resp =>{
          setAccessToken(resp);
          SetIsLogin(true);
      });
  }

  const logout = () =>{        
    deleteToken();    

    SetIsLogin(false);
  }

  useEffect(() => {
    let verifitys = verifity();
    SetIsLogin(verifitys);  
  }, [isLogin]);


  // if(!isLogin){
  //   navigate('login', { replace: true });
  // }


  return (
    <>
    {!isLogin ? 
        <span className='btn btn-sm btn-primary' onClick={() => { singin() }}>
            Sing In
        </span>   
        :
        <button className='btn btn-sm btn-danger' onClick={() => { logout() }}>
            Log Out
        </button>
      } 

      {isLogin ?  <p><span className="fa fa-circle" style={{ color: "green"}}> </span> Online</p>:  <p><span className="fa fa-circle" style={{ color: "red"}}> </span> Offline</p>}
       
    </>  
  );
}

