import React, {Component} from 'react';
import  logo from "../logo/sosyaltema.png"
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { useDispatch,useSelector } from 'react-redux';
import {logoutSuccess} from "../redux/AuthActions";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";

//import {Auth} from "../shared/AuthContext";
const TopBar =props =>{
   // static contextType=Auth;


    const {t}=useTranslation();
    const {isLoggedIn,userName}=useSelector(store=>({

            isLoggedIn:store.isLoggedIn,
            userName:store.userName

    }));
        const dispatch = useDispatch();

        const onLogoutSuccess = () => {
            dispatch(logoutSuccess());
        };




                    let links =(
                        <ul className="navbar-nav ml-auto">
                            <li>
                                <Link className="nav-link" to="/login">
                                    {t('Login')}
                                </Link>
                            </li>
                            <li>
                                <Link className="nav-link" to="/signup"> {t('Sign Up')} </Link>
                            </li>
                        </ul>
                    );
                    if(isLoggedIn){
                        links=(     <ul className="navbar-nav ml-auto">
                                <li>
                                    <Link className="nav-link" to={`/user/${userName}`}>
                                        {userName}
                                    </Link>
                                </li>
                                <li className="nav-link"   onClick ={onLogoutSuccess} style={{cursor:"pointer"}} >
                                    {t('Logout')}
                                </li>
                            </ul>
                        );}
                    return (
                        <div className="shadow-sm bg-light mb-2">
                            <nav className="navbar navbar-light container navbar-expand">
                                <Link className="navbar-brand" to="/">
                                    <img src={logo} width="60" alt="logo"/> CamgözSosyal

                                </Link>
                                {links}
                            </nav>

                        </div>

                    );






}


;

export default (TopBar);