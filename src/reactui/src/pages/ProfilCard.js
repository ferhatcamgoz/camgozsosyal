import React, {Component} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Auth} from "../shared/AuthContext";
import { useSelector} from "react-redux";
import Picture from "../9.1 profile.png";
import UserImage from "../components/UserImage";


const  ProfilCard = props=> {

    const routeParams =useParams();
    const {user}=props;
    console.log(user)
    const {loggedInUserName} =useSelector((store)=>({
        loggedInUserName : store.userName
    }));

    const {userName,nickName,image}=user;

    return(
        <div className={"card text-center"}>
            <div className={"card-header"}>
                <UserImage className={"rounded-circle shadow "}
                           width="200" height="200"
                           alt={`${userName} profile`}
                           image={user.image}/>

            </div>
            <div className={"card-body "}>
            <h3>{userName}</h3>

            </div>
        </div>
        )

}


export default (ProfilCard);