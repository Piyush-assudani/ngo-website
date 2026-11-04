import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VolunteerForm from './pages/VolunteerForm';
import About from './pages/About';
import Impact from './pages/Impact';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Footer from './components/Footer';
import DonationModal from './components/DonationModal';
import Funders from './pages/Funders';
import FunderShoutout from './pages/FunderShoutout';
import Magazines from './pages/Magazines';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Home />} />
        <Route path="/volunteer-form" element={<VolunteerForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/apply" element={<VolunteerForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/magazines" element={<Magazines />} />
        <Route path="/magazine" element={<Magazines />} />
        <Route path="/funders" element={<Funders />} />
        <Route path="/funders/:slug" element={<FunderShoutout />} />
      </Routes>
      <Footer />
      <DonationModal />
    </BrowserRouter>
  );
}

export default App;
