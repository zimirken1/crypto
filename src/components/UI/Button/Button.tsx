import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
    text: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className?: string;
    disabled?: boolean;
    icon?: JSX.Element;
}

const Button: React.FC<ButtonProps> = ({
    text,
    type = 'button',
    onClick,
    className,
    disabled,
    icon,
}) => {
    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.stopPropagation();

        if (onClick) {
            onClick(e);
        }
    };

    return (
        <button
            type={type}
            onClick={handleClick}
            className={`${styles.btn} ${className}`}
            disabled={disabled}
        >
            {icon && <span className={styles['btn-icon']}>{icon}</span>}
            {text}
        </button>
    );
};

export default Button;
