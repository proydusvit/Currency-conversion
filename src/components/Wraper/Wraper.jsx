import styles from '../../CurrencyConverter.module.scss';

const Wraper = ({ children }) => {
  return <section className={styles.currency}>{children}</section>;
};

export default Wraper;
