import React, { useState, useContext, useEffect } from 'react';
import { ContactContext } from '../../Context/ContactContext';
import { useNavigate, useParams } from 'react-router-dom';

const AddContactForm = () => {
  const { addContact, editContact, contacts } = useContext(ContactContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [contactData, setContactData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    photo: '',
  });

  useEffect(() => {
    if (id) {
      const contactToEdit = contacts.find((contact) => contact.id === parseInt(id));
      if (contactToEdit) {
        setContactData({
          full_name: contactToEdit.name,
          email: contactToEdit.email,
          phone: contactToEdit.phone,
          address: contactToEdit.address,
          photo: contactToEdit.photo,
        });
      }
    }
  }, [id, contacts]);

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      editContact(parseInt(id), contactData);
    } else {
      addContact(contactData);
    }
    navigate('/contacts');
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <form
        className="p-4 shadow-lg"
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: '500px',
          borderRadius: '16px',
          background: 'linear-gradient(145deg, #f5f7fa, #e8ebf0)',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <h3 className="mb-4 text-center" style={{ fontWeight: 600, color: '#2c3e50' }}>
          {id ? 'Editar Contacto' : 'Añadir Contacto'}
        </h3>

        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control rounded-pill" name="full_name" value={contactData.full_name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control rounded-pill" name="email" value={contactData.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input type="text" className="form-control rounded-pill" name="phone" value={contactData.phone} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input type="text" className="form-control rounded-pill" name="address" value={contactData.address} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Foto</label>
          <input type="text" className="form-control rounded-pill" name="photo" value={contactData.photo} onChange={handleChange} />
          {!validateUrl(contactData.photo) && contactData.photo && (
            <div className="text-danger mt-1">URL inválida</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 rounded-pill"
          style={{ fontWeight: 500 }}
        >
          {id ? 'Actualizar Contacto' : 'Añadir Contacto'}
        </button>
      </form>
    </div>
  );
};

export default AddContactForm;
