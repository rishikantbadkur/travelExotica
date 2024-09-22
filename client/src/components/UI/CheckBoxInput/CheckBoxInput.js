function CheckBoxInput({ name, value, onChange }) {
  return (
    <input type="checkbox" name={name} value={value} onChange={onChange} />
  );
}

export default CheckBoxInput;
