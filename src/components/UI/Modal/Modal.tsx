import React from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
    if (!show) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modal} onClick={handleModalClick}>
                <div>{children}</div>
                <button onClick={onClose} className={styles.closeButton}>
                    X
                </button>
            </div>
        </div>
    );
};

export default Modal;
