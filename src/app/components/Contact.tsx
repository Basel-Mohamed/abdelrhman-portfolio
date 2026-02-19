import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();

  const contactDetails = [
    {
      icon: <Mail size={32} />,
      title: t('contact.email'),
      value: 'abdalrhmanah66@gmail.com',
      href: 'mailto:abdalrhmanah66@gmail.com'
    },
    {
      icon: <Phone size={32} />,
      title: t('contact.phone'),
      value: '01020891466',
      href: 'tel:+201020891466'
    },
    {
      icon: <MapPin size={32} />,
      title: t('contact.location'),
      value: 'Maadi, Cairo',
      href: 'https://maps.google.com/?q=Maadi,Cairo', // Opens map
      target: '_blank'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-[#0b1120] transition-colors duration-500 relative">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white"
          >
            {t('contact.title')}
          </motion.h2>
          <div className="w-20 h-1 bg-[#4cc8ed] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Centered Contact Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactDetails.map((detail, index) => (
            <motion.a
              key={index}
              href={detail.href}
              target={detail.target}
              rel={detail.target ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-[#4cc8ed]/10 text-[#4cc8ed] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#4cc8ed] group-hover:text-white transition-all duration-300 shadow-lg shadow-transparent group-hover:shadow-[#4cc8ed]/30">
                {detail.icon}
              </div>
              <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                {detail.title}
              </h4>
              <p className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#4cc8ed] transition-colors break-all">
                {detail.value}
              </p>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Contact;