import React,{useState,useEffect} from 'react';
import ProfilCard from "./ProfilCard";
import {getUser} from "../api/apiCalls";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import Picture from "../9.1 profile.png";
import {useAoiProgess} from "../shared/ApiProges";
import Spinner from "../components/Spinner";

const UserPage = (props) => {
    const [user,setUser]=useState({});
    const [notFount,setNotFound]=useState(false);
    const {username}=useParams();
    const pendingApiCall = useAoiProgess("/users/"+username)
    const {t} =useTranslation();
    useEffect(()=>{
        loadUser();
    },[username])
    const loadUser =async ()=>{
        try{
            setNotFound(false);
            const response=  await getUser(username);

            setUser(response.data)
       }
        catch (err){
            setNotFound(true);
        }
     }
    if(pendingApiCall){
        return (
          <Spinner></Spinner>
        )
    }
     if(notFount){
         return (
             <div className={"container"}>
                 <div className={"alert alert-danger text-center" }>
                     <div>
                         <span className="material-icons" style={{fontSize:"40px"}}>
error
</span>
                     </div>
                     {t("UserNotFOUNT")}
                 </div>
             </div>

         )
     }
    return (
        <div className="container">
        <ProfilCard user={user}></ProfilCard>
        </div>
    );
};

export default UserPage;