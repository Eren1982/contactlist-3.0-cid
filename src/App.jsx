import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contacts from './pages/Contactlist';
import AddContactForm from './components/Contacts/AddContactform';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import { ContactProvider } from './Context/ContactContext';

function App() {
  return (
    <Router>
      <ContactProvider>
        <Navbar />
        <main className="container mt-4">
          <Routes>
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/add" element={<AddContactForm />} />
            <Route path="/add/:id" element={<AddContactForm />} />
            <Route path="/" element={<Contacts />} />
          </Routes>
        </main>
        <ScrollToTop />
        <Footer />
      </ContactProvider>
    </Router> 
  );
}

export default App;