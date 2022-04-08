import React from 'react';
import PreLoginHeader from './PreLoginHeader';
import { useHistory } from "react-router-dom";

function HomeScreen() {
    const history = useHistory();

    function handleClick(page) {
        console.log("yoyoyo")
        history.push(`/${page}`);
    }
    return (
        <div className="App">
            <PreLoginHeader />
            <div>
            <button value = "login" onClick = {()=>handleClick("login")}>Login</button>
            <button value = "register" onClick={()=>handleClick("register")}>Register</button>
            </div>
        </div>
        );
}

export default HomeScreen;
