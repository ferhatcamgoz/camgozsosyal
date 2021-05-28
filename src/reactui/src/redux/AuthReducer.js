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
    if(action.type=="update-user"){

        return {
            ... state,
            ...action.payload

        }

    }
    return state;
}
export default authReducer;