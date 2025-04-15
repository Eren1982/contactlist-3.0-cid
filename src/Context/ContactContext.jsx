import React, { createContext, useState, useEffect } from 'react';
import { getContacts, createContact, updateContact, deleteContact } from './Action';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Recuperar fotos locales desde localStorage
  const getPhotoMap = () => JSON.parse(localStorage.getItem("photoMap")) || {};
  const setPhotoMap = (map) => localStorage.setItem("photoMap", JSON.stringify(map));

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      const photoMap = getPhotoMap();

      let fetchedContacts = Array.isArray(data)
        ? data
        : data?.contacts || [];

      // Reasignar fotos desde localStorage
      fetchedContacts = fetchedContacts.map((c) => ({
        ...c,
        photo: photoMap[c.id] || '',
      }));

      setContacts(fetchedContacts);
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
      const newId = result.id || result?.contact?.id;
      if (newId && newContact.photo) {
        const photoMap = getPhotoMap();
        photoMap[newId] = newContact.photo;
        setPhotoMap(photoMap);
      }
      setTimeout(fetchContacts, 100);
    } catch (err) {
      setError(err);
    }
  };

  const editContact = async (id, updatedContact) => {
    try {
      await updateContact(id, updatedContact);
      if (updatedContact.photo) {
        const photoMap = getPhotoMap();
        photoMap[id] = updatedContact.photo;
        setPhotoMap(photoMap);
      }
      fetchContacts();
    } catch (err) {
      setError(err);
    }
  };

  const removeContact = async (id) => {
    try {
      await deleteContact(id);
      const photoMap = getPhotoMap();
      delete photoMap[id];
      setPhotoMap(photoMap);
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
