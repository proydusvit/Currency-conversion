import { useState, useEffect } from 'react';

const useExchangeRates = () => {
  const [currencyRates, setCurrencyRates] = useState({
    exchangeRates: {
      USD: 1,
      EUR: 1,
      UAH: 1,
      ZLT: 1,
    },
    rateBuy: {
      USD: 1,
      EUR: 1,
      UAH: 1,
    },
    convertedAmount: null,
  });

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://api.monobank.ua/bank/currency');
        const data = await response.json();
        const zltfilter = data.find(currency => currency.currencyCodeA === 985);

        const updatedRates = {
          exchangeRates: {
            USD: data[0].rateSell,
            EUR: data[1].rateSell,
            UAH: 1,
            ZLT: zltfilter.rateCross,
          },
          rateBuy: {
            USD: data[0].rateBuy,
            EUR: data[1].rateBuy,
            UAH: 1,
          },
        };

        setCurrencyRates(updatedRates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  const useCurrencyConversion = (amount, fromCurrency, toCurrency) => {
    const result =
      (amount / currencyRates.exchangeRates[fromCurrency]) *
      currencyRates.exchangeRates[toCurrency];
    const convertedAmount = result.toFixed(2);
    return convertedAmount;
  };

  return {
    exchangeRates: currencyRates.exchangeRates,
    rateBuy: currencyRates.rateBuy,
    useCurrencyConversion,
  };
};

export default useExchangeRates;
