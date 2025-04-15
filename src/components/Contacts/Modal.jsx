import React from 'react';

const Modal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal d-flex align-items-center justify-content-center">
      <div className="modal-content bg-white p-4 rounded">
        <p>Seguro que quieres borrar este contacto?</p>
        <div className="d-flex justify-content-end">
          <button onClick={onConfirm} className="btn btn-success me-2">Confirmar</button>
          <button onClick={onClose} className="btn btn-secondary">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;