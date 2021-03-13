import React, {Component} from 'react';
import Picture from "../9.1 profile.png"
import {Link} from "react-router-dom";
const UserListItem=(props)=> {
        const {user}=props
        let imageSource=Picture;
    if(user.image){
            imageSource=user.image;
        }

        return (

                <Link to={`/user/${user.userName}`} className={"list-group-item list-group-item-action"}>
                <img className={"rounded-circle"} width="32" height="32" alt={`${user.userName} profile`} src={imageSource}/>
                <span className={"pl-2"}>
                {user.userName}

                </span>
                </Link>

        );

}

export default UserListItem;