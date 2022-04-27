import React from 'react';
import BankAccountCard from './BankAccountCard';

function MyProfile({ loggedInUser, neighborhoods, cities, userBankAccounts }) {
console.log(loggedInUser);
    return (
        <div>
            <h1>My Profile</h1>
            <p>
                <strong>First name: </strong>{loggedInUser.first_name}
                <br />

                <strong>Last name: </strong>{loggedInUser.last_name}
                <br />

                <strong>Username: </strong>{loggedInUser.username}
                <br />
                
                <strong>Home address1: </strong>{loggedInUser.address1}
                <br />
                
                <strong>Home address2: </strong>{loggedInUser.address2 ? loggedInUser.address2 : "N/A"}
                <br />
                
                <strong>City: </strong>{cities.find((city)=>city.id === loggedInUser.city_id).name}
                <br />
                
                <strong>Zip: </strong>{loggedInUser.zip}
                <br />
                
                <strong>Cellphone number: </strong>{loggedInUser.cellphone_number}
                <br />
                
                <strong>Home neighborhood: </strong>{neighborhoods.find((neighborhood)=>neighborhood.id === loggedInUser.home_neighborhood_location_id).name}
                <br />
                
                <strong>I have a car: </strong>{loggedInUser.has_car}
                <br /> 

                <strong>Car guest capacity: </strong>{loggedInUser.car_guest_capacity ? loggedInUser.car_guest_capacity : "(N/A)"}
            </p>
            <br />
            <hr />
            <br />
            <h2>My Bank Accounts</h2>
            {userBankAccounts.length > 0 ? userBankAccounts.map((account) => <BankAccountCard key = {account.id} accountInfo = {account} />) : <h3>(no bank accounts to display)</h3>}
        </div>
    )
}

export default MyProfile;
