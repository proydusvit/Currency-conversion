import styles from '../../CurrencyConverter.module.scss';
import currencyList from './currencyList.json';
import CurrencyInput from './CurrencyInput';
const Converter = ({
  toCurrency,
  handleToCurrencyChange,
  fromCurrency,
  handleFromCurrencyChange,
  amount,
  handleAmountChange,
}) => {
  return (
    <>
      <h2>Конвертер валют</h2>
      <div className={styles.conversion_section}>
        <CurrencyInput
          label="З валюти:"
          value={toCurrency}
          onChange={handleToCurrencyChange}
          options={currencyList.map(({ name }) => name)}
        />
        <CurrencyInput
          label="До валюти:"
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          options={currencyList.map(({ name }) => name)}
        />

        <div>
          <label>Сума:</label>
          <input type="number" value={amount} onChange={handleAmountChange} />
        </div>
      </div>
    </>
  );
};

export default Converter;
