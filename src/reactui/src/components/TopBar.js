import React, {Component} from 'react';
import  logo from "../logo/sosyaltema.png"
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import { connect } from 'react-redux';
import {logoutSuccess} from "../redux/AuthActions";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";

//import {Auth} from "../shared/AuthContext";
class TopBar extends Component {
   // static contextType=Auth;

    render() {
    const { t, logoutSuccess} =this.props;
        const { isLoggedIn,userName}=  this.props.store;


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
                                <li className="nav-link"   onClick ={logoutSuccess} style={{cursor:"pointer"}} >
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






}
const TopBarWithTranslation = withTranslation()(TopBar);

const mapStateToProps = store => {
    return {
       store
    };
};

export default connect(mapStateToProps,{logoutSuccess})(TopBarWithTranslation);