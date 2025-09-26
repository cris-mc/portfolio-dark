import { WaterEffect } from './Header';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/AppContext';
import { useAppContext } from '../context/AppContext';

const Hero = () => {
  const { t, lang } = useTranslation();
  const { theme } = useAppContext();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-end sm:items-center overflow-hidden">
      {/* Gradiente y fondo según tema */}
      <div className="absolute inset-0 hidden lg:block">
        {theme === 'light' ? (
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f3e9] from-40% via-[#f7f8fa]/80 via-50% to-transparent to-60%" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-black from-40% via-black/80 via-50% to-transparent to-60%" />
        )}
      </div>

      {/* Imagen de fondo para móvil y tablet */}
      <div className="absolute inset-0 lg:hidden">
        <img
          src={theme === 'light' ? `${import.meta.env.BASE_URL}perfil-white.jpg` : `${import.meta.env.BASE_URL}perfil.jpg`}
          alt="Perfil"
          className={`w-full h-full object-cover opacity-75 object-[center_20%] md:object-[center_10%] lg:object-center ${theme === 'light' ? 'bg-[#f7f3e9]' : ''}`}
        />
        {/* En mobile/tablet NO se muestra el gradiente sobre la foto en ningún modo */}
      </div>

      <div className="container mx-auto px-4 pb-20 sm:pb-0 relative">
        {/* Eliminar fondo liquid animado en mobile/tablet y modo claro */}
  <div className="w-full lg:w-1/2 pl-4 lg:pl-12 pr-4 lg:pr-16 relative z-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.h1
              variants={itemVariants}
              className={`text-center lg:text-left relative`}
            >
              {theme === 'light' ? (
                <span className="hidden lg:block">
                  <span className="block text-5xl md:text-6xl lg:text-8xl font-bold mb-2 text-[#6B3F26]">
                    {lang === 'en' ? '¡Hello!' : '¡Hola!'}
                  </span>
                  <span className="block text-4xl md:text-5xl lg:text-7xl font-thin text-[#a97c50]">
                    {lang === 'en' ? "I'm Cristian" : 'Soy Cristian'}
                  </span>
                </span>
              ) : (
                <span>
                  <span className="block text-5xl md:text-6xl lg:text-8xl font-bold mb-2 text-white">
                    {lang === 'en' ? '¡Hello!' : '¡Hola!'}
                  </span>
                  <span className="block text-4xl md:text-5xl lg:text-7xl font-thin text-gray-300">
                    {lang === 'en' ? "I'm Cristian" : 'Soy Cristian'}
                  </span>
                </span>
              )}
            </motion.h1>

            <motion.p
              className={`hidden sm:block text-lg md:text-xl lg:text-2xl leading-relaxed text-center lg:text-left ${theme === 'light' ? 'text-[#6B3F26]' : 'text-white lg:text-gray-300'} relative`}
            >
              {(theme !== 'light') ? (
                <span>{t('hero.subtitle')}</span>
              ) : (
                <span className="hidden lg:block">{t('hero.subtitle')}</span>
              )}
            </motion.p>

            <motion.div
              className="flex flex-col md:flex-row gap-4 items-center justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  className={`inline-block px-8 py-3 rounded-full cursor-pointer relative overflow-hidden group ${theme === 'light' ? 'bg-[#f7e9d3] text-[#6B3F26] border border-[#6B3F26] hover:bg-[#e9d2b0] hover:text-[#6B3F26] hover:border-[#6B3F26]' : 'bg-blue-600 text-white'}`}
                >
                  <span className={`relative z-10 transition-colors ${theme === 'light' ? '' : 'group-hover:text-white'}`}>{t('about.buttons.contact')}</span>
                  {theme !== 'light' && <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>}
                  {theme !== 'light' && <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] group-hover:animate-shine"></div>}
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="inline-block"
              >
                <Link
                  to="portfolio"
                  smooth={true}
                  duration={500}
                  className={`inline-block border rounded-full px-8 py-3 cursor-pointer ${theme === 'light' ? 'border-[#6B3F26] text-[#6B3F26] bg-[#f7e9d3] hover:bg-[#e9d2b0] hover:text-[#6B3F26] hover:border-[#6B3F26]' : 'border-blue-600 lg:border-blue-600 border-white text-blue-600 lg:text-blue-600 text-white'}`}
                >
                  {t('about.buttons.portfolio')}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
