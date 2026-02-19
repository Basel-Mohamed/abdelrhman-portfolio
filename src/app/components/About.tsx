import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Film, Palette, Cpu, Layers } from 'lucide-react';
import projectImg1 from '../../../assets/projects/1.jpg'
import projectImg2 from '../../../assets/projects/2.jpg'
import projectImg3 from '../../../assets/projects/3.jpg'
import projectImg4 from '../../../assets/projects/4.jpg'

const About = () => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';

  const features = [
    { icon: <Film className="w-6 h-6" />, title: t('about.feat1.title'), desc: t('about.feat1.desc') },
    { icon: <Palette className="w-6 h-6" />, title: t('about.feat2.title'), desc: t('about.feat2.desc') },
    { icon: <Cpu className="w-6 h-6" />, title: t('about.feat3.title'), desc: t('about.feat3.desc') },
    { icon: <Layers className="w-6 h-6" />, title: t('about.feat4.title'), desc: t('about.feat4.desc') },
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-[#0b1120] relative overflow-hidden transition-colors duration-500">
      
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          
          {/* Text Content */}
          <div className={`order-2 lg:order-1 ${isRtl ? 'text-right' : 'text-left'}`}>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 relative inline-block">
              {t('about.title')}
              {/* Fixed: Dynamically switch underline from left to right */}
              <span className={`absolute bottom-0 w-1/3 h-1 bg-[#4cc8ed] rounded-full ${isRtl ? 'right-0' : 'left-0'}`}></span>
            </h2>
            
            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              <p>{t('about.p3')}</p>
              <p>{t('about.p4')}</p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700"
                >
                  <div className="p-3 bg-[#4cc8ed]/10 text-[#4cc8ed] rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{feature.title}</h4>
                    <span className="text-xs text-slate-500">{feature.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual / Divider */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
             <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-transparent via-[#4cc8ed] to-transparent opacity-20 hidden lg:block"></div>
             
             {/* Abstract grid of work thumbnails (Mock) */}
             <div className="grid grid-cols-2 gap-4 w-full max-w-md rotate-3 hover:rotate-0 transition-transform duration-500">
               <div className="space-y-4 mt-8">
                 <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-2xl overflow-hidden shadow-lg">
                    <img src={projectImg1} alt="Work 1" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                 </div>
                 <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-2xl overflow-hidden shadow-lg">
                    <img src={projectImg2} alt="Work 2" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                 </div>
               </div>
               <div className="space-y-4">
                 <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-2xl overflow-hidden shadow-lg">
                    <img src={projectImg3} alt="Work 3" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                 </div>
                 <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-2xl overflow-hidden shadow-lg">
                    <img src={projectImg4} alt="Work 4" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                 </div>
               </div>
             </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;