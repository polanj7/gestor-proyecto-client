import { get, post, remove } from '../repositories/axiosRepository';


export const getBeneficiarios = async () => {
    const resp = await get(`Beneficiarios`);
    return resp;
 }

 export const getTipoBeneficiarios = async () => {
   const resp = await get(`TipoBeneficiario`);
   return resp;
}
 //RangoBeneficiarios

 export const getRangeBeneficiarios = async () => {
    const resp = await get(`RangoBeneficiarios`);
    return resp;
 }