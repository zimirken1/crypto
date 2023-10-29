import React from 'react';
import styles from './Select.module.scss';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
                                           options,
                                           value,
                                           onChange,
                                           placeholder,
                                           className,
                                           disabled
                                       }) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${styles.select} ${className}`}
            disabled={disabled}
        >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default Select;
