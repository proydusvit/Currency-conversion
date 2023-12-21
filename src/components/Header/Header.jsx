import styles from '../../CurrencyConverter.module.scss';
import CurrencyInfo from './CurrencyInfo';

const Header = ({ exchangeRates, rateBuy }) => {
  const { USD: USDRates, EUR: EURRates } = exchangeRates;
  const { USD: USDBuy, EUR: EURBuy } = rateBuy;
  return (
    <header className={styles.header}>
      <h1>Курс валют:</h1>
      <div className={styles.currency_info}>
        <CurrencyInfo
          title="Продаж"
          currencies={{ USD: USDRates, EUR: EURRates }}
        />
        <CurrencyInfo
          title="Купівля"
          currencies={{ USD: USDBuy, EUR: EURBuy }}
        />
      </div>
    </header>
  );
};

export default Header;
