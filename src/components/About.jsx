import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-scroll';
import { useTranslation, useAppContext } from '../context/AppContext';

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]); 

  const skills = [
    { name: "Diseño (UX/UI, gráfico, web)", level: 95 },
    { name: "Cobol (Mainframe, JCL, Unix)", level: 90 },
    { name: "QA testing", level: 90 },
    { name: "JavaScript (React, Node)", level: 75 },
    { name: "otros (SQL, Git, Jira, etc)", level: 70 }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const { t } = useTranslation();
  const { theme } = useAppContext();
  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      {/* Gradiente según tema, igual que Hero */}
      <div className={`absolute inset-0 hidden lg:block ${theme === 'light' ? '' : ''}`}>
        {theme === 'light' ? (
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f3e9] from-40% via-[#f7f8fa]/80 via-50% to-transparent to-60%" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-black from-40% via-black/80 via-50% to-transparent to-60%" />
        )}
      </div>
      <div className="container mx-auto px-4 relative z-30">
        <motion.h2
          className={`text-4xl md:text-5xl font-bold mb-16 text-center ${theme === 'light' ? 'text-[#6B3F26]' : 'text-white'}`}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="font-thin">{t('about.title').split(' ')[0]}</span> <span className="font-leckerli">{t('about.title').split(' ')[1]}</span>
        </motion.h2>

        <div className="md:flex md:gap-12 max-w-6xl mx-auto">
          {/* Columna izquierda - Texto */}
          <motion.div
            className="md:w-1/2 mb-12 md:mb-0"
            style={{ opacity }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className={`space-y-6 ${theme === 'light' ? 'text-[#6B3F26]' : 'text-gray-300'} relative z-10`}
              variants={itemVariants}
            >
              {/* Intro en negrita y bio justificada */}
              <p className={`text-lg leading-relaxed text-justify tracking-wide mt-4 ${theme === 'light' ? 'text-[#6B3F26]' : ''}`} style={{ hyphens: 'auto', letterSpacing: '0.02em' }}>
                <span className={`font-bold block mb-2 ${theme === 'light' ? 'text-[#6B3F26]' : ''}`}>{t('about.intro')}</span>
                <span className={`${theme === 'light' ? 'text-[#6B3F26]' : ''}`}>{t('about.bio')}</span>
              </p>
              <div className="pt-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="inline-block"
                >
                  <Link
                    to="contact"
                    smooth={true}
                    duration={500}
                    className={`inline-block px-8 py-3 rounded-full cursor-pointer relative overflow-hidden group ${theme === 'light' ? 'bg-[#f7e9d3] text-[#6B3F26] border border-[#6B3F26] hover:bg-[#e9d2b0] hover:text-[#6B3F26] hover:border-[#6B3F26]' : 'bg-blue-600 text-white'}`}
                  >
                    <span className={`relative z-10 transition-colors ${theme === 'light' ? '' : 'group-hover:text-white'}`}>{t('about.buttons.send')}</span>
                    {theme !== 'light' && <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>}
                    {theme !== 'light' && <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] group-hover:animate-shine"></div>}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Columna derecha - Skills */}
          <motion.div
            className="md:w-1/2"
            style={{ opacity }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="space-y-6"
              variants={itemVariants}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="space-y-2"
                  variants={itemVariants}
                  custom={index}
                >
                  <div className={`flex justify-between ${theme === 'light' ? 'text-[#6B3F26]' : 'text-white'}`}> 
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${theme === 'light' ? 'bg-[#f7e9d3]' : 'bg-gray-700'}`}> 
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: theme === 'light' ? 'linear-gradient(90deg, #d7263d 0%, #a80000 100%)' : 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: index * 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;