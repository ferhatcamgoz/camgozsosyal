import axios from 'axios';
import React,{useState,useEffect} from 'react';
import Input from "../components/Input";
import { withTranslation } from 'react-i18next';
import {useTranslation} from "react-i18next";
import {useAoiProgess, withApiProgess} from '../shared/ApiProges';
import {Auth} from "../shared/AuthContext";
import {login} from "../api/apiCalls";
import  Buttonproges from "../components/buttonproges";
import {connect} from "react-redux";
import  {useDispatch} from "react-redux";
import {loginHandler, loginSuccess} from "../redux/AuthActions";


const UserLogin=(props) =>{

  const [username,setusername] = useState();
  const [password,setpassword] = useState();
    const [error,seterror] = useState();
    const  dispatch =useDispatch();
    useEffect(()=>{
        seterror(undefined)
     },[username,password])

    const   onclick = async event =>{
        event.preventDefault();
        const creds ={
            username,
            password
        }

        const {history } = props;
        const {push} =history;
        try {
          await  dispatch(loginHandler(creds));
            push("/");
        }
        catch (errors){
            seterror(errors.response.data.message);
        }

    }
        const {t} = useTranslation();
        const pandingApiCall=useAoiProgess("/auth")

        const buttonEnabled = username && password;
        return(
            <div className="container">
                <form>
                    <h1 className="text-center">{t("Logins")}</h1>
                    <Input name ="userName" label= {t("Username")} type="text"  onChange={(event)=> setusername( event.target.value)} />
                    <Input name ="password" label= {t("Password")}  type="password" onChange={(event) => setpassword(event.target.value)}  />
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="text-center">
                        <Buttonproges
                            onClick={onclick}
                            disabled={!buttonEnabled|| pandingApiCall}
                            pendingApiCall={pandingApiCall}
                            text={t("Login")}
                        />



                    </div>

                </form>
            </div>
        );


}



export default  UserLogin;


