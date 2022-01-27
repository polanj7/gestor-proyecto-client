import { singin } from '../repositories/axiosRepository'


export const getToken = async (user, pass) => {
    const token  = await singin(`Token`, {
        usuario: user,
        clave: pass
    });

    return token.token;
}
