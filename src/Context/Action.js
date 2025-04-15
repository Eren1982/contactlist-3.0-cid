const API_URL = 'https://playground.4geeks.com/contact/agendas/Luiscid/contacts';

export const getContacts = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  return response.json();
};

export const createContact = async (contact) => {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: contact.full_name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
      photo: contact.photo,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to create contact');
  }
  return response.json();
};

export const updateContact = async (id, contact) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: contact.full_name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
      photo: contact.photo,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to update contact');
  }
  return response.json();
};

export const deleteContact = async (id) => {
  console.log('Deleting contact with ID:', id);
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  console.log('API Response (deleteContact):', response);
  if (!response.ok) {
    throw new Error('Failed to delete contact');
  }

  try {
    return await response.json();
  } catch (error) {
    console.warn('Response is not JSON:', error);
    return null;
  }
};