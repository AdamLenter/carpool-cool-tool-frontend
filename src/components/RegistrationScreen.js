import React, { useState } from 'react';
import PreLoginHeader from './PreLoginHeader';
import RegistrationConfirmation from './RegistrationConfirmation';
import RegistrationForm from './RegistrationForm';

function RegistrationScreen({cities, neighborhoods, addUser}) {
    const [registrationComplete, setRegistrationComplete] = useState(false);

    return (
        <div>
            <PreLoginHeader />
            {!registrationComplete ? <RegistrationForm cities = {cities} neighborhoods = {neighborhoods} addUser = {addUser} setRegistrationComplete = {setRegistrationComplete} /> : <RegistrationConfirmation /> }
        </div>
    )
}

export default RegistrationScreen;
