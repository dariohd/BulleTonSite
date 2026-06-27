/**
 * Identité, Bulle ton site
 */
export const themes = [
  { id: 'mineral', label: 'Bulle', swatch: '#a78bfa' },
  { id: 'sage', label: 'Sauge & Nuit', swatch: '#8fad9a' },
  { id: 'acier', label: 'Bleu acier', swatch: '#6b9fd4' },
  { id: 'terracotta', label: 'Terracotta', swatch: '#c97b5a' },
  { id: 'ardoise', label: 'Menthe & Ardoise', swatch: '#5eb89a' },
  { id: 'corail', label: 'Corail (archivé)', swatch: '#e07a5f' },
];

export const defaultTheme = 'mineral';

export const portfolio = {
  url: 'https://bulletonsite.com',
  domain: 'https://bulletonsite.com',
  localUrl: 'http://localhost:3000',
  /** Domaines autorisés à afficher ce site en iframe (portfolio + préprod locale). */
  frameAncestors: [
    'https://bulletonsite.vercel.app',
    'https://bulletonsite.com',
    'https://www.bulletonsite.com',
    'http://localhost:3000',
  ],
};

export function frameAncestorsDirective() {
  return `'self' ${portfolio.frameAncestors.join(' ')}`;
}

/** Valeur CSP à copier dans vercel.json / _headers des sites clients. */
export const clientEmbedCsp = `frame-ancestors 'self' ${portfolio.frameAncestors.join(' ')}`;

export const brand = {
  name: 'Bulle ton site',
  byline: 'Création de sites web',
  tagline: 'Sites internet sur mesure',
  description:
    'Bulle ton site, création de sites web sur mesure pour artisans, gîtes et commerces. Vitrines, outils métier, réservations. Devis gratuit sous 24 h.',
};

export const seo = {
  title: 'Bulle ton site · Création de sites web sur mesure',
  description:
    'Sites web et outils sur mesure : communication, création d\'identité visuelle et développement réunis. Artisans, gîtes, commerces. Dès 450 € · devis gratuit sous 24 h.',
  ogImage: 'assets/og-bubble.svg',
};

export const guarantees = [
  'Devis gratuit sous 24 h',
  'Paiement en 2 fois',
  'Entretien & maintenance 20 €/mois',
  'Équipe dédiée',
];

export const contact = {
  name: 'Hugo',
  email: 'bulletonsite@gmail.com',
  phone: '06 13 80 95 65',
  phoneTel: '+33613809565',
  zone: 'Partout en France · 100 % à distance',
  response: 'Réponse sous 24 h',
  photo: 'assets/hugo-portrait.png',
};

/** Formulaire : Web3Forms (recommandé) ou FormSubmit en secours. */
export const form = {
  /** Clé gratuite sur https://web3forms.com (e-mail bulletonsite@gmail.com). */
  web3formsAccessKey: '',
};

/** Statistiques Plausible, activer après création du site sur plausible.io */
export const analytics = {
  enabled: true,
  domain: 'bulletonsite.com',
  scriptSrc: 'https://plausible.io/js/script.js',
};

