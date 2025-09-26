import { Link } from 'react-scroll';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext, useTranslation } from '../context/AppContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa';

export const WaterEffect = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
      viewBox="0 0 400 100"
    >
      <motion.path
        d={"M0,50 C100,30 200,70 400,50 L400,100 L0,100 Z"}
        fill="rgba(59, 130, 246, 0.05)"
        animate={{
          d: [
            "M0,50 C100,30 200,70 400,50 L400,100 L0,100 Z",
            "M0,50 C150,70 250,30 400,50 L400,100 L0,100 Z",
            "M0,50 C100,30 200,70 400,50 L400,100 L0,100 Z"
          ].map(path => typeof path === 'string' && path.startsWith('M') ? path : "M0,50 C100,30 200,70 400,50 L400,100 L0,100 Z")
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut"
        }}
      />
      <motion.path
        d={"M0,60 C150,40 250,80 400,60 L400,100 L0,100 Z"}
        fill="rgba(59, 130, 246, 0.05)"
        animate={{
          d: [
            "M0,60 C150,40 250,80 400,60 L400,100 L0,100 Z",
            "M0,60 C100,80 300,40 400,60 L400,100 L0,100 Z",
            "M0,60 C150,40 250,80 400,60 L400,100 L0,100 Z"
          ].map(path => typeof path === 'string' && path.startsWith('M') ? path : "M0,60 C150,40 250,80 400,60 L400,100 L0,100 Z")
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut"
        }}
      />
    </svg>
  );
};

const ThemeSwitch = ({ checked, onChange }) => (
  <label className="flex items-center cursor-pointer select-none">
    <span className="mr-2 text-xs font-semibold">
  {checked ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-white" />}
    </span>
    <span className="relative">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
  <span className={`block w-10 h-6 rounded-full transition ${checked ? 'bg-yellow-300' : 'bg-gray-400'}`}></span>
      <span className={`absolute left-1 top-1 w-4 h-4 rounded-full transition ${checked ? 'bg-white' : 'bg-black'} shadow ${checked ? 'translate-x-4' : ''}`}></span>
    </span>
  </label>
);

const LangSwitch = ({ checked, onChange, label }) => (
  <label className="flex items-center cursor-pointer select-none">
    <span className="mr-2 text-xs font-semibold">{label}</span>
    <span className="relative">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className={`block w-10 h-6 rounded-full transition bg-gray-400 ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
      <span className={`absolute left-1 top-1 w-4 h-4 rounded-full transition bg-white shadow ${checked ? 'translate-x-4' : ''}`}></span>
    </span>
  </label>
);

const Header = () => {
  const { theme, lang, toggleTheme, toggleLang } = useAppContext();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const menuItems = [
    { to: 'home', label: t('navbar.home') },
    { to: 'about', label: t('navbar.about') },
    { to: 'services', label: t('navbar.services') },
    { to: 'portfolio', label: t('navbar.portfolio') },
    { to: 'contact', label: t('navbar.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => document.getElementById(item.to));
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const { t } = useTranslation();
  return (
    <header className="relative">
  <div className="fixed top-6 right-8 flex space-x-4 z-50 p-2 rounded-xl bg-black/30 backdrop-blur-md shadow-md">
        <ThemeSwitch checked={theme === 'light'} onChange={toggleTheme} />
        <LangSwitch checked={lang === 'en'} onChange={toggleLang} label={lang === 'en' ? t('header.en') : t('header.es')} />
        {/* Módulo CV */}
        <a
          href={lang === 'en' ? `${import.meta.env.BASE_URL}CV-en.pdf` : `${import.meta.env.BASE_URL}CV.pdf`}
          download
          className="group flex items-center space-x-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md shadow-md transition-colors duration-300 cursor-pointer select-none border border-transparent"
        >
          <span className="flex items-center justify-center w-5 h-5 transition-colors duration-300">
            <FaArrowDown className={`text-white group-hover:text-yellow-400 text-base transition-colors duration-300 ${theme === 'light' ? '' : ''}`} />
          </span>
          <span className="text-xs font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">CV</span>
        </a>
      </div>
      {/* Eliminado el saludo '¡Hola!' */}
      <div className="fixed bottom-4 left-0 w-full z-50 px-4">
      <nav className="max-w-4xl mx-auto">
        {/* Desktop Menu */}
        <div className="hidden md:block">
          <div className="bg-gray-900/40 backdrop-blur-md rounded-2xl p-2 shadow-lg relative overflow-hidden">
            <WaterEffect />
            <div className="flex justify-center items-center relative z-10">
              <div className="flex space-x-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    smooth={true}
                    duration={500}
                    className="relative px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer rounded-xl"
                    activeClass="text-white"
                    spy={true}
                  >
                    {activeSection === item.to && (
                      <motion.div
                        className="absolute inset-0 bg-blue-500/10 backdrop-blur-sm rounded-xl"
                        layoutId="active"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            className="bg-gray-900/40 backdrop-blur-md p-3 rounded-2xl text-white shadow-lg relative overflow-hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute bottom-20 left-4 right-4 bg-gray-900/40 backdrop-blur-md rounded-2xl p-4 shadow-lg overflow-hidden"
            >
              <div className="flex flex-col space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    smooth={true}
                    duration={500}
                    className={`px-4 py-2 rounded-xl text-gray-300 hover:text-white transition-colors cursor-pointer ${
                      activeSection === item.to ? 'bg-blue-600/20 text-white' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      </div>
    </header>
  );
};

export default Header;