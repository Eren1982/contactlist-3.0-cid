import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import ContactList from './pages/Contactlist';
import AddContact from './pages/AddContact';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/add/:id" element={<AddContact />} />
          <Route index element={<ContactList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;