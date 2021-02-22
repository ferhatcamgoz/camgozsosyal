import axios from 'axios';
import React from 'react';

import Input from "../components/Input";
import {kayit} from '../api/apiCalls';
import { withTranslation } from 'react-i18next';


class Usercreate extends React.Component{
     state={
        userName:null,
        nickName:null, 
        password:null,
        passwordRepeat:null,
        pendingApiCall:false,
        errors:{}
    };
    onChange = event=>{
        var {value, name}= event.target;
       
        var errors = {... this.state.errors}
        var {t} = this.props;
        errors[name]=undefined
        if(name=="password"||name=="passwordRepeat"){
            if(name=="password" && value!=this.state.passwordRepeat){
               
                errors.passwordRepeat= t("Aynı şifreyi yaz");
            }
            else if(name=="passwordRepeat" && value!=this.state.password){
                errors.passwordRepeat= t("Aynı şifreyi yaz");
            }
            else {
                errors.passwordRepeat=undefined
            }
        }
        this.setState({
            [name]:value,
            errors

        });
    }
    onClickKayit = async event => {
        event.preventDefault();
        const body={
            userName:this.state.userName,
            nickName:this.state.nickName,
            password:this.state.password
        }

        this.setState({pendingApiCall:true})
        try{
            await  kayit(body);
        }
        catch (err){
            if(err.response.data.validateexception){
                this.setState({errors:err.response.data.validateexception})
            }
            
            console.log(this.state.errors);
        }
    
     this.setState({pendingApiCall:false});
    } 
   

    render(){
        var {pendingApiCall,errors} = this.state;
        var {userName,nickName,password,passwordRepeat} = errors;
        var {t} = this.props;
        return (
            <div className="container">
                <form>
                <h1 className="text-center">{t('Sign Up')}</h1>
                <Input name ="userName" label={t("Username")} type="text" error={userName} onChange={this.onChange}/>
                <Input name ="nickName" label={t("NickName")} type="text" error={nickName} onChange={this.onChange}/>
                <Input name ="password" label={t("Password")} type="password" error={password} onChange={this.onChange}/>
                <Input name="passwordRepeat" label={t("Password Repeat")}  type="password" error={passwordRepeat}  onChange={this.onChange}/>
                <div className="text-center">
                <button className="btn btn-primary" onClick={this.onClickKayit}
                disabled={pendingApiCall ||passwordRepeat!=undefined}>
               {pendingApiCall&& <span className="spinner-border spinner-border-sm"></span>}{t("Register")}
                </button>
                </div>
               
            </form>
            </div>
           
            
        );
       
    }
}
const userCreateWithTranslate = withTranslation()(Usercreate);
export default  withTranslation()(Usercreate);