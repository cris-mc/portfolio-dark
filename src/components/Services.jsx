import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation, useAppContext } from '../context/AppContext';

const Services = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const { t } = useTranslation();
  const { theme } = useAppContext();
  const services = Array.from({ length: 3 }, (_, i) => {
    const icons = [
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" key="icon0"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" key="icon1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" key="icon2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 4h6a2 2 0 002-2v-2a2 2 0 00-2-2H7a2 2 0 00-2 2v2a2 2 0 002 2z" /></svg>
    ];
    const gradients = [
      "from-blue-600 to-indigo-600",
      "from-purple-600 to-pink-600",
      "from-yellow-600 to-orange-600"
    ];
    const title = t(`services.${i}.title`);
    const description = t(`services.${i}.description`);
    return {
      title: title || 'Service',
      description: description || 'Service description.',
      icon: icons[i],
      gradient: gradients[i]
    };
  });
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
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
      id="services" 
      ref={sectionRef}
      className={`relative py-20 overflow-hidden ${theme === 'light' ? 'bg-[#6B3F26]' : 'bg-gradient-to-b from-gray-800 to-gray-900'}`}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
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
          className={`text-3xl md:text-5xl font-bold text-center mb-16 font-thin ${theme === 'light' ? 'text-[#f7e9d3]' : 'text-white'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {t('services.title')}
        </motion.h2>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-sm" />
              <div className={`p-8 rounded-lg relative z-10 h-full border transition-colors backdrop-blur-sm ${theme === 'light' ? 'bg-[#f7e9d3] border-[#e9d2b0] text-[#6B3F26]' : 'bg-gray-800/90 border-gray-700 hover:border-gray-600 text-white'}`}> 
                <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-[#6B3F26]' : 'text-white'}`}>{service.title}</h3>
                <p className={`leading-relaxed ${theme === 'light' ? 'text-[#6B3F26]' : 'text-gray-400'}`}>
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;