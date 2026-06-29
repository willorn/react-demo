function AppInput({ type, value, setValue, onChange }) {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default AppInput;
