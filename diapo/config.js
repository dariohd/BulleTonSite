/**
 * Diapo promo, alignée sur bulletonsite.com (Bulle ton site)
 * Assets partagés avec le site principal (../assets/)
 */
const assets = '../assets/';

export const brand = {
  name: 'Bulle ton site',
  byline: 'Création de sites web',
  url: 'https://bulletonsite.com',
  logo: `${assets}favicon.svg`,
};

export const contact = {
  name: 'Bulle ton site',
  role: 'Création de sites web sur mesure',
  email: 'bulletonsite@gmail.com',
  phone: '06 13 80 95 65',
  zone: 'Partout en France',
  responseTime: 'Réponse sous 24 h',
};

export const team = [
  {
    name: 'Audrey Jurado',
    role: 'Communication · Relationnel',
    photo: `${assets}audrey-jurado.png`,
  },
  {
    name: 'Niyazi Azaiez',
    role: 'Identité visuelle · Graphiste',
    photo: `${assets}niyazi-azaiez.png`,
  },
  {
    name: 'Hugo Davion',
    role: 'Développeur web',
    photo: `${assets}hugo-portrait.png`,
  },
];

export const services = [
  { title: 'Identité visuelle', text: 'Logo, couleurs, typographie' },
  { title: 'Site qui rassure', text: 'Présentation claire en 30 secondes' },
  { title: 'Demandes & réservations', text: 'Formulaires simples par e-mail' },
  { title: 'Visible sur Google', text: 'Structure pensée pour le référencement' },
];

export const compare = {
  title: 'Faire soi-même ou être accompagné ?',
  bad: {
    label: 'Faire soi-même',
    hint: 'Modèles et outils en ligne',
    points: [
      'Modèles prêts à l\'emploi, look souvent générique',
      'Vous avancez seul, aide surtout technique',
      'Mises à jour à faire vous-même',
    ],
  },
  good: {
    label: 'Bulle ton site',
    hint: 'Création sur mesure',
    points: [
      'Design pensé pour votre métier',
      'Équipe dédiée, sans jargon',
      'Vous nous envoyez vos changements',
    ],
  },
};

export const sectorsZone = {
  title: 'Pour qui ?',
  titleEm: 'Partout en France',
  sectorItems: [
    'Artisans & bâtiment',
    'Chambres d\'hôtes & gîtes',
    'Commerçants & restaurateurs',
    'Professions libérales',
  ],
  zoneLead: 'Visio, partage d\'écran et suivi jusqu\'à la mise en ligne.',
};

export const processDelivery = {
  title: 'Simple, rapide, sans surprise',
  steps: [
    {
      title: 'Vous exposez votre besoin',
      text: 'Échange par téléphone ou visio : votre activité et vos attentes.',
      who: 'Audrey · Communication',
    },
    {
      title: 'Prototype & identité visuelle',
      text: 'Maquette et direction graphique en 2–3 jours. Vous validez avant le dev.',
      who: 'Niyazi · Identité visuelle',
    },
    {
      title: 'Développement & mise en ligne',
      text: 'Intégration, tests mobile, publication. Paiement en 2 fois.',
      who: 'Hugo · Développement web',
    },
  ],
  firstPreview: '2–3 jours',
  total: '1 à 2 semaines',
  footnote: 'Devis gratuit · Sans engagement · Paiement en 2 fois.',
};

export const testimonial = {
  quote:
    'Échanges simples, pas de jargon. La maquette est arrivée en quelques jours et on a pu ajuster avant la mise en ligne.',
  author: 'Marie-Claire',
  role: 'Quai des Rêves · maison d\'hôtes',
};

export const guarantees = [
  'Devis gratuit sous 24 h',
  'Paiement en 2 fois',
  'Entretien & maintenance 20 €/mois',
  'Équipe dédiée du brief à la livraison',
];

export const pricing = {
  hook: 'Tarifs transparents',
  tagline: 'Toujours sur devis · gratuit sous 24 h',
  from: 450,
  tiers: [
    { label: 'Site sur mesure', range: '450 – 900 €', highlight: true },
    { label: 'Site dynamique', range: '1 000 €+' },
  ],
  example: 'Ex. chambre d\'hôtes · ~690 €',
  maintenance: '20 €/mois · entretien & hébergement',
};

const projectEla = {
  type: 'project',
  duration: 5.5,
  name: "La Maison d'Ela",
  sector: 'Chambre d\'hôtes · Dordogne',
  url: 'https://www.lamaisondela.com/',
  screens: [
    { tag: 'Page d\'accueil', image: `${assets}screenshots/maison-ela-accueil.png`, url: 'https://www.lamaisondela.com/' },
    { tag: 'Réservation', image: `${assets}screenshots/maison-ela-reservation.png`, url: 'https://www.lamaisondela.com/#reservation' },
  ],
  betweenText:
    'Site vitrine : séjours thématiques, galerie et réservation par e-mail. Les voyageurs réservent en direct, sans commission.',
};

