import { get } from '../repositories/axiosRepository';


export const getBarrios= async (idMunicipio) => {
   const data = await get(`Barrios?idMunicipio=${idMunicipio}`);
   return data;
} 

export const getMunicipality= async (idProvincia) => {
    const data = await get(`Municipios?idProvincia=${idProvincia}`);
    return data;
} 

 export const getProvince= async () => {
    const data = await get(`Provincias`);
    return data;
 } 