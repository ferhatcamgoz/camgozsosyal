import React, {useState,useEffect} from 'react';
import {getUsers} from "../api/apiCalls";
import {useTranslation, withTranslation} from "react-i18next";
import UserListItem from "./UserListItem";
import {useAoiProgess} from "../shared/ApiProges";
import Spinner from "./Spinner";

const UserList =()=> {

    const [page,setPage]=useState({

            content:[],
            size:3,
            number:0

    })
    const [fail, setFail]=useState(false);
    const pendingApiCall = useAoiProgess("/users?page")

     useEffect(()=>{
        loadUsers();
    },[]);
      const onClick=()=>{

   const nextPage = page.number+1;
    loadUsers(nextPage);
   }
  const onClickPrev=()=>{
       const prevPage = page.number-1;
       loadUsers(prevPage);
   }
   const loadUsers = async page=>{
       setFail(false);
       try{
           const response = await  getUsers(page);
           setPage(response.data)
       }
        catch (err){
            setFail(true);
        }

   }


      const {content:users,last,first}=page;
       const {t}=useTranslation();

       let actionDiv=(
            <div>
                {first==false &&(
                    <button className="btn btn-sm btn-light"
                            onClick={onClickPrev}>{t("Previus")}
                    </button>)}
                {last==false&&(
                    <button className="btn btn-sm btn-light float-right"
                            onClick={onClick}>{t("Next")}</button>

                )}
            </div>
       );
       if(pendingApiCall){
           actionDiv=<Spinner></Spinner>
       }
        return (

            <div className={"card"}>
                <h3 className={"card-header text center"}>{t("Users")} </h3>
               <div className={"list-group-flush"}>
                   {users.map((user,index)=>(
                       <UserListItem key={user.userName} user={user} > </UserListItem>
                     ))}
               </div>
                {actionDiv}
                {fail&& <div className={"text-center text-danger"}>{t("Load fail")} </div>}
                </div>
        );

}

export default withTranslation()(UserList);