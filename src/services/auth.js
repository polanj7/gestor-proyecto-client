import {useState} from "react";
import axios from "axios";
import { urlApi } from './accessToken';

const API_URL = urlApi;

export const getToken = async (user, pass) => {
    const token  = await axios.post(`${API_URL}/Token`, {
        usuario: user,
        clave: pass
    });

    return token.data.token;
}
