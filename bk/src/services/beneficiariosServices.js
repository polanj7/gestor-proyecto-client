import { get, post, remove } from '../repositories/axiosRepository';


export const getBeneficiarios = async () => {
    const resp = await get(`Beneficiarios`);
    return resp;
 }