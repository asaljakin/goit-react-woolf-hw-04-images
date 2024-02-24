import { useEffect } from 'react';

export const Modal = ({ img, textAlt, onClose }) => {
  const closeModalBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleClickEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleClickEsc);
    return () => {
      document.removeEventListener('keydown', handleClickEsc);
    };
  }, [onClose]);

  return (
    <div className="Overlay" onClick={closeModalBackdrop}>
      <img src={img} alt={textAlt} width={'80%'} />
    </div>
  );
};
