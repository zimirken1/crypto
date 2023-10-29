import React from 'react';
import styles from './Input.module.scss'

interface InputProps {
    value: string;
    onChange: (value: string) => void;
    type?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    maxLength?: number;
}

const Input: React.FC<InputProps> = ({
                                         value,
                                         onChange,
                                         type = 'text',
                                         placeholder,
                                         className,
                                         disabled,
                                         maxLength
                                     }) => {

    return (
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`${styles.input} ${className}`}
            disabled={disabled}
            maxLength={maxLength}
        />
    );
}

export default Input;
