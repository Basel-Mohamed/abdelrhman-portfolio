import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Briefcase, Calendar } from 'lucide-react';

const Experience = () => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';

  const experiences = [
    {
      role: t('exp.role1'),
      company: t('exp.company1'),
      date: t('exp.date1'),
      desc: t('exp.desc1')
    },
    {
      role: t('exp.role2'),
      company: t('exp.company2'),
      date: t('exp.date2'),
      desc: t('exp.desc2')
    },
    {
      role: t('exp.role3'),
      company: t('exp.company3'),
      date: t('exp.date3'),
      desc: t('exp.desc3')
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-[#0f172a] relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white"
          >
            {t('exp.title')}
          </motion.h2>
          <div className="w-20 h-1 bg-[#4cc8ed] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className={`absolute top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 ${isRtl ? 'right-4 md:right-1/2' : 'left-4 md:left-1/2'} md:translate-x-[0px]`}></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              
              const cardContent = (
                <motion.div 
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm transition-all relative overflow-hidden group h-full"
                >
                  {/* Glow Effect */}
                  <div className={`absolute top-0 ${isRtl ? 'right-0' : 'left-0'} w-1 h-full bg-[#4cc8ed] transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300`}></div>

                  <div className="flex items-center gap-2 text-[#4cc8ed] text-sm font-semibold mb-2">
                     <Calendar size={14} />
                     {exp.date}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{exp.role}</h3>
                  
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-4">
                    <Briefcase size={14} />
                    <span>{exp.company}</span>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {exp.desc}
                  </p>
                </motion.div>
              );

              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  // Fix applied here: Removed `md:flex-row-reverse` because the browser handles it automatically!
                  className="relative flex flex-col md:flex-row w-full"
                >
                  {/* Timeline Dot / Bubble */}
                  <div className={`absolute top-0 w-8 h-8 rounded-full bg-[#4cc8ed] border-4 border-white dark:border-slate-900 shadow-lg shadow-[#4cc8ed]/50 z-10 ${isRtl ? 'right-0 md:right-1/2 md:translate-x-1/2' : 'left-0 md:left-1/2 md:-translate-x-1/2'}`}></div>

                  {/* Content Container */}
                  {isEven ? (
                    <>
                      {/* First card: Automatically goes to Left (LTR) or Right (RTL) */}
                      <div className={`w-full md:w-1/2 ${isRtl ? 'pr-12 md:pr-0 md:pl-12' : 'pl-12 md:pl-0 md:pr-12'}`}>
                        {cardContent}
                      </div>
                      <div className="hidden md:block md:w-1/2"></div>
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block md:w-1/2"></div>
                      {/* Second card: Automatically goes to Right (LTR) or Left (RTL) */}
                      <div className={`w-full md:w-1/2 ${isRtl ? 'pr-12 md:pr-12 md:pl-0' : 'pl-12 md:pl-12 md:pr-0'}`}>
                        {cardContent}
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;