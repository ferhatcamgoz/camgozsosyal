import React, {useEffect, useState} from 'react';
import {getmessage} from "../api/apiCalls";
import {useTranslation} from "react-i18next";
import {useAoiProgess} from "../shared/ApiProges";
import Spinner from "./Spinner";

const MessageList = () => {

    const [messages,setMessages]=useState({content:[],last:true,number:0});
    const {t} = useTranslation();
    const pendingApiCall =useAoiProgess("get","/message");

    useEffect(()=>{

        loadMessages();
    },[])
    const loadMessages =async (number)=>{
        try{
            const response = await getmessage(number);
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
                return <div className={"card p-1"} key={mesaj.id}>{mesaj.content}</div>
            })}
            {!last&&<div className={"alert alert-secondary text-center"} onClick={()=>loadMessages(number+1)}>
                {pendingApiCall?<Spinner></Spinner>:"Load"}
            </div>}

        </div>
    );
};

export default MessageList;