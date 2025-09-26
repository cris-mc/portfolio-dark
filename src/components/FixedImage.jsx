import { motion, useScroll, useTransform } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const FixedImage = () => {
  // Usar el scroll general de la página
  const { scrollYProgress } = useScroll();
  const { theme } = useAppContext();

  // Transformar el scroll en opacidad - 100% en Hero, difuminado en About
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.2], // mantener 100% hasta 15% (Hero) y difuminar al llegar a About
    [1, 1, 0.6]     // valores de opacidad: 100% en Hero, 60% en About
  );

  return (
    <motion.div
      className="fixed top-0 right-0 w-1/2 h-screen z-10 pointer-events-none hidden lg:block"
      style={{ opacity }}
      initial={{ opacity: 1 }}
    >
      {/* Contenedor de la imagen con gradiente */}
      <div className="relative w-full h-full">
        {/* Imagen */}
        <img
          src={theme === 'light' ? `${import.meta.env.BASE_URL}perfil-white.jpg` : `${import.meta.env.BASE_URL}perfil.jpg`}
          alt="Perfil"
          className="w-full h-full object-cover object-[center_10%] scale-115 transform"
          onError={(e) => {
            console.error('Error loading image:', e);
            e.target.style.border = '2px solid red';
          }}
        />
        
        {/* Gradiente completamente negro que se desvanece */}
        <motion.div 
          className="absolute left-0 w-1/2 h-full bg-gradient-to-r from-black from-45% to-transparent"
          style={{ opacity }}
        />
      </div>
    </motion.div>
  );
};

export default FixedImage;