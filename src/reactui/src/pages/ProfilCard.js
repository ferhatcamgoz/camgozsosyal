import React, {Component} from 'react';
import  {useParams} from 'react-router-dom';
import {Auth} from "../shared/AuthContext";
import { useSelector} from "react-redux";
const  ProfilCard = props=> {

    const routeParams =useParams();
    const {loggedInUserName} =useSelector((store)=>({
        loggedInUserName : store.userName
    }));
    let message = "We cannot edit";
    if (routeParams.username == loggedInUserName) {
        message = "we can edit";
    }
    return <div>{message}</div>;
}


export default (ProfilCard);