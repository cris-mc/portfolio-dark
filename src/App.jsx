import { useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import Header from './components/Header'
import ChatWidget from './components/ChatWidget'
import { useAppContext } from './context/AppContext';
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import AnimatedBackground from './components/AnimatedBackground'
import PageTransition from './components/PageTransition'
import FixedImage from './components/FixedImage'

function App() {
  const { scrollYProgress } = useScroll();
  const { theme } = useAppContext();

  useEffect(() => {
    // Desactivar el cursor por defecto
    document.documentElement.classList.add('custom-cursor');
    return () => document.documentElement.classList.remove('custom-cursor');
  }, []);

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} min-h-screen relative overflow-hidden w-full transition-colors duration-300`}>
  {/* Chat flotante */}
  <ChatWidget />
  {/* Cursor personalizado */}
  <CustomCursor />
      
      {/* Imagen fija */}
      <FixedImage />
      
      {/* Fondo animado */}
      <AnimatedBackground />
      
      {/* Barra de progreso */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <PageTransition>
        <Header />
        <main className="relative z-10">
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <Contact />
        </main>
        <Footer />
      </PageTransition>
    </div>
  )
}

export default App
