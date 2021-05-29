import React from 'react';
import UserList from "../components/UserList";
import Message from "../components/message";
import {useSelector} from "react-redux";
import MessageList from "../components/MessageList";
const HomePage = () => {
    const {isLoggedIn} =useSelector((store)=>({
        isLoggedIn : store.isLoggedIn
    }));
    return (
        <div className="container">
            <div className={"row"}>
                <div className={"col"}>
                    {isLoggedIn&&(
                    <div className={"mb-1"}>
                        <Message/>
                    </div>
                    )}
                    <MessageList/>
                </div>

                <div className={"col"}>
                    <UserList/>
                </div>

            </div>

        </div>
    );
};

export default HomePage;