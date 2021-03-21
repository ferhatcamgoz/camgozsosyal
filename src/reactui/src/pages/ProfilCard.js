import React, {Component, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Auth} from "../shared/AuthContext";
import { useSelector} from "react-redux";
import Picture from "../9.1 profile.png";
import UserImage from "../components/UserImage";
import EditIcon from '@material-ui/icons/Edit';
import {useTranslation} from "react-i18next";
import Input from "../components/Input";
import {Close, Save} from "@material-ui/icons";
import {updateUser} from "../api/apiCalls";
import {useAoiProgess} from "../shared/ApiProges";
import Buttonproges from "../components/buttonproges";


const  ProfilCard = props=> {
    const [edit,setEdit]=useState(false);
    const [updateDispaly,setUpdateDisplay]=useState();
    const routeParams =useParams();
    const [user,setUser]=useState({});
    useEffect(()=>{
        setUser(props.user)
    },[props.user])
    //const {user}=props;
    const {t}=useTranslation();
    const {userName,nickName,image}=user;
    console.log(user)
    const {loggedInUserName} =useSelector((store)=>({
        loggedInUserName : store.userName
    }));
    useEffect(()=>{
        if(!edit){
            setUpdateDisplay(undefined)

        }
        else {
            setUpdateDisplay(nickName);
        }
        },[edit,nickName])
    const onclickSave= async ()=>{
        const body={
            nickName:updateDispaly
        }
        try {
          const response =  await updateUser(userName,body);
            setEdit(false);
            setUser(response.data)
        }
        catch (err){

        }

        console.log(updateDispaly)
    }

const pendingApiCall =useAoiProgess("put",`/users/${userName}`)
const editable = loggedInUserName==routeParams.username;


    return(
        <div className={"card text-center"}>
            <div className={"card-header"}>
                <UserImage className={"rounded-circle shadow "}
                           width="200" height="200"
                           alt={`${userName} profile`}
                           image={user.image}/>

            </div>
            <div className={"card-body "}>
                {!edit&&
                    <>
            <h3>{userName}</h3>
                        {editable&& <button className={"btn btn-success d-inline-flex"}
                        onClick={()=>setEdit(true)}>
                    <EditIcon>edit</EditIcon>
                    {t("Edit")}
                </button>}
                    </>}
                {edit&&(
                    <div>

                        <Input label={"NickName Değiştir"} defaultValue={nickName} onChange={(even)=>{setUpdateDisplay(even.target.value)}}></Input>
                        <div>
                            <Buttonproges
                                className={"btn btn-success d-inline-flex"}
                                onClick={onclickSave}
                                disabled={pendingApiCall}
                                pendingApiCall={pendingApiCall}
                                text={
                                    <>
                                        <i  className="material-icons">save</i >

                                        {t("Save")}
                                    </>
                                }
                            />

                            <button className={"btn btn-danger  d-inline-flex ml-2"}
                                    onClick={()=>setEdit(false)}
                                    disabled={pendingApiCall}
                                >
                                <Close></Close>
                                {t("Cancel")}
                            </button>

                        </div>
                    </div>
                )}

            </div>
        </div>
        )

}


export default (ProfilCard);