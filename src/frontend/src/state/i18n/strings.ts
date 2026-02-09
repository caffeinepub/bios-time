export type UILanguage = 'en' | 'fr';

type TranslationKey = 
  // Navigation
  | 'nav.dashboard'
  | 'nav.trueTime'
  | 'nav.chronicle'
  | 'nav.rituals'
  | 'nav.dreams'
  | 'nav.settings'
  | 'nav.ethics'
  | 'nav.biosTimeRitual'
  // Dashboard
  | 'dashboard.title'
  | 'dashboard.welcomeGuest'
  | 'dashboard.welcomeUser'
  | 'dashboard.subtitle'
  // True Time
  | 'trueTime.title'
  | 'trueTime.subtitle'
  | 'trueTime.horizonDial'
  | 'trueTime.analemma'
  | 'trueTime.equationOfTime'
  // Chronicle
  | 'chronicle.title'
  | 'chronicle.subtitle'
  | 'chronicle.disclaimer'
  // Settings
  | 'settings.title'
  | 'settings.subtitle'
  | 'settings.dateDisplay'
  | 'settings.dateDisplayDesc'
  | 'settings.language'
  | 'settings.languageDesc'
  | 'settings.tts'
  | 'settings.ttsDesc'
  | 'settings.privacy'
  | 'settings.privacyDesc'
  | 'settings.ethics'
  | 'settings.ethicsDesc'
  // Ethics
  | 'ethics.title'
  | 'ethics.subtitle'
  // Footer
  | 'footer.ethics'
  // Ritual
  | 'ritual.title'
  | 'ritual.description'
  | 'ritual.start'
  | 'ritual.exit'
  | 'ritual.mute'
  | 'ritual.unmute'
  | 'ritual.souffle.aligned'
  | 'ritual.souffle.recovery'
  | 'ritual.souffle.alert'
  | 'ritual.souffle.hint'
  | 'ritual.bloom.petal.sky'
  | 'ritual.bloom.petal.skyValue'
  | 'ritual.bloom.petal.body'
  | 'ritual.bloom.petal.bodyValue'
  | 'ritual.bloom.petal.earth'
  | 'ritual.bloom.petal.earthValue'
  | 'ritual.bloom.enterCompass'
  | 'ritual.boussole.locked'
  | 'ritual.boussole.seeking'
  | 'ritual.boussole.hint'
  | 'ritual.boussole.exit'
  | 'ritual.notice.audioInteraction'
  | 'ritual.notice.orientationSimulated';

type Translations = Record<UILanguage, Record<TranslationKey, string>>;

