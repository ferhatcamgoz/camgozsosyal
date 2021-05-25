import {createStore, applyMiddleware, compose } from "redux";
import authReducer from "./AuthReducer";
import SecureLS from "secure-ls";
import thunk from "redux-thunk";
import {setAutho} from "../api/apiCalls";
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
    setAutho(getStoreInStroge());
    console.log("localde"+getStoreInStroge().userName);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store= createStore(authReducer,getStoreInStroge(),composeEnhancers( applyMiddleware(thunk)));
    store.subscribe(()=>{
    updateStoreInStroge(store.getState());
    setAutho(store.getState());
   })
    return store;
}
export  default  configureStore;