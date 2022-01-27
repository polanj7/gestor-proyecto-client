import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

import Aside from '../Aside';
import Content from '../Content';
import Header from '../Header';
import Login from '../login/Login';

import { setAccessToken, deleteToken, verifity } from '../../services/accessToken';


export default function Main({children}) {

    const[isLogin, SetIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let verifitys = verifity();
        SetIsLogin(verifitys);
    }, [isLogin]);

    if(!isLogin){
        navigate('login', { replace: true });
    }

    return (
        <>
        <Header />
        <Aside />
        <Content>
            {children}
        </Content>
        {/* <Footer />      */}
        </>
    );
}





