import React from 'react';
import logo from '../carpool_photo.jpg';

function HomeScreen() {

  
  
  return (
  <div className="App">
    <h1>Carpool Cool Tool</h1>
    <img src={logo} className = "logo" alt="logo" />
    <div>
      <button value = "login">Login</button>
      <button value = "register">Register</button>
    </div>
  </div>
);
}

export default HomeScreen;
