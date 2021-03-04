import axios from 'axios';
import React from 'react';
import Input from "../components/Input";
import { withTranslation } from 'react-i18next';
import { withApiProgess } from '../shared/ApiProges';
import {Auth} from "../shared/AuthContext";
import {login} from "../api/apiCalls";
import  Buttonproges from "../components/buttonproges";
import {connect} from "react-redux";
import {loginSuccess} from "../redux/AuthActions";

class UserLogin extends React.Component{
    //static contextType=Auth;
    state={
        userName:null,
        password:null,
        errors:null

    };
    componentDidMount() {
        axios.interceptors.request.use( request=>{
            this.setState({pendingApiCall:true});
            return request;
        });
        axios.interceptors.response.use( response =>{
            this.setState({pendingApiCall:false});
            return response;
        }, error => {
            this.setState({pendingApiCall:false});
            throw  error;
        });
    }

    onChange = async event=>{
        var {value, name}= event.target;
        this.setState({
            [name]:value,
            errors:null
        });
    }
    onclick = async event =>{
        event.preventDefault();


        this.setState({
            errors:null
        })

        const creds ={
            username:this.state.userName,
            password:this.state.password
        }
        const {push} = this.props.history;
        try {
           const response= await login(creds);
            push("/");
            const authData ={
                ... response.data,
                password:this.state.password
            }


           this.props.loginSuccess(authData);

        }
        catch (errors){
            this.setState({
                errors:errors.response.data.message
            })
        }

    }
    render(){
        const {pandingApiCall,t} = this.props;
        const {userName, password, errors} = this.state;
        const buttonEnabled = userName && password;
        return(
            <div className="container">
                <form>
                    <h1 className="text-center">{t("Logins")}</h1>
                    <Input name ="userName" label= {t("Username")} type="text"  onChange={this.onChange} />
                    <Input name ="password" label= {t("Password")}  type="password"  onChange={ this.onChange} />
                    {errors && <div className="alert alert-danger">{errors}</div>}
                    <div className="text-center">
                        <Buttonproges
                            onClick={this.onclick}
                            disabled={!buttonEnabled|| pandingApiCall}
                            pendingApiCall={pandingApiCall}
                            text={t("Login")}
                        />



                    </div>

                </form>
            </div>
        )
    }
}


const UserLoginTrans =withTranslation()(UserLogin);
const UserLoginProgess = withApiProgess(UserLoginTrans,"/auth");

export default connect(null,{loginSuccess})(UserLoginProgess);
