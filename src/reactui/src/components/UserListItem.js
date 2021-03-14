import React, {Component} from 'react';
import Picture from "../9.1 profile.png"
import {Link} from "react-router-dom";
import UserImage from "./UserImage";
const UserListItem=(props)=> {
        const {user}=props


        return (

                <Link to={`/user/${user.userName}`} className={"list-group-item list-group-item-action"}>
                <UserImage className={"rounded-circle"}
                           width="32" height="32"
                           alt={`${user.userName} profile`}
                           image={user.image}/>
                <span className={"pl-2"}>
                {user.userName}

                </span>
                </Link>

        );

}

export default UserListItem;