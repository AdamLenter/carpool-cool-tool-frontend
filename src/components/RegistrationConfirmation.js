import React from 'react';
import { useHistory } from 'react-router-dom';


function RegistrationConfirmation() {
    const history = useHistory();

    function handleButtonClick() {
        history.push('/login');
    }
    return (
        <div>
            <h2>Thank you for Registering.</h2>
            <button onClick = {()=>handleButtonClick()} >Login</button>
        </div>
    )
}

export default RegistrationConfirmation;
