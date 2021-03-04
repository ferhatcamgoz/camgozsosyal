import {createStore} from "redux";
import authReducer from "./AuthReducer";
import SecureLS from "secure-ls";

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

    const store= createStore(authReducer,getStoreInStroge(),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    store.subscribe(()=>{
    updateStoreInStroge(store.getState());
   })
    return store;
}
export  default  configureStore;