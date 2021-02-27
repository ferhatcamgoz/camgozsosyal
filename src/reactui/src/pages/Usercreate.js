import axios from 'axios';
import React from 'react';

import Input from "../components/Input";
import {kayit} from '../api/apiCalls';
import { withTranslation } from 'react-i18next';
import  Buttonproges from "../components/buttonproges";
import {withApiProgess} from "../shared/ApiProges";

class Usercreate extends React.Component{
    state={
        userName:null,
        nickName:null,
        password:null,
        passwordRepeat:null,
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


        try{
            await  kayit(body);
        }
        catch (err){
            if(err.response.data.validateexception){
                this.setState({errors:err.response.data.validateexception})
            }

            console.log(this.state.errors);
        }


    }


    render(){
        const {errors} = this.state;
        const {userName,nickName,password,passwordRepeat} = errors;
        const {t,pandingApiCall} = this.props;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Sign Up')}</h1>
                    <Input name ="userName" label={t("Username")} type="text" error={userName} onChange={this.onChange}/>
                    <Input name ="nickName" label={t("NickName")} type="text" error={nickName} onChange={this.onChange}/>
                    <Input name ="password" label={t("Password")} type="password" error={password} onChange={this.onChange}/>
                    <Input name="passwordRepeat" label={t("Password Repeat")}  type="password" error={passwordRepeat}  onChange={this.onChange}/>
                    <div className="text-center">
                        <Buttonproges  onClick={this.onClickKayit}
                                       disabled={pandingApiCall ||passwordRepeat!=undefined}
                                       pendingApiCall={pandingApiCall}
                                       text={t("Register")}
                        />

                    </div>

                </form>
            </div>


        );

    }
}
const UserCreateProgess = withApiProgess(Usercreate,"/kayit");
const userCreateWithTranslate = withTranslation()(UserCreateProgess);

export default  withTranslation()(userCreateWithTranslate);