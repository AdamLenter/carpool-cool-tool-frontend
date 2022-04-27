import React, { useState } from 'react';

function BankAccountCard({accountInfo}) {
 
    return (
        <div>
            <p>
                <strong>Bank: </strong>{accountInfo.bank_name}
                <br />

                <strong>Account Number: </strong>{accountInfo.account_number}
            </p>
        </div>
    )
}

export default BankAccountCard;
