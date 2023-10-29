import React from 'react';
import styles from './Button.module.scss'

interface ButtonProps {
    text: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void | undefined;
    className?: string;
    disabled?: boolean;
    icon?: JSX.Element;
}

const Button: React.FC<ButtonProps> = ({ text, type = 'button', onClick, className, disabled, icon }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles.btn} ${className}`}
            disabled={disabled}
        >
            {icon && <span className="btn-icon">{icon}</span>}
            {text}
        </button>
    );
}

export default Button;