const translations: Translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.trueTime': 'True Time',
    'nav.chronicle': 'Chronicle',
    'nav.rituals': 'Rituals',
    'nav.dreams': 'Dreams',
    'nav.settings': 'Settings',
    'nav.ethics': 'Ethics & Disclaimers',
    'nav.biosTimeRitual': 'BIOS-TIME',
    // Dashboard
    'dashboard.title': 'BIOS-TIME',
    'dashboard.welcomeGuest': 'Welcome to BIOS-TIME',
    'dashboard.welcomeUser': 'Welcome',
    'dashboard.subtitle': 'Your personal temporal sanctuary',
    // True Time
    'trueTime.title': 'True Time',
    'trueTime.subtitle': 'Navigate with the sun, not against the clock',
    'trueTime.horizonDial': 'Horizon Dial',
    'trueTime.analemma': 'Analemma',
    'trueTime.equationOfTime': 'Equation of Time',
    // Chronicle
    'chronicle.title': 'Holocene Chronicle',
    'chronicle.subtitle': 'A journey through 12,000 years of human civilization',
    'chronicle.disclaimer': 'This timeline presents interpretive historical content for contemplative purposes.',
    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Configure your BIOS-TIME experience',
    'settings.dateDisplay': 'Date Display',
    'settings.dateDisplayDesc': 'Choose how dates are displayed throughout the application',
    'settings.language': 'Language',
    'settings.languageDesc': 'Select your preferred interface language',
    'settings.tts': 'Text-to-Speech',
    'settings.ttsDesc': 'Enable audio playback for reading content',
    'settings.privacy': 'Privacy & Data Storage',
    'settings.privacyDesc': 'Control how your personal data is stored',
    'settings.ethics': 'Ethical Principles',
    'settings.ethicsDesc': 'The values that guide BIOS-TIME',
    // Ethics
    'ethics.title': 'Ethics & Disclaimers',
    'ethics.subtitle': 'Important information about using BIOS-TIME',
    // Footer
    'footer.ethics': 'Ethics & Disclaimers',
    // Ritual
    'ritual.title': 'BIOS-TIME Ritual',
    'ritual.description': 'Experience the three-screen journey: Souffle, Bloom, and Boussole. Align with cosmic rhythms.',
    'ritual.start': 'Begin Ritual',
    'ritual.exit': 'Exit',
    'ritual.mute': 'Mute',
    'ritual.unmute': 'Unmute',
    'ritual.souffle.aligned': 'Aligned · Zenith',
    'ritual.souffle.recovery': 'Recovery · Nadir',
    'ritual.souffle.alert': 'Alert · Surcharge Detected',
    'ritual.souffle.hint': 'Long press to open',
    'ritual.bloom.petal.sky': 'Sky · Lunar',
    'ritual.bloom.petal.skyValue': 'Gibbous · Perigee',
    'ritual.bloom.petal.body': 'Body · Biometrics',
    'ritual.bloom.petal.bodyValue': 'Coherence: 72ms',
    'ritual.bloom.petal.earth': 'Earth · Environment',
    'ritual.bloom.petal.earthValue': 'Shield Kp 2',
    'ritual.bloom.enterCompass': 'Enter Compass Mode',
    'ritual.boussole.locked': 'Locked · Alignment Complete',
    'ritual.boussole.seeking': 'Seeking Alignment',
    'ritual.boussole.hint': 'Rotate to align with the celestial body',
    'ritual.boussole.exit': 'Exit Compass',
    'ritual.notice.audioInteraction': 'Tap anywhere to enable sound',
    'ritual.notice.orientationSimulated': 'Device orientation unavailable; using simulator',
  },
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.trueTime': 'Temps Vrai',
    'nav.chronicle': 'Chronique',
    'nav.rituals': 'Rituels',
    'nav.dreams': 'Rêves',
    'nav.settings': 'Paramètres',
    'nav.ethics': 'Éthique et avertissements',
    'nav.biosTimeRitual': 'BIOS-TIME',
    // Dashboard
    'dashboard.title': 'BIOS-TIME',
    'dashboard.welcomeGuest': 'Bienvenue à BIOS-TIME',
    'dashboard.welcomeUser': 'Bienvenue',
    'dashboard.subtitle': 'Votre sanctuaire temporel personnel',
    // True Time
    'trueTime.title': 'Temps Vrai',
    'trueTime.subtitle': 'Naviguez avec le soleil, pas contre l\'horloge',
    'trueTime.horizonDial': 'Cadran d\'Horizon',
    'trueTime.analemma': 'Analemme',
    'trueTime.equationOfTime': 'Équation du Temps',
    // Chronicle
    'chronicle.title': 'Chronique de l\'Holocène',
    'chronicle.subtitle': 'Un voyage à travers 12 000 ans de civilisation humaine',
    'chronicle.disclaimer': 'Cette chronologie présente un contenu historique interprétatif à des fins contemplatives.',
    // Settings
    'settings.title': 'Paramètres',
    'settings.subtitle': 'Configurez votre expérience BIOS-TIME',
    'settings.dateDisplay': 'Affichage des dates',
    'settings.dateDisplayDesc': 'Choisissez comment les dates sont affichées dans l\'application',
    'settings.language': 'Langue',
    'settings.languageDesc': 'Sélectionnez votre langue d\'interface préférée',
    'settings.tts': 'Synthèse vocale',
    'settings.ttsDesc': 'Activer la lecture audio du contenu',
    'settings.privacy': 'Confidentialité et stockage des données',
    'settings.privacyDesc': 'Contrôlez comment vos données personnelles sont stockées',
    'settings.ethics': 'Principes éthiques',
    'settings.ethicsDesc': 'Les valeurs qui guident BIOS-TIME',
    // Ethics
    'ethics.title': 'Éthique et avertissements',
    'ethics.subtitle': 'Informations importantes sur l\'utilisation de BIOS-TIME',
    // Footer
    'footer.ethics': 'Éthique et avertissements',
    // Ritual
    'ritual.title': 'Rituel BIOS-TIME',
    'ritual.description': 'Vivez le voyage en trois écrans : Souffle, Bloom et Boussole. Alignez-vous avec les rythmes cosmiques.',
    'ritual.start': 'Commencer le rituel',
    'ritual.exit': 'Sortir',
    'ritual.mute': 'Muet',
    'ritual.unmute': 'Activer le son',
    'ritual.souffle.aligned': 'Aligné · Zénith',
    'ritual.souffle.recovery': 'Récupération · Nadir',
    'ritual.souffle.alert': 'Alerte · Surcharge détectée',
    'ritual.souffle.hint': 'Appui long pour ouvrir',
    'ritual.bloom.petal.sky': 'Ciel · Lunaire',
    'ritual.bloom.petal.skyValue': 'Gibbeuse · Périgée',
    'ritual.bloom.petal.body': 'Corps · Biométrie',
    'ritual.bloom.petal.bodyValue': 'Cohérence : 72ms',
    'ritual.bloom.petal.earth': 'Terre · Environnement',
    'ritual.bloom.petal.earthValue': 'Bouclier Kp 2',
    'ritual.bloom.enterCompass': 'Entrer en mode boussole',
    'ritual.boussole.locked': 'Verrouillé · Alignement complet',
    'ritual.boussole.seeking': 'Recherche d\'alignement',
    'ritual.boussole.hint': 'Tournez pour vous aligner avec l\'astre',
    'ritual.boussole.exit': 'Quitter la boussole',
    'ritual.notice.audioInteraction': 'Appuyez n\'importe où pour activer le son',
    'ritual.notice.orientationSimulated': 'Orientation de l\'appareil indisponible ; utilisation du simulateur',
  },
};

export function translate(key: TranslationKey, language: UILanguage): string {
  return translations[language][key] || translations.en[key] || key;
}

export { translations };
export type { TranslationKey };
