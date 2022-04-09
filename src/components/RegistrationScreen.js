import React, { useState } from 'react';
import StandardPageHeader from './StandardPageHeader';
import RegistrationConfirmation from './RegistrationConfirmation';
import RegistrationForm from './RegistrationForm';

function RegistrationScreen({cities, neighborhoods, addUser}) {
    const [registrationComplete, setRegistrationComplete] = useState(false);

    return (
        <div>
            <StandardPageHeader />
            {!registrationComplete ? <RegistrationForm cities = {cities} neighborhoods = {neighborhoods} addUser = {addUser} setRegistrationComplete = {setRegistrationComplete} /> : <RegistrationConfirmation /> }
        </div>
    )
}

export default RegistrationScreen;
