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
    <form className="container mt-4" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input type="text" className="form-control" name="full_name" value={contactData.full_name} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" name="email" value={contactData.email} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input type="text" className="form-control" name="phone" value={contactData.phone} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Address</label>
        <input type="text" className="form-control" name="address" value={contactData.address} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Photo URL</label>
        <input type="text" className="form-control" name="photo" value={contactData.photo} onChange={handleChange} />
        {!validateUrl(contactData.photo) && contactData.photo && (
          <div className="text-danger">Invalid URL</div>
        )}
      </div>
      <button type="submit" className="btn btn-primary">{id ? 'Update Contact' : 'Add Contact'}</button>
    </form>
  );
};

export default AddContactForm;