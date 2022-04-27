import React, {useState} from 'react';

function TransferFundsForm({ userBankAccounts, addBankTransaction }) {
    const [formData, setFormData] = useState({
        toFrom: "to", 
        bankAccount: userBankAccounts[0].id, 
        transactionAmount: 20.00
    })

    function updateFormData(event) {
        let newFormData = {...formData};
        newFormData[event.target.name] = event.target.value;
        setFormData(newFormData);
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        addBankTransaction(formData);
    }
    return (
        <div>
            <br />
            <hr />
            <br />
            <h2>Transfer Funds</h2>
            <form onSubmit = {handleFormSubmit}>
                <label>Transfer funds: </label>
                <select name = "toFrom" value = {formData.toFrom} onChange = {updateFormData}>
                    <option value = "to">To bank account</option>
                    <option value = "from">From bank account</option>
                </select>
                <br />

                <label>Bank account: </label>
                <select name = "bankAccount" value = {formData.bankAccount} onChange = {updateFormData}>
                    {userBankAccounts.map((account) => <option key = {account.id} value = {account.id}>{account.bank_name} - {account.account_number}</option>)}
                </select>
                <br />

                <label>Transfer amount: $</label>
                <input type = 'number' name = 'transactionAmount' step = '0.01' value = {formData.transactionAmount} onChange = {updateFormData}/>
                <br />

                <button className = 'app_buttons'>Submit</button>
            </form>
        </div>
    )
}

export default TransferFundsForm;
