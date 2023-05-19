import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from 'components/modal/Modal.module.css';

const Modal = ({ onClose, selectedImage }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  
  return (
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.modalContent}>
    
        <img src={selectedImage} alt="Selected" />
      </div>
    </div>
  );
};

export default Modal;  

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedImage: PropTypes.string.isRequired,
};






  



