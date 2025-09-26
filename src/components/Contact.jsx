import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useTranslation, useAppContext } from '../context/AppContext';

const Contact = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    title: "",
    message: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    try {
      await emailjs.send(
        "cristtian77",
        "template_cristtian77",
        formData,
        "jf1NBbyd7XmLooJD1"
      );
      setStatus({ submitting: false, submitted: true, error: null });
      setFormData({ user_name: "", user_email: "", title: "", message: "" });

      // Reset form success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, submitted: false }));
      }, 5000);

    } catch (error) {
      setStatus({ submitting: false, submitted: false, error: error.message });
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <section id="contact" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${theme === 'light' ? 'text-[#f7e9d3]' : 'text-white'}`}>
            {(() => {
              const title = t('contact.title');
              function renderWord(word, after) {
                let symbol = '';
                let afterText = after;
                if (after.trim().startsWith('!')) {
                  symbol = '!';
                  afterText = after.replace('!', '');
                } else if (after.includes('?')) {
                  const parts = after.split('?');
                  afterText = parts[0];
                  symbol = '?';
                }
                return <><span className="font-leckerli text-4xl md:text-5xl">{word}{symbol && <span className="font-leckerli text-4xl md:text-5xl">{symbol}</span>}</span>{afterText}</>;
              }
              if (title.includes('mensaje')) {
                const [before, after] = title.split('mensaje');
                return <>{before}{renderWord('mensaje', after)}</>;
              } else if (title.includes('message')) {
                const [before, after] = title.split('message');
                return <>{before}{renderWord('message', after)}</>;
              } else {
                return title;
              }
            })()}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="user_name" className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-[#f7e9d3]' : 'text-gray-300'}`}>
                {t('contact.name')}
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder={t('contact.placeholders.name')}
                required
              />
            </div>
            <div>
              <label htmlFor="user_email" className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-[#f7e9d3]' : 'text-gray-300'}`}>
                {t('contact.email')}
              </label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder={t('contact.placeholders.email')}
                required
              />
            </div>
            <div>
              <label htmlFor="title" className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-[#f7e9d3]' : 'text-gray-300'}`}>
                {t('contact.subject')}
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder={t('contact.placeholders.subject')}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-[#f7e9d3]' : 'text-gray-300'}`}>
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder={t('contact.placeholders.message')}
                rows={5}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-bold bg-blue-600 hover:bg-blue-700 transition-colors ${theme === 'light' ? 'text-[#6B3F26]' : 'text-white'}`}
            >
              {status.submitting ? t('contact.sending') : t('contact.send')}
            </button>
            {status.submitted && (
              <div className="mt-4 p-4 bg-green-500 text-white rounded-lg">
                Message sent successfully!
              </div>
            )}
            {status.error && (
              <div className="mt-4 p-4 bg-red-500 text-white rounded-lg">
                Error: {status.error}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
