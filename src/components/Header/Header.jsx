import styles from '../../CurrencyConverter.module.scss';
const Header = ({ exchangeRates, rateBuy }) => {
  return (
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
  );
};

export default Header;
