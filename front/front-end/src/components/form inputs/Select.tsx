const Select: React.FC<{options: number[], value:number, name:string, label:string, error: string | undefined}> = ({ options, value, name, label, error }) => {
    return (
        <>
        <label htmlFor={name}>{label}</label>
        <select name={name} value={value}>
            {options.map((option) => (<option key={option} value={option}>{option}</option>))}
            {error && <span>{error}</span>}
        </select>
        </>
    );
}

export default Select;