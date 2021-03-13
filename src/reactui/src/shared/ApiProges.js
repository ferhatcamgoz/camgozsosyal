import React, {Component,useState,useEffect} from 'react';
import axios from "axios";
export const useAoiProgess =(apiPath)=>{
   const [pandingApiCall, setPandingApiCall] =useState(false);
   useEffect(()=>{
       let requestInterceptor, responseInterceptor;
       const updatePanginga =(url, progess)=> {
            if (url.startsWith(apiPath)) {
                setPandingApiCall(progess);
            }
        }


        const registerInterceptors =()=>{
           axios.interceptors.request.use((request => {
                requestInterceptor= updatePanginga(request.url, true);

                return request;
            }));
           responseInterceptor= axios.interceptors.response.use(response => {

                updatePanginga(response.config.url, false);

                return response;
            }, error => {
                updatePanginga(error.config.url, false);

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
    },[])
    return pandingApiCall;
}

