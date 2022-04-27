import React from 'react';

function UserTransactionRow({ loggedInUser, transaction, displayDate }) {
    
    let transactionToFrom;
    let senderRecipient;
    let inflowAmount = "";
    let outflowAmount = "";

    if(transaction.sender_user_id === loggedInUser.id) {
        transactionToFrom = "To: ";
        senderRecipient = transaction.recipient_user ? `${transaction.recipient_user.first_name} ${transaction.recipient_user.last_name}` : transaction.bank_account ? `(${transaction.bank_account.bank_name})` : "(loading)";
        outflowAmount = `-$${transaction.transaction_amount.toFixed(2)}`
    }
    else {
        transactionToFrom = "From: ";
        senderRecipient = transaction.sender_user ? `${transaction.sender_user.first_name} ${transaction.sender_user.last_name}` : transaction.bank_account ? `(${transaction.bank_account.bank_name})` : "(loading)";
        inflowAmount = `+$${transaction.transaction_amount.toFixed(2)}`
    }


    return (
        <tr>
            <td>{displayDate(transaction.user_transaction_date)}</td>
            <td>
                <strong>{transactionToFrom}</strong>{senderRecipient}
            </td>
            <td>{inflowAmount}</td>
            <td>{outflowAmount}</td>
            <td><strong>{transaction.balance < 0 ? "-$" : "$"}{Math.abs(transaction.balance).toFixed(2)}</strong></td>
        </tr>
    )
}

export default UserTransactionRow;
