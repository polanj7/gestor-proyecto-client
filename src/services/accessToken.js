
export const setAccessToken = (token) => { 
    localStorage.setItem('accessToken', token);
}

export const getAccessToken = () => { 
    return localStorage.getItem('accessToken');
}

export const deleteToken = () => { 
    return localStorage.removeItem('accessToken');
}

export const verifity = () =>{
    return getAccessToken();
}