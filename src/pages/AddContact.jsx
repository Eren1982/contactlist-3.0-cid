import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContactContext } from '../Context/ContactContext'; // Corrected import path

const AddContactForm = () => {
  const { addContact, editContact, contacts } = useContext(ContactContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [contactData, setContactData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
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

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="full_name" placeholder="Full Name" value={contactData.full_name} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={contactData.email} onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone" value={contactData.phone} onChange={handleChange} />
      <input type="text" name="address" placeholder="Address" value={contactData.address} onChange={handleChange} />
      <button type="submit">{id ? 'Update Contact' : 'Add Contact'}</button>
    </form>
  );
};

export default AddContactForm;