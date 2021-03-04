import React, {Component} from 'react';
export const Auth =React.createContext();

class AuthContext extends Component {
    state ={
        isLoggedIn:false,
        userName:undefined,
        displayName:undefined,
        image:undefined,
        password:undefined
    };

    onLoginSuccess =(authState)=>{
        this.setState({
            ... authState,
            isLoggedIn:true
        })
    };
    onLogoutSuccess=()=> {
        this.setState({
            userName: undefined,
            isLoggedIn: false
        });
    };
    render() {
        return (

                <Auth.Provider value= {{
                    state : {... this.state},
                    onLoginSuccess: this.onLoginSuccess,
                    onLogoutSuccess: this.onLogoutSuccess
                }}>
                    {this.props.children}
                </Auth.Provider>

        );
    }
}

export default AuthContext;