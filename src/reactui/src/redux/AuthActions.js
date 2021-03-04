export const  logoutSuccess = ()=>{
    return {
        type:"logout-success"
    };
}
export const  loginSuccess = authData=>{
    return {
        type:"login-success",
        payload:authData
    };
}