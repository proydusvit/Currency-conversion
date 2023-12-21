const CurrencyInfo = ({ title, currencies }) => {
  return (
    <div>
      <h2>{title}</h2>
      {Object.entries(currencies).map(([currency, value]) => (
        <p key={currency}>
          {currency}: {value}
        </p>
      ))}
    </div>
  );
};

export default CurrencyInfo;
