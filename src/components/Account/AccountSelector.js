import React, { useState } from 'react';
import Select from 'react-select';
import './AccountSelector.scss';

const accounts = [
  { value: 'FR7630004015330001006189487', label: 'Compte chèque', account: 'FR76 3000 4015 3300 0100 6189 487' },
  { value: 'FR7630004015330001006189488', label: 'Compte épargne', account: 'FR76 3000 4015 3300 0100 6189 488' },
  { value: 'MA77778665555771234567899', label: 'Compte chèque', account: 'MA77 7778 6655 5577 1234 5678 99' },
];

function AccountSelector() {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedAccount(selectedOption); // Set the selected account
  };

  const handleDelete = () => {
    setSelectedAccount(null); // Reset the selected account when delete button is clicked
  };

  return (
    <div className="container">
      <div className="mt-3">
        <label htmlFor="accountSelect">Choisir un compte :</label>
        <Select
          id="accountSelect"
          options={accounts}
          getOptionLabel={(e) => (
            <div className="account-item">
              <span className="account-label">{e.label}</span>
              <div className="account-details">
                <img
                  src={`https://flagcdn.com/w320/${e.value.startsWith('FR') ? 'fr' : 'ma'}.png`}
                  alt="Flag"
                  className="flag-icon"
                />
                <span className="account-number">{e.account}</span>
              </div>
            </div>
          )}
          onChange={handleChange}
          placeholder="Sélectionner un compte"
        />
      </div>

      {selectedAccount && (
        <div className="chip-container">
          <div className="chip">
            <span className="chip-label">{selectedAccount.label}</span>
            <span className="chip-account">{selectedAccount.account}</span>
            <button className="chip-delete" onClick={handleDelete}>
              &times; {/* Cross symbol */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountSelector;
