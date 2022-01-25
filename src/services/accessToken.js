
export const setAccessToken = (token) => { 
    localStorage.setItem('accessToken', token)
}

export const getAccessToken = () => { 
    return localStorage.getItem('accessToken')
}

export const verifity = () =>{
    return getAccessToken() ?? false;
}

export const urlApi = 'https://netzer.somee.com/api';
