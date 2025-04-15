import React, { useContext, useState } from 'react';
import { ContactContext } from '../../Context/ContactContext';
import Modal from './Modal';

const ContactCard = ({ contact }) => {
  const { removeContact } = useContext(ContactContext);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => setShowModal(true);

  const confirmDelete = () => {
    removeContact(contact.id);
    setShowModal(false);
  };

  return (
    <div
      className="card"
      style={{
        width: '240px',
        margin: '20px',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #f9f9f9, #e3e3e3)',
        boxShadow: '0 6px 14px rgba(0,0,0,0.08)',
        fontFamily: "'Poppins', sans-serif",
        color: '#333'
      }}
    >
      {/* Imagen */}
      <img
        src={contact.photo || 'https://via.placeholder.com/300x200?text=No+Photo'}
        alt="Foto del contacto"
        style={{
          width: '100%',
          height: '180px',
          objectFit: 'cover',
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
        }}
      />

      {/* Contenido */}
      <div className="card-body px-3 py-3">
        <h5
          className="card-title"
          style={{
            fontWeight: 600,
            fontSize: '1.1rem',
            marginBottom: '0.5rem',
            color: '#2c3e50',
          }}
        >
          {contact.name}
        </h5>
        <p className="card-text" style={{ fontSize: '0.9rem', color: '#555' }}>
          📧 {contact.email}
        </p>
        <p className="card-text" style={{ fontSize: '0.9rem', color: '#555' }}>
          📞 {contact.phone}
        </p>
        <p className="card-text" style={{ fontSize: '0.9rem', color: '#555' }}>
          🏠 {contact.address || 'No address'}
        </p>

        <div className="d-flex justify-content-between mt-3">
          <button onClick={handleDelete} className="btn btn-sm btn-outline-danger">
            🗑
          </button>
          <a href={`/add/${contact.id}`} className="btn btn-sm btn-outline-primary">
            ✏️
          </a>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)} onConfirm={confirmDelete} />
      )}
    </div>
  );
};

export default ContactCard;
