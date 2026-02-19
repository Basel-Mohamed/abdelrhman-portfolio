import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple dictionary for translations
const translations: Record<string, Record<Language, string>> = {
  // Navbar
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.about': { en: 'About', ar: 'من أنا' },
  'nav.experience': { en: 'Experience', ar: 'الخبرة' },
  'nav.contact': { en: 'Contact', ar: 'تواصل معي' },
  'nav.cta': { en: 'Let’s Work Together', ar: 'لنعمل معاً' },

  // Hero
  'hero.badge.video': { en: 'Video Editor', ar: 'مونتير فيديو' },
  'hero.badge.ai': { en: 'AI Video Creator', ar: 'صانع فيديو بالذكاء الاصطناعي' },
  'hero.badge.graphic': { en: 'Graphic Designer', ar: 'مصمم جرافيك' },
  'hero.mainHeadline': { en: 'Crafting High-Impact Video Experiences That Drive Real Business Results', ar: 'صناعة تجارب فيديو عالية التأثير تحقق نتائج حقيقية للأعمال' },
  'hero.subHeadline': { en: 'Building visually compelling content that delivers real business impact', ar: 'بناء محتوى بصري جذاب يحقق تأثيراً تجارياً حقيقياً' },
  'hero.stats.exp': { en: '2+ Years Experience', ar: '+2 سنوات خبرة' },
  'hero.stats.projects': { en: '50+ Projects Delivered', ar: '+50 مشروع ناجح' },
  'hero.stats.strategy': { en: 'Brand-Focused Strategy', ar: 'استراتيجية تركز على العلامة التجارية' },
  'hero.downloadCV': { en: 'Download CV', ar: 'تحميل السيرة الذاتية' },
  'hero.title': { en: 'Abdalrhman Ahmed', ar: 'عبد الرحمن أحمد' }, // Changed usage slightly to just name if needed, but existing is fine too.
  'hero.cta.work': { en: 'Let’s Work Together', ar: 'لنعمل معاً' },
  'hero.cta.portfolio': { en: 'View Portfolio', ar: 'شاهد أعمالي' },

// About features
  'about.feat1.title': { en: 'Video Editing', ar: 'مونتاج الفيديو' },
  'about.feat1.desc': { en: 'High-impact editing', ar: 'مونتاج عالي التأثير' },
  'about.feat2.title': { en: 'Graphic Design', ar: 'تصميم جرافيك' },
  'about.feat2.desc': { en: 'Social media visuals', ar: 'تصاميم منصات التواصل' },
  'about.feat3.title': { en: 'AI Generation', ar: 'توليد بالذكاء الاصطناعي' },
  'about.feat3.desc': { en: 'AI-powered visuals', ar: 'مرئيات مدعومة بالذكاء الاصطناعي' },
  'about.feat4.title': { en: 'Motion Graphics', ar: 'موشن جرافيك' },
  'about.feat4.desc': { en: 'Impactful motion design', ar: 'تصميم حركي مؤثر' },

  'about.title': { en: 'About Me', ar: 'من أنا' },
  'about.p1': { 
    en: "I'm a Video Editor and AI Video & Graphic Creator focused on building visually compelling content that delivers real business impact.",
    ar: "أنا مونتير فيديو وصانع محتوى بالذكاء الاصطناعي والجرافيك، أركز على بناء محتوى بصري جذاب يحقق نتائج ملموسة للأعمال."
  },
  'about.p2': {
    en: "I combine creative direction with advanced editing workflows and AI tools to produce videos that capture attention, communicate a clear message, and elevate brand identity.",
    ar: "أجمع بين التوجيه الإبداعي وسير العمل المتقدم في المونتاج وأدوات الذكاء الاصطناعي لإنتاج فيديوهات تجذب الانتباه، توصل رسالة واضحة، وترفع من هوية العلامة التجارية."
  },
  'about.p3': {
    en: "My work centers on storytelling, clean visual design, and seamless execution, whether it's commercial content, social media campaigns, or fast-paced short-form videos.",
    ar: "يتركز عملي على السرد القصصي، التصميم البصري النظيف، والتنفيذ السلس، سواء كان محتوى تجارياً، حملات تواصل اجتماعي، أو فيديوهات قصيرة سريعة الإيقاع."
  },
  'about.p4': {
    en: "I approach every project with a problem solver mindset, aiming to turn ideas into visuals that feel modern, engaging, and strategically aligned with the brand.",
    ar: "أتعامل مع كل مشروع بعقلية حل المشكلات، بهدف تحويل الأفكار إلى مرئيات تبدو عصرية، جذابة، ومتوافقة استراتيجياً مع العلامة التجارية."
  },

  // Experience
  'exp.title': { en: 'Experience', ar: 'الخبرة العملية' },
  'exp.role1': { en: 'Video Editor', ar: 'مونتير فيديو' },
  'exp.company1': { en: 'MarkUP', ar: 'مارك أب' },
  'exp.date1': { en: 'Dec 2024 - Present', ar: 'ديسمبر 2024 - الآن' },
  'exp.desc1': { 
    en: 'Responsible for editing videos to achieve the marketing goals of brands and using professional editing skills with AI tools to produce different videos that achieve success on social media and build the brand in the long term. I cooperate closely with the marketing team to formulate content that enhances audience reach, maintains customer loyalty, and achieves tangible results.', 
    ar: 'مسؤول عن تحرير الفيديوهات لتحقيق الأهداف التسويقية للعلامات التجارية واستخدام مهارات المونتاج الاحترافية مع أدوات الذكاء الاصطناعي لإنتاج فيديوهات متنوعة تحقق النجاح على وسائل التواصل الاجتماعي وتبني العلامة التجارية على المدى الطويل. أتعاون بشكل وثيق مع فريق التسويق لصياغة محتوى يعزز وصول الجمهور، ويحافظ على ولاء العملاء، ويحقق نتائج ملموسة.' 
  },
  
  'exp.role2': { en: 'Graphic Designer & Video Editor', ar: 'مصمم جرافيك ومونتير فيديو' },
  'exp.company2': { en: 'Carving', ar: 'كارفنج' },
  'exp.date2': { en: 'Oct 2024 - Nov 2024', ar: 'أكتوبر 2024 - نوفمبر 2024' },
  'exp.desc2': { 
    en: "I was responsible for social media designs to achieve marketing goals aligned with the brand's long-term objectives, along with editing some videos that served those goals.", 
    ar: "كنت مسؤولاً عن تصميمات وسائل التواصل الاجتماعي لتحقيق أهداف تسويقية تتماشى مع الأهداف طويلة المدى للعلامة التجارية، إلى جانب تحرير بعض الفيديوهات التي تخدم تلك الأهداف." 
  },

  'exp.role3': { en: 'Graphic Designer', ar: 'مصمم جرافيك' },
  'exp.company3': { en: 'Abou-Elgokh', ar: 'أبو الجوخ' },
  'exp.date3': { en: 'Sep 2024 - Dec 2024', ar: 'سبتمبر 2024 - ديسمبر 2024' },
  'exp.desc3': { 
    en: "I was responsible for photographing the products and providing ready-to-use visual designs for social media, specifically tailored to increase sales.", 
    ar: "كنت مسؤولاً عن تصوير المنتجات وتوفير تصميمات مرئية جاهزة للاستخدام على وسائل التواصل الاجتماعي، مصممة خصيصاً لزيادة المبيعات." 
  },

  // Contact
  'contact.title': { en: 'Get In Touch', ar: 'تواصل معي' },
  'contact.name': { en: 'Name', ar: 'الاسم' },
  'contact.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'contact.phone': { en: 'Phone', ar: 'الهاتف' },
  'contact.message': { en: 'Message', ar: 'الرسالة' },
  'contact.send': { en: 'Send Message', ar: 'إرسال الرسالة' },
  'contact.location': { en: 'location', ar: 'الموقع' },

  // Footer
  'footer.brand': { en: 'Abdalrhman', ar: 'عبد الرحمن' },
  'footer.desc': { 
    en: 'Video Editor & AI Video/Graphic Creator. Building visually compelling content that delivers real business impact.', 
    ar: 'مونتير فيديو وصانع محتوى بالذكاء الاصطناعي والجرافيك. بناء محتوى بصري جذاب يحقق تأثيراً تجارياً حقيقياً.' 
  },
  'footer.menu': { en: 'Menu', ar: 'روابط سريعة' },
  'footer.services': { en: 'Services', ar: 'الخدمات' },
  'footer.service1': { en: 'Video Editing', ar: 'مونتاج الفيديو' },
  'footer.service2': { en: 'Motion Graphics', ar: 'موشن جرافيك' },
  'footer.service3': { en: 'AI Content', ar: 'محتوى الذكاء الاصطناعي' },
  'footer.service4': { en: 'Graphic Design', ar: 'تصميم جرافيك' },
  'footer.rights': { en: '© 2026 Abdalrhman Ahmed. All rights reserved.', ar: '© 2026 عبد الرحمن أحمد. جميع الحقوق محفوظة.' },
  'footer.built': { en: 'Designed & Built with ❤️', ar: 'صُمم وطُوّر بحب ❤️' },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Set direction on language change
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
