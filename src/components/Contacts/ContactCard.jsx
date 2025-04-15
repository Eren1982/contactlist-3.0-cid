import React, { useContext, useState } from 'react';
import { ContactContext } from '../../Context/ContactContext';
import Modal from './Modal';

const ContactCard = ({ contact }) => {
  const { removeContact } = useContext(ContactContext);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    console.log('Delete button clicked for contact ID:', contact.id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    console.log('Confirming delete for contact ID:', contact.id);
    removeContact(contact.id);
    setShowModal(false);
  };

  return (
    <div className="card mb-3">
      {contact.photo && (
        <img
          src={contact.photo}
          alt="Contact Photo"
          className="card-img-top"
          onError={(e) => {
            e.target.onerror = null;
          }}
          style={{ objectFit: 'cover', height: '200px' }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{contact.name}</h5>
        <p className="card-text">Email: {contact.email}</p>
        <p className="card-text">Phone: {contact.phone}</p>
        <button onClick={handleDelete} className="btn btn-danger me-2">Delete</button>
        <a href={`/add/${contact.id}`} className="btn btn-primary">Edit</a>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} onConfirm={confirmDelete} />
      )}
    </div>
  );
};

export default ContactCard;