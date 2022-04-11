import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import LoggedInUserHome from './components/LoggedInUserHome';
import RegistrationScreen from './components/RegistrationScreen';
import NavBar from './components/NavBar';
import CreatePool from './components/CreatePool';

function App() {
  const [users, setUsers] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(false);
  // const [loggedInUser, setLoggedInUser] = useState({address1: "4245 Wisozk Roads", 
  // address2: null,
  // car_guest_capacity: null,
  // cellphone_number: "1-471-112-6266",
  // city_id: 4,
  // first_name: "Elijah",
  // has_car: "no",
  // home_neighborhood_location_id: 21,
  // id: 1,
  // last_name: "Toy",
  // state: "New York",
  // username: "aurelio",
  // zip: "78251"});
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [cities, setCities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [locationsSet, setLocationsSet] = useState(false);

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
          fetch("http://localhost:9292/locations")
          .then((r)=>r.json())
          .then((locationList) => setLocations(locationList))
          .then(() => setLocationsSet(true))
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

      const newUserList = [...users, newUserInfo];
      setUsers(newUserList);
  }

  function addCarpool(carpoolInfo) {
    fetch("http://localhost:9292/carpools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify(carpoolInfo)
      })
      .then((response)=>response.json())
      .then((dbResponse)=>console.log(dbResponse));
  }

  let neighborhoods = [];
  
  if(locationsSet) {
    neighborhoods = locations.filter((location)=>location.location_type === "Neighborhood");
  }

  const sortedLocations = locations.sort((a, b)=> {
    if(a.city.name.concat(a.name) < b.city.name.concat(b.name)){
      return -1;
      }
    else {
      return 1;
    }
  })
  
  const displayedLocations = sortedLocations.map((location)=>  {return {
    id: location.id, 
    name: `${location.city.name} - ${location.name}`
  }});
  
  if(usersLoaded) {
    return (
      <div className="App">
        {loggedIn ? (
          <BrowserRouter>
            <NavBar setLoggedIn = {setLoggedIn} setLoggedInUser = {setLoggedInUser} />
            <Route exact path="/">
                <LoggedInUserHome loggedInUser = {loggedInUser} />
            </Route>

            <Route exact path="/create_pool">
                <CreatePool loggedInUser = {loggedInUser} locations = {displayedLocations} addCarpool = {addCarpool} />
            </Route>

            <Route exact path="/show_carpool_as_user">
                <CreatePool loggedInUser = {loggedInUser} locations = {displayedLocations} addCarpool = {addCarpool} />
            </Route>

          </BrowserRouter>
        ) : (
          <BrowserRouter>
            <Route exact path="/">
                <HomeScreen />
            </Route>
            <Route exact path="/login">
                <LoginScreen users = {users} setLoggedIn = {setLoggedIn} setLoggedInUser = {setLoggedInUser} />
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
