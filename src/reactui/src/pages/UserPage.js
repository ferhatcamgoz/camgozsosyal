import React,{useState,useEffect} from 'react';
import ProfilCard from "./ProfilCard";
import {getUser} from "../api/apiCalls";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";

import {useAoiProgess} from "../shared/ApiProges";
import Spinner from "../components/Spinner";
import MessageList from "../components/MessageList";

const UserPage = (props) => {
    const [user,setUser]=useState({});
    const [notFount,setNotFound]=useState(false);
    const {username}=useParams();
    const pendingApiCall = useAoiProgess("get","/users/"+username,true)
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
    if(pendingApiCall||user.userName!=username){
        return (
          <Spinner></Spinner>
        )
    }

    return (
        <div className="container">
            <div className={"row"}>
                <div className={"col"}>
                    <ProfilCard user={user}></ProfilCard>

                </div>
                <div className={"col"}>

                    <MessageList ></MessageList>
                </div>

            </div>

               </div>
    );
};

export default UserPage;