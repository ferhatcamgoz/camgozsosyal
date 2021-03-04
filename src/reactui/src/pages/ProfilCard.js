import React, {Component} from 'react';
import  {withRouter} from 'react-router-dom';
import {Auth} from "../shared/AuthContext";
import {connect} from "react-redux";
const  ProfilCard = props=> {
    const pathUserName = props.match.params.username;
    const loggedInUserName = props.store.userName;


    let message = "We cannot edit";
    if (pathUserName == loggedInUserName) {
        message = "we can edit";
    }
    return <div>{message}</div>;

}


const mapStateToProps = store => {
    return {
        store
    };
};





export default connect(mapStateToProps)(withRouter(ProfilCard));