import React from 'react';
import logo from '../carpool_photo.jpg';
    
function StandardPageHeader() {
  return (
    <div>
        <h1>Carpool Cool Tool</h1>
        <img src={logo} className = "logo" alt="logo" />
        <br />
    </div>
  );
}

export default StandardPageHeader;
