import React from 'react';
import StandardPageHeader from './StandardPageHeader';
import { useHistory } from "react-router-dom";

function HomeScreen() {
    const history = useHistory();

    function handleClick(page) {
        history.push(`/${page}`);
    }
    return (
        <div className="App">
            <StandardPageHeader />
            <div>
            <button className = "app_buttons" value = "login" onClick = {()=>handleClick("login")}>Login</button>
            <button className = "app_buttons" value = "register" onClick={()=>handleClick("register")}>Register</button>
            </div>
        </div>
        );
}

export default HomeScreen;
