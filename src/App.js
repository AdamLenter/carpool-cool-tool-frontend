import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import LoggedInUserHome from './components/LoggedInUserHome';
import RegistrationScreen from './components/RegistrationScreen';

function App() {
  const [users, setUsers] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [cities, setCities] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);

  useEffect(()=> {
    fetch("http://localhost:9292/users")
        .then((r)=>r.json())
        .then((userList) => setUsers(userList))
        .then(()=>setUsersLoaded(true))
        }, [])

  useEffect(()=> {
    fetch("http://localhost:9292/cities")
        .then((r)=>r.json())
        .then((cityList) => setCities(cityList))
        .then (
          fetch("http://localhost:9292/neighborhoods")
          .then((r)=>r.json())
          .then((neighborhoodList) => setNeighborhoods(neighborhoodList))
        )}, [])

  function addUser(newUserInfo) {
    if(newUserInfo['address2'] == "")
      {
      newUserInfo['address2'] = null;
      }

    fetch("http://localhost:9292/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify(newUserInfo)
      })
      .then((response)=>response.json())
      .then((response_info)=>console.log(response_info))
  }

  if(usersLoaded) {
    return (
      <div className="App">
        {loggedInUser ? (
          <BrowserRouter>
              <Route exact path="/">
                  <LoggedInUserHome />
              </Route>
          </BrowserRouter>
        ) : (
          <BrowserRouter>
              <Route exact path="/">
                  <HomeScreen />
              </Route>

              <Route exact path="/login">
                  <LoginScreen users = {users} setLoggedInUser = {setLoggedInUser} />
              </Route>

              <Route exact path="/register">
                <RegistrationScreen cities = {cities} neighborhoods = {neighborhoods} addUser = {addUser}  />
              </Route>

          </BrowserRouter>
        )}
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
