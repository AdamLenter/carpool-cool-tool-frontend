import React, { useState } from 'react';
import StandardPageHeader from './StandardPageHeader';
import { useHistory } from 'react-router-dom';

function LoginScreen({users, setLoggedIn, setLoggedInUser, getCarpoolsAsDriver}) {
    const history = useHistory();
    const [selectedUserId, setSelectedUserId] = useState(users[0].id)
   
    function handle_user_select(event) {
        setSelectedUserId(event.target.value)
    }

    function handle_submit(event) {
        event.preventDefault();
        const userInfo = users.find((user)=>user.id == selectedUserId); 
        setLoggedIn(true);
        setLoggedInUser(userInfo);
        getCarpoolsAsDriver(selectedUserId)
        console.log(userInfo);
        history.push("/")
    }
    
    return (
    <div className = "app">
        <StandardPageHeader />
        <form onSubmit = {handle_submit}>
            <label>Username: </label>
            <select value = {selectedUserId} onChange={handle_user_select}>
                {users.map((user) => <option key = {user.id} value = {user.id}>{user.username}</option>)}
            </select>
            <br />
            <button>Login</button>
        </form>
    </div>
  );
}

export default LoginScreen;