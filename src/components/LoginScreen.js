import React, { useState } from 'react';
import StandardPageHeader from './StandardPageHeader';
import { useHistory } from 'react-router-dom';

function LoginScreen({users, setLoggedIn, setLoggedInUser}) {
    const history = useHistory();
    const [defaultUserId, setDefaultUserId] = useState(users[0].id)
   
    function handle_user_select(event) {
        setDefaultUserId(event.target.value)
    }

    function handle_submit(event) {
        event.preventDefault();
        const userInfo = users.find((user)=>user.id == defaultUserId); 
        setLoggedIn(true);
        setLoggedInUser(userInfo);
        console.log(userInfo);
        history.push("/")
    }
    
    return (
    <div className = "app">
        <StandardPageHeader />
        <form onSubmit = {handle_submit}>
            <label>Username: </label>
            <select value = {defaultUserId} onChange={handle_user_select}>
                {users.map((user) => <option key = {user.id} value = {user.id}>{user.username}</option>)}
            </select>
            <br />
            <button>Login</button>
        </form>
    </div>
  );
}

export default LoginScreen;