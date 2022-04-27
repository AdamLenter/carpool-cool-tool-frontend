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
import TransactionHistory from './components/TransactionHistory';
import MyProfile from './components/MyProfile';

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

  const [userTransactionHistory, setUserTransactionHistory] = useState([]);
  const [userBankAccounts, setUserBankAccounts] = useState([]);

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

    const monthInfo = months.find((month) => month.number === date.substring(5, 7));
    
    if(nameOrAbbreviation === "name") {
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
        }, [loggedInUser])

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
    if(newUserInfo['address2'] === "")
      {
      newUserInfo['address2'] = null;
      }

    newUserInfo['carpools_as_driver'] = [];
    newUserInfo['carpools_as_passenger'] = [];

    fetch("http://localhost:9292/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify(newUserInfo)
      })
      .then((response)=>response.json())
      .then((newUserFromDb) => {
        newUserFromDb.carpools_as_driver = [];
        newUserFromDb.carpools_as_guest = [];
        const newUserList = [...users, newUserFromDb];
      setUsers(newUserList);
      })
  }

  function addBankAccount(bankAccountInfo) {
    bankAccountInfo.user_id = loggedInUser.id;

    fetch("http://localhost:9292/bank_account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify(bankAccountInfo)
      })
      .then((response)=>response.json())
      .then((newBankAccountFromDb) => {
        const updatedBankAccounts = [...userBankAccounts, newBankAccountFromDb];
        setUserBankAccounts(updatedBankAccounts);
      })
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
        newCarpool.destination_location = locations.find((location) => location.id === Number(newCarpool.destination_location_id));
        newCarpool.origin_location = locations.find((location) => location.id === Number(newCarpool.origin_location_id));
        newCarpool.user_transactions = [];
        newCarpool.users = [];
        newCarpool.driver_user = {...loggedInUser};

        const updatedCarpoolsAsDriver = [...loggedInUser.carpools_as_driver, newCarpool];
        let updatedLoggedInUser = {...loggedInUser};
        updatedLoggedInUser.carpools_as_driver = updatedCarpoolsAsDriver;
        setLoggedInUser(updatedLoggedInUser);
      })
  }

  function addUserToCarpool(loggedInUser, carpoolInfo) {
    // console.log(loggedInUser);
    // console.log(carpoolInfo);
    const newCarpoolGuestForDb = {
      userId: loggedInUser.id,
      carpoolId: carpoolInfo.id
    }
    fetch("http://localhost:9292/carpool_guests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify(newCarpoolGuestForDb)
      })
      .then((response)=>response.json())
      .then((newCarpoolGuest)=> {
        const newCarpoolGuests = [...carpoolInfo.carpool_guests, newCarpoolGuest];
        const newCarpoolUser = {
          id: loggedInUser.id, 
          first_name: loggedInUser.first_name, 
          last_name: loggedInUser.last_name, 
          address1: loggedInUser.address1, 
          address2: loggedInUser.address2, 
          car_guest_capacity: loggedInUser.car_guest_capacity, 
          cellphone_number: loggedInUser.cellphone_number, 
          city_id: loggedInUser.city_id, 
          has_car: loggedInUser.has_car, 
          home_neighborhood_location_id: loggedInUser.home_neighborhood_location_id, 
          state: loggedInUser.state, 
          username: loggedInUser.username, 
          zip: loggedInUser.zip, 
        };

      const newCarpoolUsers = [...carpoolInfo.users, newCarpoolUser];

      let newCarpoolInfo = {...carpoolInfo};
      newCarpoolInfo.carpool_guests = newCarpoolGuests;
      newCarpoolInfo.users = newCarpoolUsers;

      const updatedUserCarpoolsAsGuest = [...loggedInUser.carpools_as_guest, newCarpoolInfo];
      const updatedLoggedInUser = {...loggedInUser};
      updatedLoggedInUser.carpools_as_guest = updatedUserCarpoolsAsGuest;
      setLoggedInUser(updatedLoggedInUser);
      })   
  }

  function markCarpoolComplete(carpoolInfo) {
    fetch(`http://localhost:9292/mark_carpool_complete/${carpoolInfo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify({complete: "Yes"})
      })

    for(let i = 0; i < carpoolInfo.user_transactions.length; i++) {
      fetch("http://localhost:9292/carpool_transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify(carpoolInfo.user_transactions[i])
      })
    }

    const updatedCarpoolsAsDriver = loggedInUser.carpools_as_driver.map((carpool)=>{
        if(carpool.id === carpoolInfo.id) {
          return carpoolInfo;
        }
        else {
          return carpool;
        }
    }) 

    let updatedLoggedInUser = {...loggedInUser}
    updatedLoggedInUser.carpools_as_driver = updatedCarpoolsAsDriver;

    setLoggedInUser(updatedLoggedInUser);
  }

  function addBankTransaction(transactionInfo) {
    const transactionDetails = {
      sender_user_id: transactionInfo.toFrom === "to" ? loggedInUser.id : null,
      recipient_user_id: transactionInfo.toFrom === "from" ? loggedInUser.id : null,
      transaction_amount: Number(transactionInfo.transactionAmount), 
      bank_account_id: Number(transactionInfo.bankAccount), 
      user_transaction_date: currentDate
    }

    fetch("http://localhost:9292/bank_transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify(transactionDetails)
      })
      .then((response)=>response.json())
      .then((transactionInfoFromDb)=> {
        transactionInfoFromDb.bank_account = userBankAccounts.find((bankAccount)=>bankAccount.id === transactionDetails.bank_account_id);
        const updatedTransactionHistory = [...userTransactionHistory, transactionInfoFromDb];
        setUserTransactionHistory(updatedTransactionHistory);
      })
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
  
  let unsortedCarpools = [];
  let myCarpools = [];
  
  if(Object.keys(loggedInUser).length > 0) {
    unsortedCarpools = [...loggedInUser.carpools_as_driver, ...loggedInUser.carpools_as_guest];
    myCarpools = unsortedCarpools.sort((a, b)=> {
      if(a.carpool_date.concat(" ", a.departure_time)  > b.carpool_date.concat(" ", b.departure_time)) {
        return -1;
        }
      else {
        return 1;
      }
    }
    )
  }

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
                <ShowCarpools loggedInUser = {loggedInUser} myCarpools = {myCarpools} displayDate = {displayDate} displayTime = {displayTime} />
            </Route>

            <Route path="/display_find_carpool_form">
                <FindCarpoolForm currentDate = {currentDate} currentTime = {currentTime} loggedInUser = {loggedInUser} locations = {displayedLocations} displayDate = {displayDate} displayTime = {displayTime} addUserToCarpool = {addUserToCarpool} />
            </Route>

            <Route path="/show_carpool_details/:id">
                <CarpoolDetails loggedInUser = {loggedInUser} myCarpools = {myCarpools} displayDate = {displayDate} displayTime = {displayTime} currentDate = {currentDate} markCarpoolComplete = {markCarpoolComplete} />
            </Route>

            <Route exact path="/transaction_history">
              <TransactionHistory loggedInUser = {loggedInUser} userTransactionHistory = {userTransactionHistory} userBankAccounts = {userBankAccounts} addBankTransaction = {addBankTransaction} displayDate = {displayDate} />
            </Route>
            
            <Route exact path="/my_profile">
              <MyProfile loggedInUser = {loggedInUser} neighborhoods = {neighborhoods} cities = {cities} userBankAccounts = {userBankAccounts} addBankAccount = {addBankAccount} />
            </Route>

          </BrowserRouter>
        ) : (
          <BrowserRouter>
            <Route exact path="/login">
                <LoginScreen users = {users} setLoggedIn = {setLoggedIn} setLoggedInUser = {setLoggedInUser} setUserTransactionHistory = {setUserTransactionHistory} setUserBankAccounts = {setUserBankAccounts} />
            </Route>

            <Route exact path="/register">
              <RegistrationScreen cities = {cities} neighborhoods = {neighborhoods} addUser = {addUser}  />
            </Route>

            <Route exact path="/">
                <HomeScreen />
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
