import {useState} from 'react';

import Input from "../components/Input";

import { useTranslation } from 'react-i18next';
import  Buttonproges from "../components/buttonproges";
import {useAoiProgess, withApiProgess} from "../shared/ApiProges";
import {singupHangler} from "../redux/AuthActions";
import {useDispatch} from "react-redux";
const Usercreate =(props)=> {
    const [form, setForm] = useState({
        userName:null,
        nickName:null,
        password:null,
        passwordRepeat:null
    })

    const [errors,setErrors]=useState({});
    const dispatch =useDispatch();


    const onChange = event=>{
        const {value, name}= event.target;

        setErrors((previousErrors)=>({ ...previousErrors, [name]:undefined}));

        setForm((previousForm)=>({... previousForm, [name]:value}));


    }
    const onClickKayit = async event => {
        event.preventDefault();
        const {history } = props;
        const {push} =  history;
        const {userName,nickName,password}=form;
        const body={
            userName,
            nickName,
            password
        }


        try{
           await dispatch(singupHangler(body))
                push("/");
        }
        catch (err){
           if(err.response.data.validateexception){

                setErrors(err.response.data.validateexception)
            }


        }


    }



       // const {errors} = this.state;
        const {userName:usernameError,nickName:nickNameError,password:passwordError} = errors;
        const {t} =useTranslation();
        const pandingApiCall = useAoiProgess("post","/kayit");

        let passwordRepeatError;
        if(form.password !=form.passwordRepeat){
            passwordRepeatError= t("Aynı şifreyi yaz");
        }
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Sign Up')}</h1>
                    <Input name ="userName" label={t("Username")} type="text" error={usernameError} onChange={onChange}/>
                    <Input name ="nickName" label={t("NickName")} type="text" error={nickNameError} onChange={onChange}/>
                    <Input name ="password" label={t("Password")} type="password" error={passwordError} onChange={onChange}/>
                    <Input name="passwordRepeat" label={t("Password Repeat")}  type="password" error={passwordRepeatError}  onChange={onChange}/>
                    <div className="text-center">
                        <Buttonproges  onClick={onClickKayit}
                                       disabled={pandingApiCall ||form.passwordRepeat==undefined}
                                       pendingApiCall={pandingApiCall}
                                       text={t("Register")}
                        />

                    </div>

                </form>
            </div>


        );


}
export default (Usercreate);


