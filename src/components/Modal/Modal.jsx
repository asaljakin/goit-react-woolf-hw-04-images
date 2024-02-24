import { useCallback, useEffect } from 'react';

export const Modal = ({ img, textAlt, onClose }) => {
  const closeModalBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClickEsc = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleClickEsc);
    return () => {
      document.removeEventListener('keydown', handleClickEsc);
    };
  }, [handleClickEsc]);

  return (
    <div className="Overlay" onClick={closeModalBackdrop}>
      <img src={img} alt={textAlt} width={'80%'} />
    </div>
  );
};
