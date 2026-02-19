import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaLinkedin, FaInstagram, FaTiktok, FaFacebook, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      Icon: FaLinkedin, 
      href: 'https://www.linkedin.com/in/abdalrhman-ahmed-1a476031b',
      hoverClass: 'hover:text-[#0077b5] dark:hover:text-[#0077b5]' 
    },
    { 
      name: 'Instagram', 
      Icon: FaInstagram, 
      href: 'https://www.instagram.com/abdalrhman_edits',
      hoverClass: 'hover:text-[#E1306C] dark:hover:text-[#E1306C]' 
    },
    { 
      name: 'TikTok', 
      Icon: FaTiktok, 
      href: 'https://www.tiktok.com/@abdalrhmanahmed179', 
      hoverClass: 'hover:text-black dark:hover:text-white' 
    },
    { 
      name: 'Facebook', 
      Icon: FaFacebook, 
      href: 'https://www.facebook.com/abdalrhman.ahmed.764426?rdid=NcFTKJ6RA5tV7OA0&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1EjHPL1n9n%2F#',
      hoverClass: 'hover:text-[#1877F2] dark:hover:text-[#1877F2]' 
    },
    { 
      name: 'YouTube', 
      Icon: FaYoutube, 
      href: 'https://www.youtube.com/@abdalrhman_ahmed1',
      hoverClass: 'hover:text-[#FF0000] dark:hover:text-[#FF0000]' 
    },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-[#080c16] pt-20 pb-10 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <a href="#" className="text-3xl font-bold tracking-tighter text-slate-800 dark:text-white flex items-center gap-2">
              <span className="bg-[#4cc8ed] text-white w-12 h-12 flex items-center justify-center rounded-xl shadow-lg shadow-[#4cc8ed]/30">
                AA
              </span>
              <span className="hidden sm:block">{t('footer.brand')}</span>
            </a>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              {t('footer.desc')}
            </p>
            <div className="flex gap-4">
               {socialLinks.map((social) => {
                 const { Icon, href, hoverClass, name } = social;
                 return (
                   <a 
                     key={name} 
                     href={href} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     aria-label={name}
                     className={`w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 ${hoverClass}`}
                   >
                     <Icon size={18} />
                   </a>
                 );
               })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">{t('footer.menu')}</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Experience', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-slate-600 dark:text-slate-400 hover:text-[#4cc8ed] dark:hover:text-[#4cc8ed] transition-colors">
                    {t(`nav.${item.toLowerCase()}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">{t('footer.services')}</h4>
            <ul className="space-y-4">
              {['service1', 'service2', 'service3', 'service4'].map((item) => (
                <li key={item}>
                  <span className="text-slate-600 dark:text-slate-400 cursor-default">
                    {t(`footer.${item}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-500 text-sm text-center md:text-left">
            {t('footer.rights')}
          </p>
          <p className="text-slate-400 dark:text-slate-600 text-sm">
            {t('footer.built')}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;