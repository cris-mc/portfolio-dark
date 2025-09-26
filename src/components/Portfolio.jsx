import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useAppContext, useTranslation } from '../context/AppContext';

const Portfolio = () => {
  const sectionRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const { theme } = useAppContext();
  const { lang } = useTranslation();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const projects = [
    {
      id: 1,
  title: "Github Portfolio",
  category: "Front & Back Development",
      description: {
  es: "Porfolio digital de proyectos personales",
        en: "Digital Portfolio for Development Projects"
      },
  image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Next.js", "Tailwind CSS", "Node.js"],
  url: "https://github.com/cris-mc/"
    },
    {
      id: 2,
  title: "Rumis App",
  category: "Mobile Development & UX/UI Design",
  description: "",
  image: `${import.meta.env.BASE_URL}Rumis.jpg`,
  technologies: ["React Native", "Firebase", "TypeScript", "Figma"],
      url: "https://www.behance.net/gallery/111254781/Rumis-UXUI-project"
    },
    {
      id: 3,
      title: "Branding El Ciprés",
  category: "Graphic Design",
  description: {
  es: "Manual de identidad visual para una marca del sector retail",
  en: "Brand Visual Identity Manual for a Retail Business"
  },
  image: `${import.meta.env.BASE_URL}elcipres.jpg`,
  technologies: ["Illustrator", "Photoshop", "Figma", "Branding", "Identidad corporativa"],
  url: "https://www.behance.net/gallery/235391581/Manual-de-identidad-visual"
    }
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

  const projectVariants = {
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
    <section
      id="portfolio"
      ref={sectionRef}
      className={`relative py-20 overflow-hidden ${theme === 'light' ? 'bg-[#6B3F26]' : 'bg-gradient-to-b from-gray-900 to-gray-800'}`}
    >
      {/* Background animation */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
          y
        }}
      />

      <motion.div
        style={{ opacity }}
        className={`container mx-auto px-4 relative z-10 ${theme === 'light' ? 'text-[#f7e9d3]' : ''}`}
      >
        <motion.h2
          className={`text-3xl md:text-5xl font-bold text-center mb-16 ${theme === 'light' ? 'text-[#f7e9d3]' : 'text-white'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {(() => {
            const { lang } = useTranslation();
            return lang === 'en'
              ? (<><span className="font-thin">Port</span><span className="font-leckerli">folio</span></>)
              : (<><span className="font-thin">Porta</span><span className="font-leckerli">folio</span></>);
          })()}
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <motion.div
                variants={projectVariants}
                className="relative group"
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                  {/* Project Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay */}
                  <motion.div
                    className={`absolute inset-0 transition-opacity duration-300 ${project.id === 2 ? 'bg-black/40' : 'bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent opacity-80'}`}
                    initial={{ opacity: 0.5 }}
                    whileHover={{ opacity: 0.9 }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      {/* Gradiente gris sobre textos al hacer hover */}
                      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-black transition-opacity duration-300 z-10"></div>
                      <span className={`relative z-20 text-sm font-medium mb-2 block ${theme === 'light' ? 'text-[#f7e9d3]' : 'text-blue-400'}`}>
                        {project.id === 2 ? 'Mobile Development & UX/UI Design' : project.category}
                      </span>
                      <h3 className={`relative z-20 text-xl font-bold mb-2 ${theme === 'light' ? 'text-[#f7e9d3]' : 'text-white'}`}>
                        {project.id === 2 ? 'Rumis App' : project.title}
                      </h3>
                      <p className={`relative z-20 mb-4 ${theme === 'light' ? 'text-[#f7e9d3]' : 'text-gray-300'}`}>
                        {project.id === 2
                          ? (lang === 'es'
                              ? 'UX/UI de app para compartir alquiler y encontrar roomie.'
                              : 'UX/UI for an app to split rent and find a roomie.')
                          : (project.id === 3
                              ? (lang === 'es' ? project.description.es : project.description.en)
                              : (project.id === 1
                                  ? (lang === 'es' ? project.description.es : project.description.en)
                                  : project.description))}
                      </p>
                      <div className="relative z-20 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 rounded-full text-sm ${theme === 'light' ? 'bg-[#a97c50] text-[#f7e9d3]' : 'bg-gray-800/50 text-gray-300 backdrop-blur-sm'}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-30 blur transition-opacity duration-300"
                  style={{
                    zIndex: -1,
                  }}
                  animate={{
                    scale: hoveredProject === project.id ? 1.02 : 1,
                  }}
                />
              </motion.div>
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Portfolio;