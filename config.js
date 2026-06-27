/**
 * Identité — La Bulle Web
 */
export const themes = [
  { id: 'mineral', label: 'Bleu clair', swatch: '#1e5a9e' },
  { id: 'sage', label: 'Sauge & Nuit', swatch: '#8fad9a' },
  { id: 'acier', label: 'Bleu acier', swatch: '#6b9fd4' },
  { id: 'terracotta', label: 'Terracotta', swatch: '#c97b5a' },
  { id: 'ardoise', label: 'Menthe & Ardoise', swatch: '#5eb89a' },
  { id: 'corail', label: 'Corail (archivé)', swatch: '#e07a5f' },
];

export const defaultTheme = 'mineral';

/**
 * URL du portfolio une fois en ligne — sert aux en-têtes frame-ancestors des sites clients.
 * Voir embed-templates/ pour les fichiers à copier sur chaque projet.
 */
export const portfolio = {
  url: 'https://bulleweb.vercel.app',
  localUrl: 'http://localhost:3000',
};

/** Directive CSP à mettre sur les sites clients (vercel.json) */
export function frameAncestorsDirective() {
  return `'self' ${portfolio.url} ${portfolio.localUrl}`;
}

export const brand = {
  name: 'La Bulle Web',
  byline: 'Création de sites web',
  tagline: 'Sites internet sur mesure',
  description:
    'La Bulle Web crée des sites vitrines pour artisans et entreprises locales : plus de visibilité sur Google, plus de contacts, sans jargon ni surprise sur la facture.',
};

export const guarantees = [
  'Devis gratuit sous 24 h',
  'Paiement en 2 fois',
  'Hébergement 1ʳᵉ année inclus',
  'Un seul interlocuteur',
];

export const contact = {
  name: 'Hugo',
  email: 'davionhugo@gmail.com',
  phone: '06 13 80 95 65',
  phoneTel: '+33613809565',
  zone: 'Partout en France · 100 % à distance',
  response: 'Réponse sous 24 h',
  photo: 'assets/hugo-portrait.png',
};

export const nav = [
  { id: 'services', label: 'Services' },
  { id: 'projets', label: 'Réalisations' },
  { id: 'process', label: 'Méthode' },
  { id: 'tarifs', label: 'Tarifs' },
  { id: 'contact', label: 'Contact' },
];

export const hero = {
  eyebrow: 'Sites web pour artisans & commerces',
  title: 'Plus de clients',
  titleEm: 'grâce à votre site.',
  lead: 'Un site clair, rapide sur mobile et bien référencé sur Google — pour transformer vos visiteurs en appels, devis et réservations. Livré en 1 à 2 semaines.',
  ctaPrimary: 'Obtenir mon devis gratuit',
  ctaSecondary: 'Voir des exemples concrets',
  stats: [
    { value: '450', suffix: '€', label: 'à partir de' },
    { value: '1–2', suffix: ' sem.', label: 'de livraison' },
    { value: '24', suffix: ' h', label: 'pour vous répondre' },
  ],
};

export const sectors = [
  'Artisans & bâtiment',
  'Chambres d\'hôtes & gîtes',
  'Commerçants & restaurateurs',
  'Professions libérales',
];

export const services = [
  {
    icon: '✓',
    title: 'Site vitrine qui rassure',
    text: 'Présentation claire de votre activité, photos, tarifs et contact — vos clients comprennent tout en 30 secondes.',
  },
  {
    icon: '✓',
    title: 'Demandes & réservations',
    text: 'Formulaires simples : chaque demande arrive directement dans votre boîte mail, sans plateforme compliquée.',
  },
  {
    icon: '✓',
    title: 'Galerie de vos réalisations',
    text: 'Chantiers, chambres, produits : montrez votre savoir-faire et donnez envie de vous contacter.',
  },
  {
    icon: '✓',
    title: 'Visible sur Google',
    text: 'Structure et contenus pensés pour que l\'on vous trouve quand on cherche votre métier près de chez vous.',
  },
];

