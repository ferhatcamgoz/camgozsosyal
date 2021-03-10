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
               <img src="https://www.countryflags.io/tr/flat/24.png" alt="tr flag" onClick={()=>onChangeLanguage("tr")} style={{cursor: "pointer"}} />
               <img src="https://www.countryflags.io/us/flat/24.png" alt="us flag" onClick={()=>onChangeLanguage("en")} style={{cursor: "pointer"}}/>
        </div>
    );
};
export default (Language);