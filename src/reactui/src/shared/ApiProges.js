import React, {Component,useState,useEffect} from 'react';
import axios from "axios";
export const useAoiProgess =(apiMethod,apiPath)=>{
   const [pandingApiCall, setPandingApiCall] =useState(false);
   useEffect(()=>{
       let requestInterceptor, responseInterceptor;
       const updatePanginga =(method,url, progess)=> {
            if (url.startsWith(apiPath)&&method== apiMethod) {
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
    },[apiPath,apiMethod])
    return pandingApiCall;
}

