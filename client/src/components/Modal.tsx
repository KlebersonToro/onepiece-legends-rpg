// src/components/Modal.tsx
import React from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  children: React.ReactNode; // 'children' é qualquer elemento que passarmos para o Modal
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  // Impede que um clique dentro do conteúdo do modal o feche
  const handleContentClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    // O fundo escurecido (overlay). Clicar nele fecha o modal.
    <div className={styles.modalOverlay} onClick={onClose}>
      {/* A caixa de conteúdo do modal */}
      <div className={styles.modalContent} onClick={handleContentClick}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
