import {createStore, applyMiddleware, compose } from "redux";
import authReducer from "./AuthReducer";
import SecureLS from "secure-ls";
import thunk from "redux-thunk";
const secureLs = new SecureLS();


const getStoreInStroge=()=>{
    const localstate=  secureLs.get("state")

    let stateInLocalStroge={
        isLoggedIn:false,
        userName:undefined,
        displayName:undefined,
        image:null,
        password:undefined
    }
    if(localstate){
        try{
            stateInLocalStroge= (localstate);

        }
        catch (error){

        }
    }
    return stateInLocalStroge;
}

const updateStoreInStroge =newStore=>{
    secureLs.set("state",newStore);

}
const configureStore=()=>{
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store= createStore(authReducer,getStoreInStroge(),composeEnhancers( applyMiddleware(thunk)));
    store.subscribe(()=>{
    updateStoreInStroge(store.getState());
   })
    return store;
}
export  default  configureStore;