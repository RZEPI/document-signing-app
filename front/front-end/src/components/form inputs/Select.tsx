const Select: React.FC<{options: number[] | string[], value:number | string, name:string, label:string, error: string | undefined}> = ({ options, value, name, label, error }) => {
    return (
        <div className="group-select">
        <label htmlFor={name}>{label}</label>
        <select name={name} defaultValue={value}>
            {options.map((option) => (<option key={option} value={option}>{option}</option>))}
            {error && <span>{error}</span>}
        </select>
        </div>
    );
}

export default Select;