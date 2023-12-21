import styles from '../../CurrencyConverter.module.scss';
import currencyList from '../CurrencyList//currencyList.json';
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
        <label>З валюти:</label>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {currencyList.map(({ name }, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
        <label>До валюти:</label>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {currencyList.map(({ name }, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>

        <div>
          <label>Сума:</label>
          <input type="number" value={amount} onChange={handleAmountChange} />
        </div>
      </div>
    </>
  );
};

export default Converter;
