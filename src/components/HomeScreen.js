import React from 'react';
import PreLoginHeader from './PreLoginHeader';

function HomeScreen() {
  return (
  <div className="App">
    <PreLoginHeader />
    <div>
      <button value = "login">Login</button>
      <button value = "register">Register</button>
    </div>
  </div>
);
}

export default HomeScreen;
