import React, { useContext } from 'react';
import { ContactContext } from '../Context/ContactContext';
import ContactCard from '../components/Contacts/ContactCard';

const ContactList = () => {
  const { contacts, loading, error } = useContext(ContactContext);

  console.log('Contacts:', contacts); // Log the contacts state

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Contact List</h2>
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
      <a href="/add">Add new Contact</a>
    </div>
  );
};

export default ContactList;