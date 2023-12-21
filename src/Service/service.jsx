import { useState, useEffect } from 'react';

const useExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState({
    USD: 1,
    EUR: 1,
    UAH: 1,
    ZLT: 1,
  });

  const [rateBuy, setRateBuy] = useState({
    USD: 1,
    EUR: 1,
    UAH: 1,
  });

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

  return { exchangeRates, rateBuy };
};

export default useExchangeRates;
