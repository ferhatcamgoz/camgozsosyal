import React, {Component, useEffect, useRef, useState} from 'react';
import  logo from "../logo/sosyaltema.png"
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { useDispatch,useSelector } from 'react-redux';
import {logoutSuccess} from "../redux/AuthActions";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import UserImage from "./UserImage";

//import {Auth} from "../shared/AuthContext";
const TopBar =props =>{
   // static contextType=Auth;


    const {t}=useTranslation();
    const {isLoggedIn,userName,image}=useSelector(store=>({

            isLoggedIn:store.isLoggedIn,
            userName:store.userName,
            image:store.image

    }));

        const menuArea = useRef(null);

        const [menuVisible, setMenuVisible] = useState(false);
        useEffect(() => {
            document.addEventListener('click', menuClickTracker);
            return () => {
                document.removeEventListener('click', menuClickTracker);
            };
        }, [isLoggedIn]);
        const menuClickTracker = event => {
            if (menuArea.current === null || !menuArea.current.contains(event.target)) {
                setMenuVisible(false);
            }
        };
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
                        let dropDownClass = 'dropdown-menu p-0 shadow';
                        if (menuVisible) {
                            dropDownClass += ' show';
                        }

                        links=(
                            <ul className="navbar-nav ml-auto" ref={menuArea}>
                                <li className="nav-item dropdown">
                                    <div className="d-flex"  style={{ cursor: 'pointer' }} onClick={() => setMenuVisible(true)}>
                                        <UserImage image={image} width="32" height="32" className="rounded-circle m-auto" />
                                        <span className="nav-link dropdown-toggle">{userName}</span>
                                    </div>
                                    <div className={dropDownClass}>
                                        <Link  className="dropdown-item d-flex p-2"  onClick={() => setMenuVisible(false)} to={`/user/${userName}`}>
                                            <i className="material-icons text-info mr-2">person</i>
                                            {userName}
                                        </Link>
                                        <span  className="dropdown-item  d-flex p-2"   onClick ={onLogoutSuccess} style={{cursor:"pointer"}} >
                                            <i className="material-icons text-danger mr-2">power_settings_new</i>
                                            {t('Logout')}
                                        </span >
                                    </div>

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