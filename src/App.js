import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import LoggedInUserHome from './components/LoggedInUserHome';
import RegistrationScreen from './components/RegistrationScreen';
import NavBar from './components/NavBar';
import CreatePool from './components/CreatePool';
import ShowCarpools from './components/ShowCarpools';
import CarpoolDetails from './components/CarpoolDetails';
import FindCarpoolForm from './components/FindCarpoolForm';

function App() {
  const today = new Date();

  const currentDate = today.toISOString().split('T')[0];
  let currentHour = today.getHours();

  if(currentHour < 23) {
      currentHour += 1;
  }
  else {
      currentHour = 0;
  }

  if(currentHour < 10) {
      currentHour = "0" + currentHour;
  }

  const currentTime = currentHour + ":00";

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
  const [carpoolsAsDriver, setCarpoolsAsDriver] = useState([]);
  const [carpoolsAsDriverLoaded, setCarpoolsAsDriverLoaded] = useState(false);

  function displayDate(date, nameOrAbbreviation) {
    const months = [
        {"number": "01", "name": "January", "abbreviation": "Jan"},   
        {"number": "02", "name": "February", "abbreviation": "Feb"},   
        {"number": "03", "name": "March",  "abbreviation": "Mar"},   
        {"number": "04", "name": "April",  "abbreviation": "Apr"},   
        {"number": "05", "name": "May",  "abbreviation": "May"},   
        {"number": "06", "name": "June",  "abbreviation": "Jun"},   
        {"number": "07", "name": "July",  "abbreviation": "Jul"},   
        {"number": "08", "name": "August",  "abbreviation": "Aug"},   
        {"number": "09", "name": "September",  "abbreviation": "Sep"},   
        {"number": "10", "name": "October",  "abbreviation": "Oct"},   
        {"number": "11", "name": "November",  "abbreviation": "Nov"},   
        {"number": "12", "name": "December",  "abbreviation": "Dec"}
    ];

    const monthInfo = months.find((month) => month.number == date.substring(5, 7));
    
    if(nameOrAbbreviation == "name") {
        return `${monthInfo.name}  ${Number(date.substring(8))}, ${date.substring(0, 4)}`;
    }
    else {
        return `${monthInfo.abbreviation}  ${Number(date.substring(8))}, ${date.substring(0, 4)}`
    }
  }

function displayTime(time) {
    let hour = Number(time.substring(11, 13));
    let amPm
    if(hour > 12) {
        hour -= 12;
        amPm = "PM";
    }
    else {
        amPm = "AM";
    }
  return `${hour}:${time.substring(14, 16)} ${amPm}`;
  }

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
      .then((responseInfo)=> {
        let newCarpool = responseInfo;
        newCarpool.carpool_guests = [];
        newCarpool.destination_location = locations.find((location) => location.id == newCarpool.destination_location_id);
        newCarpool.origin_location = locations.find((location) => location.id == newCarpool.origin_location_id);
        newCarpool.user_transactions = [];
        newCarpool.users = [];



        const newCarpoolsAsDriver = [...carpoolsAsDriver, responseInfo];
        setCarpoolsAsDriver(newCarpoolsAsDriver);
      })
  }
  
  function getCarpoolsAsDriver(userId) {
    fetch(`http://localhost:9292/carpools_as_driver/${userId}`)
        .then((r)=>r.json())
        .then((carpoolList) => setCarpoolsAsDriver(carpoolList))
        .then(()=>setCarpoolsAsDriverLoaded(true))
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

            <Route path="/create_pool">
                <CreatePool currentDate = {currentDate} currentTime = {currentTime} loggedInUser = {loggedInUser} locations = {displayedLocations} addCarpool = {addCarpool} />
            </Route>

            <Route path="/show_carpools">
                <ShowCarpools carpoolsAsDriver = {carpoolsAsDriver} displayDate = {displayDate} displayTime = {displayTime} />
            </Route>

            <Route path="/display_find_carpool_form">
                <FindCarpoolForm currentDate = {currentDate} currentTime = {currentTime} loggedInUser = {loggedInUser} locations = {displayedLocations} displayDate = {displayDate} displayTime = {displayTime} />
            </Route>

            <Route path="/show_carpool_details/:id">
                <CarpoolDetails displayDate = {displayDate} displayTime = {displayTime} />
            </Route>

          </BrowserRouter>
        ) : (
          <BrowserRouter>
            <Route exact path="/">
                <HomeScreen />
            </Route>
            <Route exact path="/login">
                <LoginScreen users = {users} setLoggedIn = {setLoggedIn} setLoggedInUser = {setLoggedInUser} getCarpoolsAsDriver = {getCarpoolsAsDriver} />
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
