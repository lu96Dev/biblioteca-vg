import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import es from './locales/es.json';

// Idioma inicial: el del navegador (inglés si empieza por "en", español en cualquier otro caso).
// Pendiente de decidir: dónde se guarda la preferencia del usuario (ver dossier, decisión 12).
const initial = navigator.language.toLowerCase().startsWith('en') ? 'en' : 'es';

export const i18n = createI18n({
  legacy: false,
  locale: initial,
  fallbackLocale: 'es',
  messages: { es, en },
});
