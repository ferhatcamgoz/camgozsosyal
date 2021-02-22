import axios from 'axios';

export var kayit= (body)=>{
   return axios.post("/kayit",body);
} 
export const changeLanguage= languange =>{
   axios.defaults.headers['accept-language']=languange;
}
export const login = creds => {
   
      return axios.post("/auth", {},{auth:creds});
   
  
}