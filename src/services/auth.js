import { singin } from '../repositories/axiosRepository'

import Cookies from 'js-cookie'

export const getToken = async (user, pass) => {
    const token  = await singin(`Login`, {
        usuario: user,
        clave: pass
    });    
    return token.token;
}

export const signIn = async (user, pass) => {
    const resp  = await singin(`Login`, {
        usuario: user,
        clave: pass
    });    
    return resp;
}  


export const getUserCookies =()=>{
    return Cookies.get('userName');
}

export const getUserProfileCookies =()=>{
    let dt = Cookies.get('userProfile');
    console.log(dt)
    return dt;
}