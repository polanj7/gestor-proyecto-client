import { get } from '../repositories/axiosRepository';


export const getBarrios= async (idMunicipio) => {
   const data = await get(`Barrios?idMunicipio=${idMunicipio}`);
   return data;
} 

export const getMunicipality= async (ids) => {

   let newIds = []

   for(let i = 0; i < ids.length; i++){
      newIds.push(`nombres=${ids[i]}`)
   }

   let url = `Territorios?${newIds.join('&')}`
   const data = await get(url);  
    return data;
} 

 export const getProvince= async () => {
    const data = await get(`Provincias`);
    return data;
 } 