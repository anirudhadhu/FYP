import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConvert = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [conversionRate, setConversionRate] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        setConversionRate(response.data.rates);
      } catch (error) {
        console.error('Error fetching conversion rates:', error);
      }
    };

    fetchConversionRate();
  }, [fromCurrency]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const convertCurrency = () => {
    const convertedAmount = (amount * conversionRate[toCurrency]).toFixed(2);
    setResult(convertedAmount);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Currency Converter</h2>
      <div className="flex items-center mb-6">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="w-1/3 p-3 border rounded-md mr-4"
        />
        <select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          className="p-3 border rounded-md mr-4"
        >
          {Object.keys(conversionRate).map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <span className="mr-4">to</span>
        <select
          value={toCurrency}
          onChange={handleToCurrencyChange}
          className="p-3 border rounded-md"
        >
          {Object.keys(conversionRate).map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <button onClick={convertCurrency} className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600">
        Convert
      </button>
      {result && (
        <p className="mt-6 text-xl">Converted Amount: {result} {toCurrency}</p>
      )}
    </div>
  );
};

export default CurrencyConvert;
