import React from 'react';
import { useTranslation } from 'react-i18next';
import {changeLanguage}from '../api/apiCalls';
const Language =(props)=>{
    const {i18n}=useTranslation();
   const onChangeLanguage=lang =>{

        i18n.changeLanguage(lang);
        changeLanguage(lang);
        
    }
    return (
        <div className="container">
               <img src="https://www.worldometers.info/img/flags/tu-flag.gif" alt="tr flag" onClick={()=>onChangeLanguage("tr")} style={{cursor: "pointer"}} width="65" height="30" />
               <img src="https://www.worldometers.info/img/flags/uk-flag.gif" alt="us flag" onClick={()=>onChangeLanguage("en")} style={{cursor: "pointer"}}width="65" height="30" />
        </div>
    );
};
export default (Language);