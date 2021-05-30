import React, {useState,useEffect} from 'react';
import axios from "axios";
export const useAoiProgess =(apiMethod,apiPath,strictPath)=>{
   const [pandingApiCall, setPandingApiCall] =useState(false);

   useEffect(()=>{
       let requestInterceptor, responseInterceptor;
       const updatePanginga =(method,url, progess)=> {
        if(method!=apiMethod){
             return;
        }
        if(strictPath&& url===apiPath){
            setPandingApiCall(progess);
        }
        else if (url.startsWith(apiPath)&&method== apiMethod) {
                setPandingApiCall(progess);
        }
        }


        const registerInterceptors =()=>{
           axios.interceptors.request.use((request => {
               const {url,method}=request;
                requestInterceptor= updatePanginga(method,url, true);

                return request;
            }));
           responseInterceptor= axios.interceptors.response.use(response => {
               const {url,method}=response.config;
               updatePanginga(method,url, false);

                return response;
            }, error => {
               const {url,method}=error.config;
               updatePanginga(method,url, false);

               throw  error;
            });
        }
       const unregisterInterceptors=()=>{
           axios.interceptors.request.eject(requestInterceptor);
           axios.interceptors.response.eject(responseInterceptor);
       }
        registerInterceptors();
       return function  unmount(){
        unregisterInterceptors();
       }
    },[apiPath,apiMethod,strictPath])
    return pandingApiCall;
}

