import { get, post, uploadFile, downloadFiles } from '../repositories/axiosRepository';

export const getFiles= async (id) => {
   const data = await get(`Documentos/${id}`);
   return data;
} 

 export const addFiles= async (files) => {
    const data = await uploadFile(files);
    return data;
 }

 export const downloadFile= async (file) => {
   const data = await downloadFiles(file);
   return data;
} 