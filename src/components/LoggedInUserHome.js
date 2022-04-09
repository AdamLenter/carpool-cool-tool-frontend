import React from 'react';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoggedInUserHome({ setLoggedInUser }) {
    return (
        <div className="App">
            <NavBar setLoggedInUser = {setLoggedInUser} />
            <h1>You're logged in!</h1>
        </div>
        );
}

export default LoggedInUserHome;
