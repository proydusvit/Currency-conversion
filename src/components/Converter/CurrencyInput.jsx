const CurrencyInput = ({ label, value, onChange, options }) => {
  return (
    <>
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {options.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </>
  );
};

export default CurrencyInput;
