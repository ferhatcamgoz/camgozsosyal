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

export const Postmessage =(body)=>{
    return axios.post(`/message`,body);
}
export const getmessage =(username,number=0)=>{
   const path =username? `/user/${username}/message?page=`:"/message?page="
    return axios.get(path+number);
}

export const getOldMessage =(id)=>{

    return axios.get(`/message/${id}`);
}


export const getNewMessageCount =(id,username)=>{
    const path =username? `/user/${username}/message/${id}?count=true`:`/message/${id}?count=true`
    return axios.get(path);
}




export const getNewMessages =id=>{
    return axios.get(`/message/${id}?direction=after`)
}

export const postMessageFile =file=>{
    return axios.post("/message-file",file);
}