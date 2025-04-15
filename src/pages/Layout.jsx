import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { ContactProvider } from '../Context/ContactContext';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <ContactProvider>
      <ScrollToTop />
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </ContactProvider>
  );
};

export default Layout;