export const projects = [
  {
    id: 'maison-ela',
    name: "La Maison d'Ela",
    sector: 'Chambre d\'hôtes · Dordogne',
    url: 'https://www.lamaisondela.com/',
    image: './assets/screenshots/maison-ela-accueil.png',
    embed: 'iframe',
    description:
      'Site vitrine pour une chambre d\'hôtes : présentation du lieu, séjours thématiques, galerie et formulaire de réservation par e-mail.',
    outcome: 'Les voyageurs réservent en direct, sans commission intermédiaire.',
    tags: ['Vitrine', 'Réservation', 'Multilingue'],
  },
  {
    id: 'quai-des-reves',
    name: 'Quai des Rêves',
    sector: 'Maison d\'hôtes · Bretagne',
    url: 'https://quai-des-reves.vercel.app/',
    image: './assets/screenshots/quai-accueil.png',
    embed: 'iframe',
    description:
      'Histoire de l\'ancienne gare, chambres, carte du GR37 — et un formulaire pour demander une nuitée en direct.',
    outcome: 'Une vitrine chaleureuse qui donne envie de réserver sur place.',
    tags: ['Storytelling', 'Réservation'],
  },
  {
    id: 'etcbc',
    name: 'ETCBC Charpente',
    sector: 'Charpente & construction bois',
    url: 'https://www.etcbc-charpente.com/',
    image: './assets/screenshots/etcbc-accueil.png',
    embed: 'iframe',
    description:
      'Site vitrine pour l\'entreprise : métiers, zone d\'intervention, galerie de chantiers filtrable et demande de devis.',
    outcome: 'Des demandes de devis qualifiées, reçues par e-mail.',
    tags: ['Vitrine', 'Galerie', 'Devis'],
  },
  {
    id: 'sqcdp',
    name: 'SQCDP',
    sector: 'Pilotage industriel · PWA',
    url: 'https://sqcdp.vercel.app/',
    image: null,
    embed: 'iframe',
    description:
      'Application web PWA : tableaux de bord SQCDP animés, PDCA, roulette de réunion et mode hors-ligne pour l\'atelier.',
    outcome: 'Un outil métier sur mesure, utilisable au bureau comme en atelier.',
    tags: ['React', 'TypeScript', 'PWA'],
  },
];

export const process = {
  title: 'Simple, rapide, sans surprise',
  steps: [
    {
      num: '01',
      title: 'Vous m\'expliquez votre besoin',
      text: 'Un échange par téléphone ou visio : votre activité, vos clients, ce que vous voulez obtenir du site.',
    },
    {
      num: '02',
      title: 'Vous validez avant la suite',
      text: 'Première maquette en quelques jours. Vous voyez le rendu avant de vous engager sur la version finale.',
    },
    {
      num: '03',
      title: 'Mise en ligne & suivi',
      text: 'Publication du site, formation rapide si besoin. Paiement en 2 fois : acompte, solde à la livraison.',
    },
  ],
};

export const pricing = {
  title: 'Des tarifs transparents',
  from: 450,
  note: 'Moins cher qu\'une agence · Sans abonnement caché · Hébergement 1ʳᵉ année inclus',
  tiers: [
    {
      label: 'Site vitrine',
      range: '450 – 590 €',
      features: ['Présentation & photos', 'Formulaire de contact', 'Mobile & Google'],
      highlight: true,
      badge: 'Le plus demandé',
    },
    {
      label: 'Site vitrine +',
      range: '600 – 900 €',
      features: ['Galerie & pages multiples', 'Meilleure visibilité Google', 'Actualités'],
    },
    {
      label: 'Site dynamique',
      range: '1 000 € et +',
      features: ['Réservations en ligne', 'Contenus modifiables', 'Sur étude'],
    },
  ],
  footnotes: [
    'Devis gratuit · Sans engagement',
    'Pas d\'abonnement obligatoire',
    'Paiement en 2 fois : acompte, solde à la livraison',
  ],
};

export const promo = {
  title: 'Prêt à lancer votre site ?',
  text: 'Décrivez-moi votre projet : je vous réponds sous 24 h avec un devis gratuit et des conseils adaptés à votre activité.',
  cta: 'Demander mon devis gratuit',
};

export const about = {
  title: 'La Bulle Web',
  text: 'Je crée des sites pour des artisans, gîtes et commerces qui veulent être trouvés sur Google et rassurer leurs clients dès la première visite. Pas d\'agence opaque : vous parlez à la personne qui conçoit et développe votre site.',
  bullets: [
    'Échanges simples, sans jargon technique',
    'Sites adaptés aux smartphones (la majorité de vos visiteurs)',
    'Référencement local & hébergement inclus la 1ʳᵉ année',
  ],
};
