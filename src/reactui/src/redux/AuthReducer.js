const defaultState={
    isLoggedIn:false,
    userName:undefined,
    displayName:undefined,
    image:null,
    password:undefined
};

const authReducer = (state=defaultState,action)=>{
    console.log(action.toString())
    if(action.type=="logout-success"){
        return defaultState;
    }
    if(action.type=="login-success"){

       return {
           ... action.payload,
           isLoggedIn:true
       }

    }
    return state;
}
export default authReducer;