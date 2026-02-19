import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact';

const Home = () => {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <About />
      <Experience />
      <Contact />
    </main>
  );
};

export default Home;
