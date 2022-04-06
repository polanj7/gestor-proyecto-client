import { get } from "../repositories/axiosRepository";

// export const getBarrios= async (idMunicipio) => {
//    const data = await get(`Barrios?idMunicipio=${idMunicipio}`);
//    return data;
// }

// export const getMunicipality= async (ids) => {

//    let newIds = []

//    for(let i = 0; i < ids.length; i++){
//       newIds.push(`nombres=${ids[i]}`)
//    }

//    let url = `Territorios?${newIds.join('&')}`
//    const data = await get(url);
//     return data;
// }

export const getProvincias = async () => {
  const data = await get(`Provincias`);
  return data;
};

export const getMunicipios = async (idsProvincia) => {
   let newIds = []

   newIds.push("idsProvincia=3")

   for(let i = 0; i < idsProvincia.length; i++){
      newIds.push(`idsProvincia=${idsProvincia[i]}`)
   }

  let url = `Municipios?${newIds.join('&')}`;
  const data = await get(url);
  return data;
};

export const getDistritos = async (IdMunicipio) => {
  let url = `DistritosMunicipales?idsMunicipio=${1}`;
  const data = await get(url);
  return data;
};

export const getSecciones = async (IdDistrito) => {
  let url = `Secciones?idsDistrito=${1}`;
  const data = await get(url);
  return data;
};

export const getBarrios = async (IdSeccion) => {
  let url = `Barrios?idsSeccion=${1}`;
  const data = await get(url);
  return data;
};
