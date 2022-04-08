import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';

function App() {
  const [users, setUsers] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(false);

  useEffect(()=> {
    fetch("http://localhost:9292/users")
        .then((r)=>r.json())
        .then((userList) => setUsers(userList))
        .then(()=>setUsersLoaded(true))
        }, [])

  return (
    <div className="App">
      <BrowserRouter>
          <Route exact path="/">
              <HomeScreen />
          </Route>

          <Route exact path="/login">
              <LoginScreen users = {users} />
          </Route>

      </BrowserRouter>
    </div>
  );
}

export default App;
