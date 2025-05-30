import React from 'react';
import Banner from '../components/Banner/Banner';
import FeaturedSections from '../components/FeaturedSections/FeaturedSections';
import ContactForm from '../components/ContactForm/ContactForm';

const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <FeaturedSections />
      <ContactForm />
    </>
  );
};

export default Home; 