export const nav = [
  { id: 'services', label: 'Services' },
  { id: 'projets', label: 'Réalisations' },
  { id: 'tarifs', label: 'Tarifs' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export const hero = {
  eyebrow: 'Identité visuelle · communication · développement',
  title: 'Votre site internet,',
  titleEm: 'conçu en équipe.',
  lead:
    'Communication, création d\'identité visuelle et développement réunis : vitrines, réservations, outils métier. Nous créons ce dont vous avez besoin. Un interlocuteur par métier, du brief au prototype en quelques jours.',
  chips: ['Équipe dédiée', 'Prototype en 2–3 jours', 'Mobile & Google'],
  ctaPrimary: 'Demander un devis gratuit',
  ctaSecondary: 'Voir nos réalisations',
  stats: [
    { value: '4', suffix: '+', label: 'sites livrés' },
    { value: '450', suffix: '€', label: 'dès' },
    { value: '1–2', suffix: ' sem.', label: 'de création' },
    { value: '2–3', suffix: ' jours', label: 'premier prototype' },
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
    title: 'Identité visuelle',
    text: 'Logo, couleurs, typographie : une image claire et cohérente que vos clients reconnaissent tout de suite.',
  },
  {
    icon: '✓',
    title: 'Site qui rassure',
    text: 'Présentation claire de votre activité, photos, tarifs et contact, vos clients comprennent tout en 30 secondes.',
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
    category: 'vitrine',
    name: "La Maison d'Ela",
    sector: 'Chambre d\'hôtes · Dordogne',
    url: 'https://www.lamaisondela.com/',
    image: './assets/screenshots/maison-ela-accueil.png',
    description:
      'Site vitrine pour une chambre d\'hôtes : présentation du lieu, séjours thématiques, galerie et formulaire de réservation par e-mail.',
    outcome: 'Les voyageurs réservent en direct, sans commission intermédiaire.',
    results: ['Livré en 2 semaines', 'Réservations par e-mail', 'Site multilingue'],
    tags: ['Vitrine', 'Réservation', 'Multilingue'],
  },
  {
    id: 'quai-des-reves',
    category: 'vitrine',
    name: 'Quai des Rêves',
    sector: 'Maison d\'hôtes · Bretagne',
    url: 'https://quai-des-reves.vercel.app/',
    image: './assets/screenshots/quai-accueil.png',
    description:
      'Histoire de l\'ancienne gare, chambres, carte du GR37, et un formulaire pour demander une nuitée en direct.',
    outcome: 'Une vitrine chaleureuse qui donne envie de réserver sur place.',
    results: ['Prototype en 3 jours', 'Formulaire nuitées intégré', '100 % à distance'],
    tags: ['Storytelling', 'Réservation'],
  },
  {
    id: 'etcbc',
    category: 'vitrine',
    name: 'ETCBC Charpente',
    sector: 'Charpente & construction bois',
    url: 'https://www.etcbc-charpente.com/',
    image: './assets/screenshots/etcbc-accueil.png',
    description:
      'Site vitrine pour l\'entreprise : métiers, zone d\'intervention, galerie de chantiers filtrable et demande de devis.',
    outcome: 'Des demandes de devis qualifiées, reçues par e-mail.',
    results: ['Galerie chantiers filtrable', 'Demandes de devis ciblées', 'Mobile optimisé'],
    tags: ['Vitrine', 'Galerie', 'Devis'],
  },
];

export const projectsCustom = [
  {
    id: 'sqcdp',
    category: 'sur-mesure',
    name: 'SQCDP',
    sector: 'Pilotage industriel · PWA',
    url: 'https://sqcdp.vercel.app/',
    image: null,
    description:
      'Application web PWA : tableaux de bord SQCDP animés, PDCA, roulette de réunion et mode hors-ligne pour l\'atelier.',
    outcome: 'Un outil métier sur mesure, utilisable au bureau comme en atelier.',
    results: ['PWA installable', 'Mode hors-ligne atelier', 'Tableaux SQCDP animés'],
    tags: ['React', 'TypeScript', 'PWA'],
  },
];

export const testimonials = [
  {
    quote:
      'Échanges simples, pas de jargon. La maquette est arrivée en quelques jours et on a pu ajuster avant la mise en ligne.',
    author: 'Marie-Claire',
    role: 'Quai des Rêves · maison d\'hôtes',
  },
  {
    quote:
      'On a enfin une vitrine à la hauteur de nos chantiers. Les demandes de devis sont plus claires et mieux ciblées.',
    author: 'Équipe ETCBC',
    role: 'Charpente & construction bois',
  },
  {
    quote:
      'Site livré rapidement, très propre sur mobile. Les réservations arrivent directement par mail, exactement ce qu\'on voulait.',
    author: 'La Maison d\'Ela',
    role: 'Chambre d\'hôtes · Dordogne',
  },
];

export const process = {
  title: 'Simple, rapide, sans surprise',
  steps: [
    {
      num: '01',
      title: 'Vous exposez votre besoin',
      text: 'Un échange par téléphone ou visio : votre activité, vos clients, ce que vous attendez du site.',
      who: 'Audrey · Communication',
    },
    {
      num: '02',
      title: 'Prototype & identité visuelle',
      text: 'Première maquette et direction graphique en 2–3 jours. Vous validez avant le développement final.',
      who: 'Niyazi · Identité visuelle & graphisme',
    },
    {
      num: '03',
      title: 'Développement & mise en ligne',
      text: 'Intégration, tests mobile, publication et prise en main. Paiement en 2 fois : acompte, solde à la livraison.',
      who: 'Hugo · Développement web',
    },
  ],
};

export const pricing = {
  title: 'Des tarifs transparents',
  from: 450,
  note: 'Fourchettes indicatives · Chaque projet fait l\'objet d\'un devis personnalisé',
  hosting: {
    price: 20,
    label: '20 €/mois',
    heading: "d'entretien et maintenance",
    detail: 'Hébergement, HTTPS, surveillance et mises à jour de sécurité, nom de domaine en option (~12 €/an)',
  },
  example: {
    label: 'Exemple : chambre d\'hôtes',
    range: '~690 €',
    detail: 'Présentation du lieu, galerie photos, formulaire de réservation et version mobile optimisée.',
  },
  tiers: [
    {
      label: 'Site sur mesure',
      range: '450 – 900 €',
      rangeNote: 'Sur devis',
      features: [
        'Présentation, galerie & pages',
        'Formulaire de contact ou réservation',
        'Mobile & visibilité Google',
      ],
      highlight: true,
      badge: 'Le plus demandé',
    },
    {
      label: 'Site dynamique',
      range: '1 000 € et +',
      rangeNote: 'Sur devis',
      features: [
        'Réservations ou espaces clients',
        'Évolutions & mises à jour',
        'Fonctionnalités sur mesure',
      ],
    },
  ],
  footnotes: [
    'Devis gratuit · Sans engagement',
    'Pas de frais cachés',
    'Entretien & maintenance : 20 €/mois (hébergement et HTTPS inclus)',
    'Paiement en 2 fois : acompte, solde à la livraison',
  ],
};

export const comparison = {
  title: 'Faire soi-même ou être accompagné ?',
  subtitle:
    'IONOS, Wix et les autres constructeurs en ligne conviennent si vous avez le temps de tout gérer. Nous, on conçoit un site à votre image, avec une équipe qui vous guide.',
  disclaimer:
    'Comparaison indicative à titre informatif, sans valeur contractuelle. Offres et tarifs des plateformes tierces susceptibles d\'évoluer.',
  them: {
    label: 'Constructeurs en ligne',
    hint: 'IONOS, Wix, Squarespace…',
  },
  us: {
    label: 'Bulle ton site',
    hint: 'Création sur mesure',
  },
  rows: [
    {
      label: 'Design',
      them: 'Modèles prêts à l\'emploi, look souvent générique',
      us: 'Design pensé pour votre métier et votre image',
    },
    {
      label: 'Personnalisation',
      them: 'Limitée aux options du modèle',
      us: 'Contenus, structure et visuels adaptés à vous',
    },
    {
      label: 'Accompagnement',
      them: 'Vous avancez seul, aide surtout technique',
      us: 'Équipe dédiée, échanges simples sans jargon',
    },
    {
      label: 'Mises à jour',
      them: 'À faire vous-même dans l\'outil',
      us: 'Vous nous envoyez vos changements, on s\'en occupe',
    },
    {
      label: 'Temps à y consacrer',
      them: 'Plusieurs heures (voire jours) de prise en main',
      us: 'Quelques échanges : brief, retours, validation',
    },
    {
      label: 'Coût',
      them: 'Abonnement mensuel fréquent + options',
      us: 'Devis unique · pas d\'abonnement obligatoire',
    },
    {
      label: 'Résultat',
      them: 'Site fonctionnel, peu différenciant',
      us: 'Site soigné, crédible face à vos clients',
    },
  ],
};

export const faq = [
  {
    q: 'Combien de temps pour avoir mon site ?',
    a: 'Comptez 2–3 jours pour un premier prototype, puis 1 à 2 semaines pour la version finale selon le nombre de pages et vos retours.',
  },
  {
    q: 'Comment modifier mon site après la livraison ?',
    a: 'Vous nous contactez : nous appliquons les changements pour vous (textes, photos, horaires…). Les premiers petits ajustements sont en général offerts ; au-delà, nous vous indiquons un devis avant toute intervention.',
  },
  {
    q: 'Que comprend l\'entretien et la maintenance ?',
    a: '20 €/mois pour garder votre site en ligne, à jour et sécurisé : hébergement, certificat HTTPS (cadenas), surveillance technique et mises à jour de sécurité. Le nom de domaine (votrenom.fr) est en option, environ 10–15 €/an. Tout est détaillé dans votre devis, sans frais cachés.',
  },
  {
    q: 'Que comprennent les 20 €/mois ?',
    a: 'L\'hébergement, le HTTPS, la surveillance du site et l\'entretien technique (sécurité, disponibilité). Pour les modifications de contenu (textes, photos…), vous nous contactez. Les petits ajustements sont en général inclus, les changements plus importants font l\'objet d\'un devis.',
  },
  {
    q: 'Le nom de domaine est-il inclus ?',
    a: 'Non, il n\'est pas inclus dans les 20 €/mois. Nous pouvons l\'acheter et le configurer pour vous. Comptez environ 10–15 €/an selon l\'extension (.fr, .com…), sans marge cachée.',
  },
  {
    q: 'Travaillez-vous avec mon métier ?',
    a: 'Oui : artisans, chambres d\'hôtes, commerces, restaurateurs, professions libérales… Si vous avez un projet particulier (outil interne, réservations, intranet), décrivez-le : on vous dit franchement si on peut vous accompagner.',
  },
  {
    q: 'Travaillez-vous à distance ?',
    a: 'Oui, 100 % à distance partout en France. Échanges par visio, téléphone et e-mail, pas besoin de déplacement.',
  },
  {
    q: 'Comment se passe le paiement ?',
    a: 'En deux fois : un acompte au lancement, le solde à la livraison. Devis gratuit et sans engagement avant toute décision.',
  },
];

export const promo = {
  title: 'Prêt à lancer votre site ?',
  text: 'Décrivez votre projet via le formulaire : nous vous répondons sous 24 h avec un devis gratuit et des conseils adaptés.',
  cta: 'Demander mon devis gratuit',
};

export const organization = {
  parent: 'DARIOH',
  brand: 'Bulle ton site',
  footerLine: 'Bulle ton site',
};

export const team = [
  { name: 'Audrey Jurado', role: 'Communication · Relationnel', photo: 'assets/audrey-jurado.png' },
  { name: 'Hugo Davion', role: 'Développeur web', photo: 'assets/hugo-portrait.png' },
  { name: 'Niyazi Azaiez', role: 'Identité visuelle · Graphiste', photo: 'assets/niyazi-azaiez.png' },
];

export const about = {
  title: "L'équipe",
  text: 'Audrey (communication), Niyazi (identité visuelle & graphisme) et Hugo (développement) : trois métiers complémentaires pour un site cohérent de A à Z.',
  blurb:
    'Pas de sous-traitance opaque ni d\'interlocuteurs multiples. Vous savez qui fait quoi à chaque étape.',
};

export const legal = {
  mentionsUrl: 'mentions-legales.html',
  privacyNote:
    'Les données du formulaire servent uniquement à répondre à votre demande. Elles ne sont pas revendues ni utilisées à d\'autres fins.',
};
