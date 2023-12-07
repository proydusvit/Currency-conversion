import { useState, useEffect } from 'react';
import styles from './CurrencyConverter.module.scss';


const CurrencyConverter = () => {

  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('UAH');
  const [amount, setAmount] = useState(1);

  const [exchangeRates, setExchangeRates] = useState({
    USD: 1,
    EUR: 1,
    UAH: 1,
    ZLT:1
  });

  const [rateBuy, setRateBuy] = useState({
    USD: 1,
    EUR: 1,
    UAH: 1,
 
  });

  const [convertedAmount, setConvertedAmount] = useState();

  useEffect(() => {

    const fetchExchangeRates = async () => {

      try {
        const response = await fetch('https://api.monobank.ua/bank/currency');
        const data = await response.json();
        const zltfilter = data.find(currency => currency.currencyCodeA === 985);

        setExchangeRates({
          USD: data[0].rateSell,
          EUR: data[1].rateSell,
          UAH: 1,
          ZLT: zltfilter.rateCross,
        });

        setRateBuy({
          USD: data[0].rateBuy,
          EUR: data[1].rateBuy,
          UAH: 1,

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
    const inputValue = e.target.value;

    if (inputValue >= 0) {
    setAmount(inputValue);
    } 
    else {
      setAmount(0);
    }
  
  };

  

  return (
    <div className={styles.currency}>
    <header className={styles.header}>
        <h1>Курс валют:</h1>
        <div className={styles.currency_info}>
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

      <h2>Конвертер валют</h2>
      <div className={styles.conversion_section}>
        
        <label>З валюти:</label>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
            <option value="ZLT">ZLT</option>
        </select>
     
        <label>До валюти:</label>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
            <option value="ZLT">ZLT</option>
        </select>

        <div>
          <label>Сума:</label>
          <input type="number" value={amount} onChange={handleAmountChange} />
    
        </div>
     
      </div>
      <div className={styles.conversion_result}>
      
          <>
            <p> У мене є: {amount} {toCurrency}  </p>
            
            <p>Я отримаю: {convertedAmount} {fromCurrency}</p>
          </>
       
      </div>
    </div>
  );
};

export default CurrencyConverter;
