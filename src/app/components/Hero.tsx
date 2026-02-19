import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Video, Brain, Palette } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import profileImg from "../../../assets/1.jpg"

const Hero = () => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const badges = [
    { text: t('hero.badge.video'), icon: <Video size={14} /> },
    { text: t('hero.badge.ai'), icon: <Brain size={14} /> },
    { text: t('hero.badge.graphic'), icon: <Palette size={14} /> },
  ];

  const stats = [
    { num: 2, suffix: "+", label: t('hero.stats.exp') },
    { num: 50, suffix: "+", label: t('hero.stats.projects') },
    { num: 100, suffix: "%", label: t('hero.stats.strategy') },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#0f172a] transition-colors duration-500 pt-24 pb-12 lg:pt-32">

      {/* 1. Background Depth - Optimized with transform/opacity */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Large blurred gradient circle behind text */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-1/4 ${isRtl ? '-right-[10%]' : '-left-[10%]'} w-[800px] h-[800px] bg-[#4cc8ed]/10 rounded-full blur-[120px] mix-blend-screen dark:mix-blend-screen`}
        />

        {/* Secondary soft mesh gradient */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute bottom-0 ${isRtl ? 'left-0' : 'right-0'} w-[600px] h-[600px] bg-purple-500/5 dark:bg-purple-900/10 rounded-full blur-[100px]`}
        />

        {/* Floating Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#4cc8ed] rounded-full"
            initial={{ opacity: 0, x: Math.random() * 1000, y: Math.random() * 800 }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2
            }}
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* UPDATED: max-w-[1440px] and dynamic responsive padding */}
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content - Typography & CTA */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`flex flex-col gap-8 ${isRtl ? 'lg:text-right' : 'lg:text-left'} text-center`}
          >
            {/* 2. Professional Role Badges */}
            <motion.div variants={itemVariants} className={`flex flex-wrap gap-3 justify-center ${isRtl ? 'lg:justify-end' : 'lg:justify-start'}`}>
              {badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm hover:border-[#4cc8ed]/50 hover:bg-[#4cc8ed]/5 transition-all cursor-default group"
                >
                  <span className="text-[#4cc8ed] group-hover:scale-110 transition-transform duration-300">{badge.icon}</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 tracking-wide uppercase">{badge.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Name Tag */}
            <motion.div variants={itemVariants}>
              <h2 className="text-lg font-bold text-[#4cc8ed] mb-2 tracking-widest uppercase flex items-center gap-3 justify-center lg:justify-start flex-row-reverse lg:flex-row">
                <span className="w-12 h-[2px] bg-[#4cc8ed]"></span>
                Abdalrhman Ahmed
                <span className={`w-12 h-[2px] bg-[#4cc8ed] lg:hidden`}></span>
              </h2>

              {/* 1. Strengthen Typography Hierarchy */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight mb-4">
                {t('hero.mainHeadline')}
              </h1>

              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                {t('hero.subHeadline')}
              </p>
            </motion.div>

            {/* 6. Refine CTA Section */}
            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRtl ? 'lg:justify-end' : 'lg:justify-start'}`}>
                <motion.a
                  whileHover={{ y: -4, shadow: "0 20px 25px -5px rgba(76, 200, 237, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="px-8 py-4 bg-[#4cc8ed] text-white font-bold rounded-xl shadow-lg shadow-[#4cc8ed]/25 transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t('hero.cta.work')}
                    <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </span>
                  {/* Button Glow Effect */}
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 backdrop-blur-sm" />
                </motion.a>

                <motion.a
                  whileHover={{ backgroundColor: "rgba(76, 200, 237, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  target='blank'
                  href="https://drive.google.com/drive/u/1/folders/19MoOFdx__BZsQSN6X3gl00CX0UdksrVy"
                  className="px-8 py-4 bg-transparent text-slate-900 dark:text-white font-bold rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-[#4cc8ed] dark:hover:border-[#4cc8ed] transition-all flex items-center justify-center gap-2 group"
                >
                  <Play className="w-5 h-5 fill-current text-[#4cc8ed] group-hover:scale-110 transition-transform" />
                  {t('hero.cta.portfolio')}
                </motion.a>
              </div>
            </motion.div>

            {/* 3. Credibility Stats Section */}
            <motion.div
              variants={itemVariants}
              className={`pt-8 mt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-8 justify-center ${isRtl ? 'lg:justify-end' : 'lg:justify-start'}`}
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 ${i !== stats.length - 1 ? (isRtl ? 'border-l border-slate-200 dark:border-slate-800 pl-8 md:pl-12' : 'border-r border-slate-200 dark:border-slate-800 pr-8 md:pr-12') : ''}`}
                >
                  <div className={`text-left ${isRtl ? 'text-right' : ''}`}>
                    <h4 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center">
                      <AnimatedNumber value={stat.num} suffix={stat.suffix} />
                    </h4>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - 5. Enhance Photo & Icon Area */}
          <div className="relative flex justify-center lg:justify-end items-center h-[500px] md:h-[600px] w-full -mt-8 lg:-mt-16">

            {/* Main Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] z-10"
            >
              {/* Rotating Rings */}
              <div className="absolute inset-[-40px] rounded-full border border-[#4cc8ed]/20 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-[-20px] rounded-full border border-dashed border-[#4cc8ed]/30 animate-[spin_15s_linear_infinite_reverse]" />

              {/* Glow Behind Image */}
              <div className="absolute inset-0 bg-[#4cc8ed]/20 blur-[60px] rounded-full animate-pulse" />

              {/* Image Itself */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-[6px] border-white dark:border-slate-800 shadow-2xl shadow-[#4cc8ed]/20"> 
                <img
                  src={profileImg}
                  alt="Abdalrhman Ahmed"
                  className="w-full h-full object-cover scale-105"
                />
              </div>

              {/* Floating Icons */}
              <FloatingIcon
                delay={0}
                className="absolute -top-6 -right-6 md:top-0 md:-right-8 bg-[#00005b] text-[#9999ff] border-[#9999ff]/30 shadow-[#00005b]/50"
                label="Pr"
                subLabel="Premiere"
              />
              <FloatingIcon
                delay={1.5}
                className="absolute top-1/2 -right-16 md:-right-24 bg-[#330000] text-[#ff9a00] border-[#ff9900]/30 shadow-[#330000]/50"
                label="Ai"
                subLabel="Illustrator"
              />
              <FloatingIcon
                delay={0.8}
                className="absolute bottom-4 -left-4 md:bottom-10 md:-left-6 bg-[#1a0033] text-[#d9a8ff] border-[#d9a8ff]/30 shadow-[#1a0033]/50"
                label="Ae"
                subLabel="After Effects"
              />
              <FloatingIcon
                delay={2.2}
                className="absolute top-10 -left-6 md:top-16 md:-left-12 bg-[#001833] text-[#31a8ff] border-[#31a8ff]/30 shadow-[#001833]/50"
                label="Ps"
                subLabel="Photoshop"
              />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

// --- Custom Animated Number Component ---
const AnimatedNumber = ({ value, suffix }: { value: number, suffix: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2000; // Total animation time (2 seconds)

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < duration) {
        // Easing out so the numbers slow down as they reach the target
        const easeOut = 1 - Math.pow(1 - progress / duration, 4);
        setCount(Math.floor(easeOut * value));
        requestAnimationFrame(updateCounter);
      } else {
        setCount(value);
      }
    };

    // Delay the start slightly so it happens smoothly as the page loads
    const timer = setTimeout(() => {
      requestAnimationFrame(updateCounter);
    }, 400);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <>
      {count}
      <span className="text-[#4cc8ed] ml-1">{suffix}</span>
    </>
  );
};

const FloatingIcon = ({ delay, className, label, subLabel }: { delay: number, className: string, label: string, subLabel: string }) => (
  <motion.div
    initial={{ y: 20, opacity: 0, scale: 0.8 }}
    animate={{ y: [0, -12, 0], opacity: 1, scale: 1 }}
    transition={{
      y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay },
      opacity: { duration: 0.5, delay: 0.8 + delay },
      scale: { duration: 0.5, delay: 0.8 + delay }
    }}
    whileHover={{ scale: 1.1, rotate: 5 }}
    className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-center border backdrop-blur-sm z-20 shadow-lg cursor-pointer ${className}`}
  >
    <span className="text-2xl md:text-3xl font-bold">{label}</span>
  </motion.div>
);

export default Hero;