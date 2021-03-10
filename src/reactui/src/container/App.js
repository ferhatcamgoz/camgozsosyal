import  React from 'react';

import Usercreate from "../pages/Usercreate";
import Language from "../components/Language";
import UserLogin from "../pages/UserLogin";
import UserPage from "../pages/UserPage";
import {HashRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import HomePage from "../pages/HomePage";
import TopBar from "../components/TopBar";
import {Auth} from "../shared/AuthContext";
import {connect, useSelector} from "react-redux";
import {logoutSuccess} from "../redux/AuthActions";


const App = (props)=> {
 //   static contextType=Auth;

    const {isLoggedIn}=useSelector((store)=>({
    isLoggedIn:store.isLoggedIn
}))




      return (
          <div>
              <Router>
                  <TopBar/>
                  <Switch>
                      <Route exact path="/" component={HomePage}/>
                      {!isLoggedIn  && (<Route path="/login" component={UserLogin} />)}
                      <Route path="/signup" component={Usercreate}/>
                      <Route path="/user/:username" component={UserPage}/>
                      <Redirect to="/"/>
                  </Switch>
              </Router>
              <Language/>
          </div>
      );


}


export default (App);