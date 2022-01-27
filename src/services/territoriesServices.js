import { get } from '../repositories/axiosRepository';


export const getBarrios= async (idMunicipio) => {
   const data = await get(`Barrios?idMunicipio=${idMunicipio}`);
   return data;
} 

export const getMunicipios= async (idProvincia) => {
    const data = await get(`Municipios?idProvincia=${idProvincia}`);
    return data;
} 

 export const getProvincias= async () => {
    const data = await get(`Provincias`);
    return data;
 } 