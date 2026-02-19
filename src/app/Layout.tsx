import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useLanguage } from './context/LanguageContext';

const Layout = () => {
  const { language } = useLanguage();

  return (
    <div 
      className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300"
      style={{ fontFamily: language === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif" }}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
