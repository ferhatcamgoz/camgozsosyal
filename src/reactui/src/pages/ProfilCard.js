import React, { useEffect, useState} from 'react';
import { useParams} from 'react-router-dom';

import {useDispatch, useSelector} from "react-redux";

import UserImage from "../components/UserImage";
import EditIcon from '@material-ui/icons/Edit';
import {useTranslation} from "react-i18next";
import Input from "../components/Input";
import {Close, Save} from "@material-ui/icons";
import {updateUser} from "../api/apiCalls";
import {useAoiProgess} from "../shared/ApiProges";
import Buttonproges from "../components/buttonproges";
import {updateUserRedux} from "../redux/AuthActions";


const  ProfilCard = props=> {
    const [edit,setEdit]=useState(false);

    const [updateDispaly,setUpdateDisplay]=useState();
    const routeParams =useParams();
    const [user,setUser]=useState({});
    const [newimage,setNewImage]=useState();
    const [validationError,setValidationError]=useState();
    const dispatch = useDispatch();
    const {loggedInUserName} =useSelector((store)=>({
        loggedInUserName : store.userName
    }));
    const [editable,setEditable]=useState(false);
    useEffect(()=>{
        setEditable(loggedInUserName==routeParams.username)
    },[loggedInUserName,routeParams.username])
    useEffect(()=>{
        setUser(props.user)
    },[props.user])

    useEffect(()=>{
        setValidationError((prevValide)=>({
            ...prevValide,
            nickName:undefined
        }))

    },[updateDispaly])


    //const {user}=props;
    const {t}=useTranslation();
    const {userName,nickName,image}=user;
    console.log(user)

    useEffect(()=>{
        if(!edit){
            setUpdateDisplay(undefined)
            setNewImage(undefined)

        }
        else {
            setUpdateDisplay(nickName);
        }
        },[edit,nickName])
    const onclickSave= async ()=>{
        let image;
        if(newimage){
            image=newimage.split(',')[1]
        }
        const body={
            nickName:updateDispaly,
            image
        }
        try {
          const response =  await updateUser(userName,body);
            setEdit(false);
            setUser(response.data)
            dispatch(updateUserRedux(response.data));
        }
        catch (err){
        setValidationError(err.response.data.validateexception)
        }

        console.log(updateDispaly)
    }

const pendingApiCall =useAoiProgess("put",`/users/${userName}`)


const onChangeFile=(event)=>{
        if(event.target.files.length<1){
            return;
        }
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload=()=>{
        setNewImage(fileReader.result)

    }
    fileReader.readAsDataURL(file);

    setValidationError((prevValide)=>({
        ...prevValide,
        image:undefined
    }))
}
    return(
        <div className={"card text-center"}>
            <div className={"card-header"}>
                <UserImage className={"rounded-circle shadow "}
                           width="200" height="200"
                           alt={`${userName} profile`}
                           image={user.image}
                           tempimage={newimage}


                />

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

                        <Input label={"NickName Değiştir"}
                               defaultValue={nickName}
                               onChange={(even)=>{setUpdateDisplay(even.target.value)}}
                               error={validationError.nickName}
                        ></Input>
                        <Input type="file" error={validationError.image} onChange={onChangeFile}/>
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