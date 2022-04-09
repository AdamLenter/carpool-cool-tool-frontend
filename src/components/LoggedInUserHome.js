import React from 'react';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import StandardPageHeader from './StandardPageHeader';

function LoggedInUserHome( {loggedInUser}) {
    return (
        <div className="App">
            <StandardPageHeader />
            <h2>Welcome, {loggedInUser.first_name}</h2>
        </div>
        );
}

export default LoggedInUserHome;
