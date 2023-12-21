import { useState } from 'react';

import useExchangeRates from './Service/service';

import Wraper from './components/Wraper/Wraper';
import Converter from './components/Converter/Converter';
import Header from './components/Header/Header';
import Result from './components/Result/Result';

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('UAH');

  const [amount, setAmount] = useState(1);

  const { exchangeRates, rateBuy, useCurrencyConversion } = useExchangeRates();
  const convertedAmount = useCurrencyConversion(
    amount,
    fromCurrency,
    toCurrency,
  );

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
    } else {
      setAmount(0);
    }
  };

  return (
    <Wraper>
      <Header exchangeRates={exchangeRates} rateBuy={rateBuy} />
      <Converter
        toCurrency={toCurrency}
        handleToCurrencyChange={handleToCurrencyChange}
        fromCurrency={fromCurrency}
        handleFromCurrencyChange={handleFromCurrencyChange}
        amount={amount}
        handleAmountChange={handleAmountChange}
      />
      <Result
        amount={amount}
        toCurrency={toCurrency}
        convertedAmount={convertedAmount}
        fromCurrency={fromCurrency}
      />
    </Wraper>
  );
};

export default CurrencyConverter;
