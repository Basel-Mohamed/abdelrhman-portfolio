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
  'exp.date1': { en: 'Dec 2024 - Feb 2026', ar: 'ديسمبر 2024 - فبراير 2026' },
  'exp.desc1': { 
    en: 'Responsible for editing videos to achieve the marketing goals of brands and using professional editing skills with AI tools to produce different videos that achieve success on social media and build the brand in the long term. I cooperate closely with the marketing team to formulate content that enhances audience reach, maintains customer loyalty, and achieves tangible results.', 
    ar: 'مسؤول عن تحرير الفيديوهات لتحقيق الأهداف التسويقية للعلامات التجارية واستخدام مهارات المونتاج الاحترافية مع أدوات الذكاء الاصطناعي لإنتاج فيديوهات متنوعة تحقق النجاح على وسائل التواصل الاجتماعي وتبني العلامة التجارية على المدى الطويل. أتعاون بشكل وثيق مع فريق التسويق لصياغة محتوى يعزز وصول الجمهور، ويحافظ على ولاء العملاء، ويحقق نتائج ملموسة.' 
  },
  
  'exp.role2': { en: 'Video Editor & AI Video Creator', ar: 'مونتير فيديو وصانع فيديوهات بالذكاء الاصطناعي' },
  'exp.company2': { en: 'Brandizer', ar: 'براندايزر' },
  'exp.date2': { en: 'Mar 2026 - Sep 2026', ar: 'مارس 2026 - سبتمبر 2026' },
  'exp.desc2': { 
    en: "Worked across podcast editing and AI-generated video production for brands such as Bajaj and other clients. Focused on delivering engaging visual content tailored to each project's requirements, combining video editing skills with AI-driven production techniques.", 
    ar: "عملت على مونتاج البودكاست وإنتاج الفيديوهات المولّدة بالذكاء الاصطناعي لعلامات تجارية مثل Bajaj وعملاء آخرين. ركزت على تقديم محتوى مرئي جذاب مصمم وفقاً لمتطلبات كل مشروع، من خلال الجمع بين مهارات المونتاج وتقنيات الإنتاج المعتمدة على الذكاء الاصطناعي." 
  },

  'exp.role3': { en: 'Video Editor & Motion Graphics Designer', ar: 'مونتير فيديو ومصمم موشن جرافيك' },
  'exp.company3': { en: 'AMC United (Freelance)', ar: 'إيه إم سي يونايتد (عمل حر)' },
  'exp.date3': { en: 'Feb 2026 - Present', ar: 'فبراير 2026 - الآن' },
  'exp.desc3': { 
    en: "Worked on freelance projects for brands such as Farben and AKM Constructions, handling video editing and motion graphics from supplied production footage to final delivery. Also used AI tools when needed to address filming limitations and improve visual results, ensuring each project met the desired quality and creative direction.", 
    ar: "عملت على مشاريع حرة لعلامات تجارية مثل Farben وAKM Constructions، وتوليت المونتاج والموشن جرافيك بدءاً من المادة المصورة المقدَّمة وحتى التسليم النهائي. كما استخدمت أدوات الذكاء الاصطناعي عند الحاجة لمعالجة قيود التصوير وتحسين النتائج البصرية، بما يضمن تحقيق كل مشروع للجودة والتوجه الإبداعي المطلوبين." 
  },

  'exp.role4': { en: 'Video Editor & AI Video Creator', ar: 'مونتير فيديو وصانع فيديوهات بالذكاء الاصطناعي' },
  'exp.company4': { en: 'Upshifters', ar: 'أب شيفترز' },
  'exp.date4': { en: 'Oct 2026 - Present', ar: 'أكتوبر 2026 - الآن' },
  'exp.desc4': { 
    en: "Produce video content for the Saudi market across the automotive, finance, and FMCG sectors, working with brands such as MG, Mitsubishi, and others. Handle the post-production process from supplied footage and scripts to final delivery, adapting to different creative approaches, from performance-driven videos with established creative guidelines to projects that allow for greater creative input and editorial decision-making.", 
    ar: "أنتج محتوى فيديو للسوق السعودي في قطاعات السيارات والتمويل والسلع الاستهلاكية سريعة الدوران، بالعمل مع علامات تجارية مثل MG وMitsubishi وغيرها. أتولى مرحلة ما بعد الإنتاج من المادة المصورة والسكريبتات وحتى التسليم النهائي، مع التكيّف مع أساليب إبداعية مختلفة، بدءاً من فيديوهات الأداء ذات الإرشادات الإبداعية المحددة وصولاً إلى مشاريع تتيح مساحة أكبر للمساهمة الإبداعية واتخاذ القرارات التحريرية." 
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
