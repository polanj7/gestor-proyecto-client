import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom'

import Aside from '../Aside';
import Content from '../Content';
import Header from '../Header';

import { verifity } from '../../services/accessToken';
import { UserContext } from '../../context/UserContext';


export default function Main({children}) {

    const[isLogin, SetIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let verifitys = verifity();
        SetIsLogin(verifitys);
    }, [isLogin]);

    if(!isLogin){
        navigate('sign-in', { replace: true });
    }

    return (
      <>
        <Header />
        <Aside />
        <Content>{children}</Content>

        {/* <Footer />      */}
      </>
    );
}





