import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import UserImage from "./UserImage";
import {Close} from "@material-ui/icons";
import {useTranslation} from "react-i18next";
import { Postmessage} from "../api/apiCalls";
import {useAoiProgess} from "../shared/ApiProges";
import Buttonproges from "./buttonproges";


const Message = () => {
    const {image} =useSelector((store)=>({
        image : store.image
    }));
    const [focus,setFocus]=useState(false);
    const {t}=useTranslation();
    const [bird,setBird] =useState("");
    const [error,setError] =useState();


    const postBird = async ()=>{
        const body={
            content:bird
        }
        try{
            await Postmessage(body);
        }
        catch (err){
            setError(err.response.data.validateexception.content);
        }

    }
    const pendingApiCall = useAoiProgess("post","/message")

    return (
        <div className={"card p-1 flex-row"}>
            <UserImage image={image}
                       width={"32"} height={"32"}
                       className={"rounded-circle mr-1"}

            ></UserImage>
           <div className={"flex-fill"}>
               <textarea  value={bird}
                          className={error?"form-control is-invalid":"form-control"}
                          rows={focus?"3":"1"}
                           onFocus={()=>setFocus(true)}
                          onChange={(event)=>{
                              setBird(event.target.value)
                              setError(undefined);
                          }}
               />
                {focus&&<div className={"text-right mt-1"}>
                   <Buttonproges
                       text={t("Send")}
                       onClick={postBird}

                       pendingApiCall={pendingApiCall}
                       disabled={pendingApiCall}/>

                   <button className={"btn btn-light  d-inline-flex ml-1"}
                           onClick={()=>{
                               setFocus(false);
                               setBird("");
                               setError(undefined)
                           }}>
                       <Close></Close>
                       {t("Cancel")}
                   </button>
               </div>}
               {error && <div className="alert alert-danger">{error}</div>}

            </div>


            </div>

    );
};

export default Message;