import React, { useState, useEffect } from 'react';
import styles from './CurrencyConverter.module.scss';

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [exchangeRates, setExchangeRates] = useState({
    USD: 1,
    EUR: 1,
    UAH: 1
  });
  const [rateBuy, setRateBuy] = useState({
    USD: 1,
    EUR: 1,
    UAH: 1
  });
  const [convertedAmount, setConvertedAmount] = useState();

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://api.monobank.ua/bank/currency');
        const data = await response.json();

        setExchangeRates({
          USD: data[0].rateSell,
          EUR: data[1].rateSell,
          UAH: 1
        });

        setRateBuy({
          USD: data[0].rateBuy,
          EUR: data[1].rateBuy,
          UAH: 1
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  useEffect(() => {
    const result = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
    setConvertedAmount(result.toFixed(2));
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const handleFromCurrencyChange = e => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = e => {
    setToCurrency(e.target.value);
  };

  const handleAmountChange = e => {
    setAmount(e.target.value);
  };

  
  return (
    <div className={styles['currency-converter']}>
    <header className={styles.header}>
        <h1>Курс валют:</h1>
        <div className={styles['currency-info']}>
          <div>
            <h2>Продаж</h2>
            <p>USD: {exchangeRates.USD}</p>
            <p>EUR: {exchangeRates.EUR}</p>
          </div>
          <div>
            <h2>Купівля</h2>
            <p>USD: {rateBuy.USD}</p>
            <p>EUR: {rateBuy.EUR}</p>
          </div>
        </div>
      </header>

      <h2>Currency Converter</h2>
      <div className={styles['conversion-section']}>
        <label>From Currency:</label>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
        <br />
        <label>To Currency:</label>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
        <br />
        <div>
          <label>Amount:</label>
          <input type="number" value={amount} onChange={handleAmountChange} />
          <br />
        </div>
        <br />
      </div>
      <div className={styles.result}>
        {convertedAmount && (
          <p>
            Converted Amount: {amount} {toCurrency} = {convertedAmount} {fromCurrency}
          </p>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
