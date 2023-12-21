import styles from '../../CurrencyConverter.module.scss';
const Result = ({ amount, toCurrency, convertedAmount, fromCurrency }) => {
  return (
    <div className={styles.conversion_result}>
      <>
        <p>
          У мене є: {amount} {toCurrency}
        </p>

        <p>
          Я отримаю: {convertedAmount} {fromCurrency}
        </p>
      </>
    </div>
  );
};

export default Result;
