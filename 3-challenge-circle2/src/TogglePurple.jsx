function TogglePurple({ isPurple, setIsPurple }) {
  return (
    <label>
      Purple
      <input
        type="checkbox"
        value={isPurple}
        onChange={() => setIsPurple(!isPurple)}
      />
    </label>
  );
}

export default TogglePurple;
