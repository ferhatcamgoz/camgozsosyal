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
export const getUsers=(page=0,size=3)=>{
    return axios.get(`/users?page=${page}&size=${size}`)
}
export  const setAutho =({userName,password, isLoggedIn})=>{
    if(isLoggedIn){
        const authvalue=`Basic ${btoa (userName+':'+password)}`
        axios.defaults.headers["Authorization"]=authvalue;
    }
    else {
        delete axios.defaults.headers["Authorization"];
    }
}
export const getUser =userName=>{
return axios.get(`/users/${userName}`);
}
export const updateUser =(userName,body)=>{
    return axios.put(`/users/${userName}`,body);
}
