import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Brand & General
    brandName: 'EduPlayo',
    tagline: 'Learn It. Play It. Master It.',
    secondaryTagline: 'Turn every lesson into an adventure!',
    announcementText: '🌟 Welcome to EduPlayo Pilot: Class 1 Joyful Mathematics is now live and interactive!',

    // Navigation
    navHome: 'Home',
    navClasses: 'Explore Classes',
    navSubjects: 'Subjects',
    navGames: 'Games',
    navChallenges: 'Daily Challenges',
    navRevision: 'Revision',
    navSearch: 'Search',
    navAbout: 'About Us',
    navContact: 'Contact',
    navPrivacy: 'Privacy Policy',
    navTerms: 'Terms of Service',
    navDisclaimer: 'Disclaimer',
    navAccessibility: 'Accessibility',

    // Hero Section
    heroTitle: 'Learning Gets More Fun When You Play!',
    heroSubtitle: 'Explore interactive learning games, practise important concepts, and celebrate every little victory.',
    btnStartLearning: 'Start Learning',
    btnExploreClasses: 'Explore Classes',
    btnPlayNow: 'Play Game',
    btnPractice: 'Practise Now',
    btnViewDetails: 'View Syllabus',

    // Class selection
    classesTitle: 'Select Your Class',
    classesSubtitle: 'Age-appropriate curriculum aligned with official CBSE / NCERT guidelines.',
    badgeAvailable: 'Active Pilot',
    badgeComingSoon: 'Curriculum Outlined · Coming Soon',
    comingSoonNote: 'This class curriculum is being developed and will be released in future updates.',

    // Game stats & sections
    popularGamesTitle: 'Playable Learning Games',
    popularGamesSubtitle: 'Carefully designed interactive activities with instant feedback and encouragement.',
    subjectsTitle: 'Explore Core Subjects',
    subjectsSubtitle: 'Foundation topics designed for deep comprehension through hands-on practice.',
    dailyChallengeTitle: "Today's Daily Challenge",
    dailyChallengeSubtitle: 'Solve today’s short challenge to maintain your streak and earn bonus XP.',
    howItWorksTitle: 'How EduPlayo Works',
    howItWorksSubtitle: 'Three simple, proven steps to joyful school concept mastery.',
    step1Title: '1. Choose Your Class',
    step1Desc: 'Pick your grade level and select from Maths, English, Hindi, and EVS.',
    step2Title: '2. Learn Through Games',
    step2Desc: 'Play bite-sized interactive challenges that make abstract rules concrete.',
    step3Title: '3. Practise & Earn Rewards',
    step3Desc: 'Test understanding, collect XP stars, and earn badges as you grow.',

    // Honest Learning Benefits
    benefitsTitle: 'Built with Educational Integrity',
    benefitsSubtitle: 'Designed for real conceptual clarity, not superficial gimmicks.',
    benefit1Title: 'Interactive Practice',
    benefit1Desc: 'Every concept is paired with hands-on questions and visual manipulatives.',
    benefit2Title: 'Instant & Encouraging Feedback',
    benefit2Desc: 'Constructive explanations help learners correct mistakes without frustration.',
    benefit3Title: 'Device-Local Progress',
    benefit3Desc: 'Track streaks, stars, and XP securely on your personal browser without creating an account.',
    benefit4Title: 'Self-Paced Mastery',
    benefit4Desc: 'Replay games as often as needed to build genuine confidence and skill.',

    // Common game strings
    score: 'Score',
    streak: 'Streak',
    xpEarned: 'XP Points',
    level: 'Learner Level',
    question: 'Question',
    of: 'of',
    submit: 'Submit Answer',
    nextQuestion: 'Next Question',
    tryAgain: 'Try Again',
    replay: 'Play Again',
    finish: 'Complete Activity',
    resetProgress: 'Reset Progress',
    resetConfirmTitle: 'Reset Your Learning Progress?',
    resetConfirmDesc: 'This will clear all your locally earned XP, badges, and game scores on this device. This cannot be undone.',
    resetCancel: 'Keep My Progress',
    resetConfirmBtn: 'Yes, Reset Everything',

    // Feedback
    greatJob: 'Great job!',
    youreImproving: 'You are getting better and better!',
    almostThere: 'Nice effort! Let’s review and try again.',
    notQuite: 'Not quite. Let’s count together and see!',

    // Search & Filters
    searchPlaceholder: 'Search games, topics, classes, or chapters...',
    filterAll: 'All',
    filterClass: 'Class',
    filterSubject: 'Subject',
    filterDifficulty: 'Difficulty',
    clearFilters: 'Clear Filters',
    noResultsTitle: 'No Matching Results Found',
    noResultsDesc: 'Try adjusting your search terms or clearing your filters to explore available games.',

    // Footer
    footerDesc: 'EduPlayo is an independent gamified learning platform created to turn foundational school concepts into joyful interactive games.',
    quickLinks: 'Quick Links',
    curriculumLinks: 'Curriculum',
    legalLinks: 'Transparency & Policies',
    rightsReserved: 'All rights reserved.',
    configNotice: 'EduPlayo.fun is prepared for deployment. School syllabus alignment verified against NCERT Class 1 framework.',
  },
  hi: {
    // Brand & General
    brandName: 'EduPlayo',
    tagline: 'सीखो। खेलो। महारत पाओ।',
    secondaryTagline: 'हर पाठ को बनाएं एक रोमांचक सफर!',
    announcementText: '🌟 EduPlayo पायलट में आपका स्वागत है: कक्षा 1 गणित अब लाइव और इंटरैक्टिव है!',

    // Navigation
    navHome: 'होम',
    navClasses: 'कक्षाएं देखें',
    navSubjects: 'विषय',
    navGames: 'खेल',
    navChallenges: 'दैनिक चुनौतियां',
    navRevision: 'दोहराव (रिवीजन)',
    navSearch: 'खोजें',
    navAbout: 'हमारे बारे में',
    navContact: 'संपर्क करें',
    navPrivacy: 'गोपनीयता नीति',
    navTerms: 'नियम व शर्तें',
    navDisclaimer: 'अस्वीकरण',
    navAccessibility: 'सुगमता (Accessibility)',

    // Hero Section
    heroTitle: 'पढ़ाई बने और भी आसान और मजेदार!',
    heroSubtitle: 'इंटरैक्टिव शैक्षिक खेलों का आनंद लें, महत्वपूर्ण अवधारणाओं का अभ्यास करें और अपनी हर जीत का जश्न मनाएं।',
    btnStartLearning: 'सीखना शुरू करें',
    btnExploreClasses: 'कक्षाएं देखें',
    btnPlayNow: 'खेलें',
    btnPractice: 'अभ्यास करें',
    btnViewDetails: 'पाठ्यक्रम देखें',

    // Class selection
    classesTitle: 'अपनी कक्षा चुनें',
    classesSubtitle: 'CBSE / NCERT दिशानिर्देशों के अनुरूप आयु-उपयुक्त पाठ्यक्रम।',
    badgeAvailable: 'सक्रिय पायलट',
    badgeComingSoon: 'पाठ्यक्रम तैयार · शीघ्र उपलब्ध',
    comingSoonNote: 'इस कक्षा का पाठ्यक्रम तैयार किया जा रहा है और आगामी अपडेट में उपलब्ध कराया जाएगा।',

    // Game stats & sections
    popularGamesTitle: 'खेलने योग्य शैक्षिक खेल',
    popularGamesSubtitle: 'तत्काल प्रतिक्रिया और प्रोत्साहन के साथ तैयार की गई मनोरंजक गतिविधियाँ।',
    subjectsTitle: 'मुख्य विषयों का अन्वेषण करें',
    subjectsSubtitle: 'अभ्यास के माध्यम से गहरी समझ के लिए डिज़ाइन किए गए बुनियादी विषय।',
    dailyChallengeTitle: 'आज की दैनिक चुनौती',
    dailyChallengeSubtitle: 'अपनी निरंतरता बनाए रखने और अतिरिक्त अंक कमाने के लिए आज की चुनौती हल करें।',
    howItWorksTitle: 'EduPlayo कैसे काम करता है',
    howItWorksSubtitle: 'अवधारणाओं पर महारत हासिल करने के तीन सरल और सिद्ध कदम।',
    step1Title: '1. अपनी कक्षा चुनें',
    step1Desc: 'अपनी कक्षा चुनें और गणित, अंग्रेजी, हिंदी व पर्यावरण अध्ययन में से विषय चुनें।',
    step2Title: '2. खेल-खेल में सीखें',
    step2Desc: 'रोचक चुनौतियों के साथ अमूर्त नियमों को प्रत्यक्ष और सरल रूप में समझें।',
    step3Title: '3. अभ्यास करें और पुरस्कार पाएं',
    step3Desc: 'सवालों को हल करें, स्टार और XP अंक कमाएं तथा नए बैज अनलॉक करें।',

    // Honest Learning Benefits
    benefitsTitle: 'सच्ची शैक्षणिक गुणवत्ता के साथ निर्मित',
    benefitsSubtitle: 'दिखावे के बिना, वास्तविक अवधारणात्मक स्पष्टता के लिए तैयार।',
    benefit1Title: 'इंटरैक्टिव अभ्यास',
    benefit1Desc: 'प्रत्येक अवधारणा को व्यावहारिक प्रश्नों और चित्रों के साथ प्रस्तुत किया गया है।',
    benefit2Title: 'सकारात्मक प्रतिक्रिया',
    benefit2Desc: 'सहानुभूतिपूर्ण स्पष्टीकरण शिक्षार्थी को बिना तनाव के अपनी गलतियाँ सुधारने में मदद करते हैं।',
    benefit3Title: 'सुरक्षित स्थानीय प्रगति',
    benefit3Desc: 'बिना अकाउंट बनाए, अपने व्यक्तिगत ब्राउज़र में सुरक्षित रूप से अपने स्कोर और सितारे ट्रैक करें।',
    benefit4Title: 'अपनी गति से सीखें',
    benefit4Desc: 'आत्मविश्वास और दक्षता बढ़ाने के लिए जितनी बार चाहें उतनी बार खेलें।',

    // Common game strings
    score: 'अंक',
    streak: 'लगातार सही',
    xpEarned: 'XP अंक',
    level: 'स्तर',
    question: 'प्रश्न',
    of: 'में से',
    submit: 'उत्तर जांचें',
    nextQuestion: 'अगला प्रश्न',
    tryAgain: 'पुनः प्रयास करें',
    replay: 'फिर से खेलें',
    finish: 'समाप्त करें',
    resetProgress: 'प्रगति रीसेट करें',
    resetConfirmTitle: 'क्या आप अपनी सीखने की प्रगति रीसेट करना चाहते हैं?',
    resetConfirmDesc: 'यह इस डिवाइस पर आपके द्वारा अर्जित सभी XP, बैज और स्कोर मिटा देगा। इसे वापस नहीं लाया जा सकता।',
    resetCancel: 'मेरी प्रगति रखें',
    resetConfirmBtn: 'हाँ, सब रीसेट करें',

    // Feedback
    greatJob: 'बहुत बढ़िया!',
    youreImproving: 'आप बहुत अच्छा प्रदर्शन कर रहे हैं!',
    almostThere: 'अच्छा प्रयास! आइए समझें और फिर से कोशिश करें।',
    notQuite: 'कोई बात नहीं। आइए साथ मिलकर गिनते हैं!',

    // Search & Filters
    searchPlaceholder: 'खेल, विषय, कक्षा या पाठ खोजें...',
    filterAll: 'सभी',
    filterClass: 'कक्षा',
    filterSubject: 'विषय',
    filterDifficulty: 'कठिनाई',
    clearFilters: 'फ़िल्टर हटाएं',
    noResultsTitle: 'कोई परिणाम नहीं मिला',
    noResultsDesc: 'कृपया अपने खोज शब्द बदलें या उपलब्ध खेलों को देखने के लिए फ़िल्टर हटाएं।',

    // Footer
    footerDesc: 'EduPlayo एक स्वतंत्र शैक्षिक गेमिंग मंच है जो स्कूली अवधारणाओं को आनंददायक खेलों में बदलता है।',
    quickLinks: 'त्वरित लिंक',
    curriculumLinks: 'पाठ्यक्रम',
    legalLinks: 'पारदर्शिता व नीतियां',
    rightsReserved: 'सर्वाधिकार सुरक्षित।',
    configNotice: 'EduPlayo.fun परिनियोजन (Deployment) के लिए तैयार है। NCERT कक्षा 1 के अनुसार सत्यापित सामग्री।',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'eduplayo_language_pref';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved && (saved === 'en' || saved === 'hi')) {
        setLanguageState(saved);
      }
    } catch {
      // Local storage unavailable
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const t = (key: string): string => {
    const currentDict = translations[language];
    if (currentDict && currentDict[key]) {
      return currentDict[key];
    }
    // Fallback to English
    return translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
