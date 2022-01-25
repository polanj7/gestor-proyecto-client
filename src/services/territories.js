import axios from "axios";

const API_URL = `https://netzer.somee.com/api`;
const accesToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiTWFydGluIEdyYXRlcmVhdXgiLCJVc2VyIjoibWdyYXRlcmVhdXgiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhZG9yIiwibmJmIjoxNjQzMDUxNDgzLCJleHAiOjE2NDMwNTUwODMsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzEwLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzEwLyJ9.-K4H8hRjupfSf-StIgjjIDC5lnq-sFs1_zRfFP4_C0s`;


axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${accesToken}`
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


export const getBarrios= async () => {
   const data = await axios.get(`${API_URL}/Barrios`);
   return data;
} 

export const getMunicipios= async () => {
    const data = await axios.get(`${API_URL}/Municipios`);
    return data;
 } 

 export const getProvincias= async () => {
    const data = await axios.get(`${API_URL}/Provincias`);
    return data;
 } 
