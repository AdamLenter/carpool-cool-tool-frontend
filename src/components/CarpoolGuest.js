import React from 'react';

function CarpoolGuest({ carpoolGuest, carpoolGuestUsers, userTransactions, displayDate }) {
    console.log(carpoolGuest);

    const guestUserInfo = carpoolGuestUsers.find((user)=>user.id == carpoolGuest.user_id);
    let transactionInfo;
    if(userTransactions) {
        transactionInfo = userTransactions.find((transaction) => transaction.carpool_guest_id == carpoolGuest.id);
    } 

    console.log(transactionInfo);
    return (
        <div>
            <strong>Name: </strong>{guestUserInfo.first_name} {guestUserInfo.last_name}
            <br />
            <strong>Cellphone: </strong>{guestUserInfo.cellphone_number}
            <br />
            <strong>Address: </strong>{guestUserInfo.address1}
            <br />
            <strong>Payment: </strong>{transactionInfo ? displayDate(transactionInfo.user_transaction_date) : "No"}
            <br />
            <br />
        </div>
    )
}

export default CarpoolGuest;
