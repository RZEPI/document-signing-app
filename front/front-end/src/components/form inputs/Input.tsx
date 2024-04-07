const Input: React.FC<{
  label: string;
  type: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number | string | undefined;
  error: string | undefined;
}> = ({ label, type, name, value, onChange, error=undefined }) => {
    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        onChange(e);
    }

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} value={value} onChange={changeHandler} />
      {error &&<span>{error}</span>}
    </div>
  );
};

export default Input;