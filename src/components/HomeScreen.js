import React from 'react';
import PreLoginHeader from './PreLoginHeader';
import { useHistory } from "react-router-dom";

function HomeScreen() {
    const history = useHistory();

    function handleLoginClick() {
        history.push("/login");
    }
    return (
        <div className="App">
            <PreLoginHeader />
            <div>
            <button value = "login" onClick = {handleLoginClick}>Login</button>
            <button value = "register">Register</button>
            </div>
        </div>
        );
}

export default HomeScreen;
