import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-4">
      <p>&copy; {new Date().getFullYear()} Contact List</p>
    </footer>
  );
};

export default Footer;