import React, {useEffect, useState} from 'react';
import {getmessage} from "../api/apiCalls";
import {useTranslation} from "react-i18next";
import {useAoiProgess} from "../shared/ApiProges";
import Spinner from "./Spinner";
import UserImage from "./UserImage";
import {Link, useParams} from "react-router-dom";
import {format} from "timeago.js";

const MessageList = () => {

    const [messages,setMessages]=useState({content:[],last:true,number:0});
    const {t,i18n} = useTranslation();

    const {username}=useParams();
    const path = username? `/user/${username}/message?page=`:"/message?page="
    const pendingApiCall =useAoiProgess("get",path);
    useEffect(()=>{

        loadMessages();
    },[])
    const loadMessages =async (number)=>{
        try{
            const response = await getmessage(username,number);
            setMessages(previousMessage=>({
                ...response.data,
                content:[...previousMessage.content,...response.data.content]
            }))
        }
        catch (err){
        }
    }
    const {content,last,number}=messages;



    if(messages.content.length==0){
        return <div className={"alert alert-info text-center"}> {pendingApiCall?<Spinner/>: t("There is not message")}</div>
    }
    return (
        <div>
            {content.map(mesaj=>{
                const formatt = format(mesaj.date,i18n.language);
                return(
                    <div className={"card p-1"} key={mesaj.id}>
                    <div className={"d-flex"}>
                        <UserImage image={mesaj.userDTO.image} width={"32"} height={"32"} className={"rounded-circle m-1"}/>
                        <div className={"flex-fill m-auto pl-2"}>
                            <Link to={"/user/"+mesaj.userDTO.userName} className={"text-dark"}>
                                <h6>
                                    {mesaj.userDTO.userName}
                                </h6>
                                <span>
                                    {formatt}
                                </span>
                            </Link>
                        </div>


                    </div>
                        <div className={"pl-5"}>{mesaj.content}</div>
                    </div>
                )
            })}
            {!last&&<div className={"alert alert-secondary text-center"}  onClick={()=>loadMessages(number+1)}>

            </div>}

        </div>
    );
};

export default MessageList;