import { Link } from 'react-scroll';
import { RiLinkedinFill, RiInstagramFill, RiGithubFill, RiWhatsappFill } from 'react-icons/ri';
import { useTranslation } from '../context/AppContext';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="relative bg-black text-gray-400 py-12 z-30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Portfolio</h3>
            <p className="mb-4">
              {t('footer.slogan')}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/cris-mc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <RiLinkedinFill className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/cris.imc/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <RiInstagramFill className="w-6 h-6" />
              </a>
              <a href="https://wa.me/5493517660000" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <RiWhatsappFill className="w-6 h-6" />
              </a>
              <a href="https://github.com/cris-mc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <RiGithubFill className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link to="home" smooth={true} duration={500} className="hover:text-white transition-colors cursor-pointer">{t('navbar.home') || 'Inicio'}</Link></li>
              <li><Link to="about" smooth={true} duration={500} className="hover:text-white transition-colors cursor-pointer">{t('navbar.about')}</Link></li>
              <li><Link to="services" smooth={true} duration={500} className="hover:text-white transition-colors cursor-pointer">{t('navbar.services')}</Link></li>
              <li><Link to="portfolio" smooth={true} duration={500} className="hover:text-white transition-colors cursor-pointer">{t('navbar.portfolio')}</Link></li>
              <li><Link to="contact" smooth={true} duration={500} className="hover:text-white transition-colors cursor-pointer">{t('navbar.contact')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">{t('footer.contactInfo')}</h3>
            <ul className="space-y-2">
              <li><strong>{t('footer.email')}:</strong> cris.imcn@gmail.com</li>
              <li><strong>{t('footer.phone')}:</strong> (+54) 9 3518-111000</li>
              <li><strong>{t('footer.location')}:</strong> Córdoba, Argentina</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="pb-16 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;