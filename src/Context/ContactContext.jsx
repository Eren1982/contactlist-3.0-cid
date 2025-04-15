import React, { createContext, useState, useEffect } from 'react';
import { getContacts, createContact, updateContact, deleteContact } from './Action';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      console.log('API Response (fetchContacts):', data);
      if (Array.isArray(data)) {
        setContacts(data);
      } else if (data && Array.isArray(data.contacts)) {
        setContacts(data.contacts);
      } else {
        setContacts([]);
      }
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      setContacts([]);
    }
  };

  const addContact = async (newContact) => {
    try {
      const result = await createContact(newContact);
      console.log('API Response (addContact):', result);
      setTimeout(fetchContacts, 100);
    } catch (err) {
      setError(err);
    }
  };

  const editContact = async (id, updatedContact) => {
    try {
      await updateContact(id, updatedContact);
      fetchContacts();
    } catch (err) {
      setError(err);
    }
  };

  const removeContact = async (id) => {
    try {
      console.log('Removing contact with ID:', id);
      await deleteContact(id);
      fetchContacts();
    } catch (err) {
      setError(err);
    }
  };

  const value = {
    contacts,
    loading,
    error,
    addContact,
    editContact,
    removeContact,
    fetchContacts,
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;