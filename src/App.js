import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import LoggedInUserHome from './components/LoggedInUserHome';

function App() {
  const [users, setUsers] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(()=> {
    fetch("http://localhost:9292/users")
        .then((r)=>r.json())
        .then((userList) => setUsers(userList))
        .then(()=>setUsersLoaded(true))
        }, [])

  if(usersLoaded) {
    return (
      <div className="App">
        <BrowserRouter>
            <Route exact path="/">
                {!loggedInUser ? <HomeScreen /> : <LoggedInUserHome />}
            </Route>

            <Route exact path="/login">
                <LoginScreen users = {users} setLoggedInUser = {setLoggedInUser} />
            </Route>

          
        </BrowserRouter>
      </div>
    );
  }
  else {
    return(
      <h1>Loading...</h1>
    )
  }
}
export default App;
