import React from 'react';

const Modal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal d-flex align-items-center justify-content-center">
      <div className="modal-content bg-white p-4 rounded">
        <p>Are you sure you want to delete this contact?</p>
        <div className="d-flex justify-content-end">
          <button onClick={onConfirm} className="btn btn-success me-2">Confirm</button>
          <button onClick={onClose} className="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;