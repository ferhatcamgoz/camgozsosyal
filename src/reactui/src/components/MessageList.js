import React, {useEffect, useState} from 'react';
import { getmessage, getNewMessageCount, getNewMessages, getOldMessage} from "../api/apiCalls";
import {useTranslation} from "react-i18next";
import {useAoiProgess} from "../shared/ApiProges";
import Spinner from "./Spinner";
import UserImage from "./UserImage";
import {Link, useParams} from "react-router-dom";
import {format} from "timeago.js";

const MessageList = () => {

    const [messages,setMessages]=useState({content:[],last:true,number:0});
    const [newMessageCount,setNewMessageCount] = useState(0);
    const {t,i18n} = useTranslation();

    const {username}=useParams();
    const path = username? `/user/${username}/message?page=`:"/message?page="
    const initialProgess =useAoiProgess("get",path);
    let looper;
    let loadId=0;
    let firstId=0;
    if(messages.content.length>0){
        firstId= messages.content[0].id
        const lastIndex =messages.content.length-1;
        loadId=messages.content[lastIndex].id;

    }
    const loadMessage =useAoiProgess("get",`/message/${loadId}`,true);
    const loadNewMessage =useAoiProgess("get",`/message/${firstId}?direction=after`,true);

    useEffect(()=>{
        const getCount =async ()=>{
            const response =await  getNewMessageCount(firstId,username);
            setNewMessageCount(response.data.count);
        }
         looper=setInterval(()=>{

                 getCount()


        },5000)

        return function (){
            clearInterval(looper)
        }

    },[firstId,username])

    useEffect(()=>{

        loadMessages();
    },[username])
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
    const loadOldMessage = async ()=>{
        const lastIndex =messages.content.length-1;
        const loadId=messages.content[lastIndex].id;

        const response=  await getOldMessage(loadId,username);

        setMessages(previousMessage=>({
            ...response.data,
            content:[...previousMessage.content,...response.data.content]
        }))

    }
    const loadNewMessages=async ()=>{

        const response = await  getNewMessages( messages.content[0].id);
        setMessages(previousMessage=>({
            ...previousMessage,
            content:[...response.data,...previousMessage.content]
        }))
        setNewMessageCount(0);




    }

    const {content,last,number}=messages;



    if(messages.content.length==0){
        return <div className={"alert alert-info text-center"}> {initialProgess?<Spinner/>: t("There is not message")}</div>
    }
    return (
        <div>
            {newMessageCount>0&&(
                <div className={"alert alert-secondary text-center"} style={{cursor:loadNewMessage?"not-allowed":"pointer"}}   onClick={()=>loadNewMessages()}>
            {loadNewMessage?<Spinner></Spinner>:"Load"}
                </div>
            )}
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
                        {mesaj.fileAttactment&&(
                            <div className={"pl-5"}>

                                {mesaj.fileAttactment.fileType.startsWith("image")&&(
                                    <img className={"img-fluid"} src={"images/attachments/"+ mesaj.fileAttactment.name}/>

                                )}
                                {!mesaj.fileAttactment.fileType.startsWith("image")&&(
                                    <strong>Message eklentisi desteklenmiyor</strong>
                                )}
                                    </div>
                        )}
                    </div>
                )
            })}
            {!last&&<div className={"alert alert-secondary text-center"} style={{cursor:loadMessage?"not-allowed":"pointer"}}   onClick={()=>loadOldMessage()}>
                {loadMessage?<Spinner></Spinner>:"Load"}
            </div>}

        </div>
    );
};

export default MessageList;