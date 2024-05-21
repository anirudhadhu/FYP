import React from "react";

export default function CurrencyRow(props) {
  // Destructure props to extract relevant properties
  const {
    currencyOptions, // Array of available currency options
    selectedCurrency, // Currently selected currency
    onChangeCurrency, // Function to handle currency selection change
    onChangeAmount, // Function to handle amount change
    amount, // Current amount value
  } = props;
  return (
    <div>
      {/* Input for entering the amount */}
      <input
        type="number"
        className="input"
        value={amount}
        onChange={onChangeAmount}
      />
      {/* Dropdown for selecting a currency */}
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {/* Map over currencyOptions to create dropdown options */}
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
