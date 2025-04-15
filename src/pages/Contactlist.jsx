import React, { useContext } from 'react';
import { ContactContext } from '../Context/ContactContext';
import ContactCard from '../components/Contacts/ContactCard';

const ContactList = () => {
  const { contacts, loading, error } = useContext(ContactContext);

  console.log('Contacts:', contacts); // Log the contacts state

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-4">
      <h2>Lista de Contactos</h2>
      <div className="row">
        {contacts.map((contact) => (
          <div className="col-12 col-md-3 mb-4" key={contact.id}>
            <ContactCard contact={contact} />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <a href="/add" className="btn btn-primary">Añadir un nuevo contacto</a>
      </div>
    </div>
  );
};

export default ContactList;
