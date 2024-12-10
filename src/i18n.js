import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend'; // Pour charger les traductions à partir du backend

// Initialisation d'i18next
i18n
  .use(Backend) // Utilise le backend pour charger les fichiers de traduction
  .use(initReactI18next)
  .init({
    // Langue par défaut
    lng: localStorage.getItem('language') || 'fr',  // Si la langue est sauvegardée dans localStorage, utilisez-la, sinon initialisez à 'fr'
    fallbackLng: 'fr', // Langue de secours en cas de problème
    interpolation: {
      escapeValue: false, // React gère l'échappement des valeurs
    },
    backend: {
      // Chargement des fichiers de traduction depuis /public/locales
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export default i18n;
