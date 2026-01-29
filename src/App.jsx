import React, { useState, useEffect } from 'react';
// Replaced Lucide with Remix Icons (Modern React Icons Library)
import { 
  RiMailLine, 
  RiPhoneLine, 
  RiMapPinLine, 
  RiLinkedinFill, 
  RiInstagramFill, 
  RiTiktokFill, // The correct TikTok Icon
  RiFacebookFill, 
  RiYoutubeFill, 
  RiPlayFill, 
  RiBriefcaseLine, 
  RiAwardLine, 
  RiSparklingFill 
} from 'react-icons/ri';
import { motion, useDragControls, useMotionValue } from 'framer-motion';

// 3D Avatar Component (Draggable with animations)
const DraggableAvatar = () => {
  const dragControls = useDragControls();
  const [isHovered, setIsHovered] = useState(false);
  const [eyeDirection, setEyeDirection] = useState({ x: 0, y: 0 });
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Track drag direction for eye movement
  useEffect(() => {
    const unsubscribeX = x.on('change', (latest) => {
      const velocity = x.getVelocity();
      if (Math.abs(velocity) > 50) {
        const direction = velocity > 0 ? 1 : -1;
        setEyeDirection({ x: direction * 4, y: 0 });
        
        // Reset eyes after movement stops
        setTimeout(() => {
          if (Math.abs(x.getVelocity()) < 10) {
            setEyeDirection({ x: 0, y: 0 });
          }
        }, 200);
      }
    });

    const unsubscribeY = y.on('change', (latest) => {
      const velocity = y.getVelocity();
      if (Math.abs(velocity) > 50) {
        const direction = velocity > 0 ? 1 : -1;
        setEyeDirection(prev => ({ ...prev, y: direction * 2 }));
      }
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [x, y]);

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.1}
      dragConstraints={{
        top: -400,
        left: -700,
        right: 700,
        bottom: 400,
      }}
      style={{ x, y }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      className="fixed top-1/2 right-[5%] sm:right-[8%] lg:right-[8%] -translate-y-1/2 z-50 cursor-move"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ touchAction: 'none' }}
    >
      <motion.div
        animate={{ 
          rotateY: [0, 10, -10, 0],
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      >
        {/* Avatar Container with 3D depth */}
        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* Shadow layers for 3D effect */}
          <div className="absolute inset-0" style={{ transform: 'translateZ(-20px)' }}>
            <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-gray-800 to-black opacity-30 blur-xl"></div>
          </div>
          
          <div className="absolute inset-0" style={{ transform: 'translateZ(-15px)' }}>
            <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-[#4cc8ed]/20 to-[#366a5d]/20"></div>
          </div>
          
          <div className="absolute inset-0" style={{ transform: 'translateZ(-10px)' }}>
            <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-[#4cc8ed]/30 to-[#366a5d]/30"></div>
          </div>

          {/* Main Avatar Circle */}
          <div 
            className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-2 sm:border-4 border-[#4cc8ed]/50 shadow-2xl"
            style={{ transform: 'translateZ(0px)', transformStyle: 'preserve-3d' }}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4cc8ed] via-[#366a5d] to-[#1a1a1a]"></div>
            
            {/* Animated Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 sm:border-4 border-white/10 rounded-full"
              style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
            ></motion.div>
            
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 sm:inset-4 border-2 sm:border-4 border-white/10 rounded-full"
              style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
            ></motion.div>

            {/* Avatar Character */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative scale-75 sm:scale-90 lg:scale-100">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Face Circle */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ffdbac] to-[#f0c084] relative shadow-lg">
                    {/* Eyes with direction tracking */}
                    <motion.div 
                      animate={{ 
                        x: eyeDirection.x,
                        y: eyeDirection.y
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute top-8 left-6 w-3 h-3 bg-[#2c2c2c] rounded-full"
                    ></motion.div>
                    <motion.div 
                      animate={{ 
                        x: eyeDirection.x,
                        y: eyeDirection.y
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute top-8 right-6 w-3 h-3 bg-[#2c2c2c] rounded-full"
                    ></motion.div>
                    
                    {/* Smile */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-4 border-b-2 border-[#2c2c2c] rounded-b-full"></div>
                  </div>

                  {/* Body */}
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-16 h-20 bg-gradient-to-br from-[#4cc8ed] to-[#366a5d] rounded-t-full rounded-b-lg shadow-lg overflow-visible">
                    {/* Left Arm - Waves on hover */}
                    <motion.div 
                      animate={isHovered ? {
                        rotate: [0, -30, -20, -30, 0],
                        y: [0, -5, 0, -5, 0]
                      } : {
                        rotate: -12
                      }}
                      transition={isHovered ? {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      } : {
                        duration: 0.3
                      }}
                      className="absolute top-2 -left-4 w-4 h-12 bg-gradient-to-br from-[#4cc8ed] to-[#366a5d] rounded-full origin-top"
                      style={{ transformOrigin: 'top center' }}
                    ></motion.div>
                    
                    {/* Right Arm */}
                    <div className="absolute top-2 -right-4 w-4 h-12 bg-gradient-to-br from-[#4cc8ed] to-[#366a5d] rounded-full rotate-12"></div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Sparkle effects */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-4 sm:top-8 right-4 sm:right-8"
            >
              <RiSparklingFill className="text-white w-3 h-3 sm:w-4 sm:h-4" />
            </motion.div>

            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-8 sm:bottom-12 left-4 sm:left-8"
            >
              <RiSparklingFill className="text-white w-2 h-2 sm:w-3 sm:h-3" />
            </motion.div>
          </div>

          {/* Glow effect */}
          <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-[#4cc8ed]/20 to-[#366a5d]/20 rounded-full blur-2xl -z-10"></div>
        </div>

        {/* Drag Indicator - Hidden on small screens */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute -bottom-12 sm:-bottom-16 left-1/2 -translate-x-1/2 bg-[#4cc8ed] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap shadow-lg hidden sm:block"
        >
          ✨ Drag me!
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Animated Text Component
const AnimatedText = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerClass = "container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1400px]";

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      
      {/* Draggable 3D Avatar - Now visible on all screen sizes */}
      <DraggableAvatar />

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#4cc8ed]/10">
        <div className={containerClass + " py-4 flex justify-between items-center"}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4cc8ed] to-[#366a5d]">
              AA
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <motion.ul 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex gap-8 text-sm font-medium"
          >
            {['Home', 'About', 'Experience', 'Contact'].map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="relative group text-white hover:text-[#4cc8ed] transition-colors"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4cc8ed] transition-all group-hover:w-full"></span>
                </button>
              </motion.li>
            ))}
          </motion.ul>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="md:hidden bg-[#121212] border-t border-[#4cc8ed]/10"
          >
            <div className="px-6 py-6 space-y-4">
              {['Home', 'About', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left text-white hover:text-[#4cc8ed] transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated Background Blobs */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-[10%] right-[-10%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gradient-radial from-[#4cc8ed]/15 to-transparent rounded-full blur-3xl"
        ></motion.div>

        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-[10%] left-[-10%] w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-gradient-radial from-[#366a5d]/15 to-transparent rounded-full blur-3xl"
        ></motion.div>

        <div className={containerClass + " relative z-10"}>
          <div className="max-w-4xl">
            {/* Logo */}
            <AnimatedText>
              <motion.div 
                className="mb-8"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto lg:mx-0 drop-shadow-[0_0_20px_rgba(76,200,237,0.3)]" viewBox="0 0 200 200">
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4cc8ed" />
                      <stop offset="100%" stopColor="#366a5d" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="80" fill="none" stroke="url(#grad)" strokeWidth="8"/>
                  <polygon points="80,65 80,135 140,100" fill="url(#grad)"/>
                </svg>
              </motion.div>
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#4cc8ed] to-[#366a5d]"
              >
                Abdalrhman Ahmed
              </h1>
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <p className="text-xl sm:text-2xl lg:text-3xl text-[#4cc8ed] font-medium mb-6">
                Video Editor • AI Video & Graphic Creator
              </p>
            </AnimatedText>

            <AnimatedText delay={0.6}>
              <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed">
                Building visually compelling content that delivers real business impact
              </p>
            </AnimatedText>

            <AnimatedText delay={0.8}>
              <motion.button
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(76,200,237,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#4cc8ed] to-[#366a5d] rounded-full font-semibold text-base sm:text-lg transition-all inline-flex items-center gap-2"
              >
                Let's Work Together <RiPlayFill size={20} />
              </motion.button>
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-32 relative z-10">
        <div className={containerClass}>
          <AnimatedText>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#4cc8ed] to-[#366a5d]">
              About Me
            </h2>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 border border-[#4cc8ed]/10 rounded-3xl p-6 sm:p-8 lg:p-12 backdrop-blur-sm"
            >
              <div className="space-y-6 text-base sm:text-lg text-gray-300 leading-relaxed">
                <p className="flex items-start gap-3">
                  <RiSparklingFill className="text-[#4cc8ed] flex-shrink-0 mt-1" size={24} />
                  <span>I'm a Video Editor and AI Video & Graphic Creator focused on building visually compelling content that delivers real business impact.</span>
                </p>
                <p className="flex items-start gap-3">
                  <RiAwardLine className="text-[#4cc8ed] flex-shrink-0 mt-1" size={24} />
                  <span>I combine creative direction with advanced editing workflows and AI tools to produce videos that capture attention, communicate a clear message, and elevate brand identity.</span>
                </p>
                <p className="flex items-start gap-3">
                  <RiPlayFill className="text-[#4cc8ed] flex-shrink-0 mt-1" size={24} />
                  <span>My work centers on storytelling, clean visual design, and seamless execution, whether it's commercial content, social media campaigns, or fast-paced short-form videos.</span>
                </p>
                <p className="flex items-start gap-3">
                  <RiBriefcaseLine className="text-[#4cc8ed] flex-shrink-0 mt-1" size={24} />
                  <span>I approach every project with a problem solver mindset, aiming to turn ideas into visuals that feel modern, engaging, and strategically aligned with the brand.</span>
                </p>
              </div>
            </motion.div>
          </AnimatedText>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 sm:py-32 relative z-10 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
        <div className={containerClass}>
          <AnimatedText>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#4cc8ed] to-[#366a5d]">
              Work Experience
            </h2>
          </AnimatedText>

          <div className="space-y-6">
            {[
              {
                title: "Video Editor",
                company: "MarkUP",
                date: "Dec 2024 - Present",
                description: "Responsible for editing videos to achieve the marketing goals of brands and using professional editing skills with AI tools to produce different videos that achieve success on social media and build the brand in the long term. I cooperate closely with the marketing team to formulate content that enhances audience reach, maintains customer loyalty, and achieves tangible results.",
                delay: 0.1
              },
              {
                title: "Graphic Designer & Video Editor",
                company: "Carving",
                date: "Oct 2024 - Nov 2024",
                description: "I was responsible for social media designs to achieve marketing goals aligned with the brand's long-term objectives, along with editing some videos that served those goals.",
                delay: 0.3
              },
              {
                title: "Graphic Designer",
                company: "Abou-Elgokh",
                date: "Sep 2024 - Dec 2024",
                description: "I was responsible for photographing the products and providing ready-to-use visual designs for social media, specifically tailored to increase sales.",
                delay: 0.5
              }
            ].map((exp, index) => (
              <AnimatedText key={index} delay={exp.delay}>
                <motion.div
                  whileHover={{ x: 10, borderColor: "rgba(76,200,237,0.3)" }}
                  className="relative bg-white/5 border border-[#4cc8ed]/10 rounded-3xl p-6 sm:p-8 transition-all overflow-hidden group"
                >
                  {/* Accent Bar */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ delay: exp.delay + 0.2 }}
                    className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-[#4cc8ed] to-[#366a5d]"
                  ></motion.div>

                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#4cc8ed] mb-2">{exp.title}</h3>
                      <div className="text-lg sm:text-xl font-semibold text-white">{exp.company}</div>
                    </div>
                    <div className="text-[#366a5d] font-medium whitespace-nowrap text-sm sm:text-base">{exp.date}</div>
                  </div>
                  
                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{exp.description}</p>
                </motion.div>
              </AnimatedText>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-32 relative z-10">
        <div className={containerClass}>
          <AnimatedText>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#4cc8ed] to-[#366a5d]">
              Get In Touch
            </h2>
          </AnimatedText>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { icon: RiMailLine, title: "Email", content: "abdalrhmanah66@gmail.com", href: "mailto:abdalrhmanah66@gmail.com", delay: 0.1 },
              { icon: RiPhoneLine, title: "Phone", content: "01020891466", href: "tel:01020891466", delay: 0.2 },
              { icon: RiMapPinLine, title: "Location", content: "Maadi, Cairo", href: null, delay: 0.3 }
            ].map((contact, index) => (
              <AnimatedText key={index} delay={contact.delay}>
                <motion.div
                  whileHover={{ y: -5, borderColor: "rgba(76,200,237,0.3)" }}
                  className="bg-white/5 border border-[#4cc8ed]/10 rounded-2xl p-6 sm:p-8 text-center transition-all"
                >
                  <contact.icon className="mx-auto mb-4 text-[#4cc8ed]" size={40} />
                  <h3 className="text-lg sm:text-xl font-bold mb-3">{contact.title}</h3>
                  {contact.href ? (
                    <a href={contact.href} className="text-gray-400 hover:text-[#4cc8ed] transition-colors break-words text-sm sm:text-base">
                      {contact.content}
                    </a>
                  ) : (
                    <p className="text-gray-400 text-sm sm:text-base">{contact.content}</p>
                  )}
                </motion.div>
              </AnimatedText>
            ))}
          </div>

          <AnimatedText delay={0.4}>
            <div className="text-center mb-12">
              <motion.a
                href="https://drive.google.com/drive/u/1/folders/19MoOFdx__BZsQSN6X3gl00CX0UdksrVy"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(76,200,237,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#4cc8ed] to-[#366a5d] rounded-full font-semibold text-base sm:text-lg transition-all"
              >
                View Portfolio
              </motion.a>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.6}>
            <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
              {[
                { icon: RiLinkedinFill, href: "https://www.linkedin.com/in/abdalrhman-ahmed-1a476031b", label: "LinkedIn" },
                { icon: RiInstagramFill, href: "https://www.instagram.com/abdalrhman_edits", label: "Instagram" },
                { icon: RiTiktokFill, href: "https://www.tiktok.com/@abdalrhmanahmed179", label: "TikTok" }, // Replaced Music with TikTok
                { icon: RiFacebookFill, href: "https://www.facebook.com/share/1EjHPL1n9n/", label: "Facebook" },
                { icon: RiYoutubeFill, href: "https://youtube.com/@abdalrhman_ahmed1", label: "YouTube" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1, backgroundColor: "#4cc8ed", color: "#0a0a0a" }}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#4cc8ed]/10 border-2 border-[#4cc8ed]/30 flex items-center justify-center text-[#4cc8ed] transition-all"
                  title={social.label}
                >
                  <social.icon size={20} className="sm:w-6 sm:h-6" />
                </motion.a>
              ))}
            </div>
          </AnimatedText>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-black/50 border-t border-[#4cc8ed]/10">
        <p className="text-gray-500 text-sm sm:text-base">
          &copy; 2024 Abdalrhman Ahmed. All rights reserved.
        </p>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap');
        
        html {
          scroll-behavior: smooth;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default Portfolio;