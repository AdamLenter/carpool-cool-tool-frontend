import React, { useState } from 'react';
import PreLoginHeader from './PreLoginHeader';

function LoginScreen({users, setLoggedInUser}) {
    const [defaultUserId, setDefaultUserId] = useState("")
   
    function handle_user_select(event) {
        setDefaultUserId(event.target.value)
    }

    function handle_submit(event) {
        event.preventDefault();
        const userInfo = users.find((user)=>user.id == defaultUserId); 
        setLoggedInUser(userInfo);
    }
    
    return (
    <div className = "app">
        <PreLoginHeader />
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