const projectQuai = {
  type: 'project',
  duration: 5.5,
  name: 'Quai des Rêves',
  sector: 'Maison d\'hôtes · Bretagne',
  url: 'https://quai-des-reves.vercel.app/',
  screens: [
    { tag: 'Page d\'accueil', image: `${assets}screenshots/quai-accueil.png`, url: 'https://quai-des-reves.vercel.app/' },
    { tag: 'Réservation', image: `${assets}screenshots/quai-reservation.png`, url: 'https://quai-des-reves.vercel.app/#reserver' },
  ],
  betweenText:
    'Histoire de l\'ancienne gare, chambres et GR37. Formulaire de nuitée intégré, prototype livré en 3 jours.',
};

const projectEtcbc = {
  type: 'project',
  duration: 5.5,
  name: 'ETCBC Charpente',
  sector: 'Charpente & construction bois',
  url: 'https://www.etcbc-charpente.com/',
  screens: [
    { tag: 'Page d\'accueil', image: `${assets}screenshots/etcbc-accueil.png`, url: 'https://www.etcbc-charpente.com/' },
    { tag: 'Galerie chantiers', image: `${assets}screenshots/etcbc-realisations.png`, url: 'https://www.etcbc-charpente.com/realisations.html' },
  ],
  betweenText:
    'Métiers, zone d\'intervention et galerie filtrable. Des demandes de devis qualifiées reçues par e-mail.',
};

const projectSqcdp = {
  type: 'project',
  duration: 5,
  name: 'SQCDP',
  sector: 'Outil métier · PWA',
  badge: 'Sur mesure',
  url: 'https://sqcdp.vercel.app/',
  screens: [{ tag: 'Tableaux de bord', url: 'https://sqcdp.vercel.app/' }],
  betweenText:
    'Application PWA : tableaux SQCDP animés, mode hors-ligne atelier. Pas seulement des vitrines : des outils métier.',
};

/** Version complète (~75 s) */
export const slides = [
  {
    type: 'hook',
    duration: 4,
    line1: 'Votre site internet,',
    line2: 'conçu en équipe.',
    sub: 'Communication, identité visuelle & développement · devis gratuit sous 24 h.',
    caption: 'Artisans · Gîtes · Commerces · Outils métier',
  },
  {
    type: 'intro',
    duration: 5,
    eyebrow: 'Identité visuelle · communication · développement',
    title: 'Sites web & outils',
    titleEm: 'sur mesure',
    subtitle:
      'Bulle ton site réunit trois métiers : une équipe qui conçoit vitrines, réservations et outils adaptés à votre activité.',
    bullets: [
      'Prototype en 2–3 jours · Livraison en 1 à 2 semaines',
      'Mobile, Google & formulaires simples',
      'Un interlocuteur par étape, sans jargon',
    ],
  },
  { type: 'team', duration: 5 },
  { type: 'services', duration: 4.5 },
  { type: 'compare', duration: 5 },
  { type: 'sectorsZone', duration: 4 },
  projectEla,
  projectQuai,
  projectEtcbc,
  projectSqcdp,
  { type: 'processDelivery', duration: 5.5 },
  { type: 'testimonial', duration: 4.5 },
  { type: 'guarantees', duration: 4.5 },
  { type: 'pricing', duration: 5, caption: 'Dès 450 € · Sur devis' },
  {
    type: 'cta',
    duration: 6,
    title: 'Un devis gratuit',
    titleEm: 'sous 24 h',
    sub: 'Devis gratuit · Sans engagement',
    caption: 'bulletonsite.com',
  },
];

/** Version courte réseaux (~48 s) */
export const slidesShort = [
  {
    type: 'hook',
    duration: 3.5,
    line1: 'Votre site internet,',
    line2: 'conçu en équipe.',
    sub: 'Sur mesure · Devis gratuit sous 24 h.',
    caption: 'Bulle ton site',
  },
  {
    type: 'intro',
    duration: 4,
    eyebrow: 'Bulle ton site',
    title: 'Sites & outils',
    titleEm: 'sur mesure',
    subtitle: 'Communication, identité visuelle et développement réunis.',
    bullets: ['Prototype en 2–3 jours', 'Équipe dédiée'],
  },
  { type: 'team', duration: 4 },
  { type: 'compare', duration: 4 },
  { type: 'sectorsZone', duration: 3.5 },
  { ...projectQuai, duration: 5 },
  { ...projectSqcdp, duration: 4.5 },
  { type: 'pricing', duration: 4.5, caption: 'Dès 450 € · Sur devis' },
  {
    type: 'cta',
    duration: 5,
    title: 'Un devis gratuit',
    titleEm: 'sous 24 h',
    sub: 'Sans engagement',
    caption: 'bulletonsite.com',
  },
];

export function getSlides(short = false) {
  return short ? slidesShort : slides;
}

/** Capture via mshots (secours si pas d'image locale) */
export function screenshotUrl(url) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1600`;
}
