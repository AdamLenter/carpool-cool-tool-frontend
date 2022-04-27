import React from 'react';
import { Table } from 'react-bootstrap';
import TransferFundsForm from './TransferFundsForm';
import UserTransactionRow from './UserTransactionRow';

function TransactionHistory({ loggedInUser, userTransactionHistory, userBankAccounts, displayDate, addBankTransaction }) {
    console.log(userTransactionHistory);
   
    let sortedTransactions = userTransactionHistory.sort((a, b) => {
        if(a.id > b.id) {
            return -1;
        }
        else {
            return 1;
        }
    })

    let balance = 0;

    for(let i = (sortedTransactions.length - 1); i >= 0; i--) {
        if(sortedTransactions[i].sender_user_id === loggedInUser.id) {
        balance -= sortedTransactions[i].transaction_amount; 
        }
        else {
        balance += sortedTransactions[i].transaction_amount;
        }

    sortedTransactions[i]["balance"] = balance;
    }
    console.log(sortedTransactions);

    return (
        <div>
            <h1>Transaction History</h1>
            <Table bordered>
                <thead>
                    <tr>
                        <th>Transaction Date</th>
                        <th>Details</th>
                        <th>Inflow Amount</th>
                        <th>Outflow Amount</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTransactions.length > 0 ? sortedTransactions.map((transaction) => <UserTransactionRow key = {transaction.id} loggedInUser = {loggedInUser} transaction = {transaction} displayDate = {displayDate} />) : (
                        <tr>
                            <td colSpan = '5'>No transactions to display</td>
                        </tr>)}
                </tbody>
            </Table>

            {userBankAccounts.length > 0 ? <TransferFundsForm userBankAccounts = {userBankAccounts} addBankTransaction = {addBankTransaction} /> : null}
        </div>
    )
}

export default TransactionHistory;
