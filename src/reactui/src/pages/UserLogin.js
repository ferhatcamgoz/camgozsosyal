import axios from 'axios';
import React from 'react';
import Input from "../components/Input";
import { withTranslation } from 'react-i18next';
import {login} from "../api/apiCalls";
class UserLogin extends React.Component{
    state={
        userName:null,   
        password:null,
        pendingApiCall:false,
        errors:{}
 
};

onChange = event=>{
    var {value, name}= event.target;   
    this.setState({
        [name]:value
    });
}
onclick = event =>{
    event.preventDefault();
    const creds ={
        username:this.state.userName,
        password:this.state.password
    }
    
        login(creds)
    
        
    
    
}
    render(){
        const {t} = this.props;
        return(
            <div className="container">
            <form>
           <h1 className="text-center">{t("Logins")}</h1>
           <Input name ="userName" label= {t("Username")} type="text"  onChange={this.onChange} />          
           <Input name ="password" label= {t("Password")}  type="password"  onChange={ this.onChange} />          
           <div className="text-center">
           <button className="btn btn-primary" onClick={this.onclick}>
          <span className="spinner-border spinner-border-sm"></span>{t("Login")}
           </button>
           </div>
          
        </form>
        </div>
        )
    }
}

export default withTranslation()(UserLogin);