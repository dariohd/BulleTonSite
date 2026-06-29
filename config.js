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
  diapoUrl: 'https://bulletonsite.com/diapo/',
  localUrl: 'http://localhost:3000',
  localDiapoUrl: 'http://localhost:3000/diapo/',
  /** Domaines autorisés à afficher ce site en iframe (portfolio + préprod locale). */
  frameAncestors: [
    'https://*.vercel.app',
    'https://bulletonsite.com',
    'https://www.bulletonsite.com',
    'https://dariohd.github.io',
    'http://localhost:3000',
    'http://localhost:5174',
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
    'Bulle ton site, création de sites web sur mesure pour artisans, gîtes et commerces. Vitrines, outils métier, réservations. Devis gratuit sous 48 h.',
};

export const seo = {
  title: 'Bulle ton site · Création de sites web sur mesure',
  description:
    'Sites web et outils sur mesure : communication, identité visuelle et développement réunis. Artisans, gîtes, commerces. Vitrine dès 500 € · devis gratuit sous 48 h.',
  ogImage: 'assets/og-bubble.svg',
};

export const guarantees = [
  'Devis gratuit sous 48 h',
  'Prix affichés indicatifs · toujours sur devis',
  'Paiement 30 % à la commande, 70 % à la mise en ligne',
  'Hébergement : autonomie ou pack tranquillité',
  'Équipe dédiée',
];

export const contact = {
  name: 'Audrey',
  email: 'bulletonsite@gmail.com',
  phone: '06 13 80 95 65',
  phoneTel: '+33613809565',
  zone: 'Partout en France · 100 % à distance',
  response: 'Audrey vous recontacte sous 48 h',
  formSub: 'Brief gratuit · Sans engagement · un seul interlocuteur pour vous',
  photo: 'assets/hugo-portrait.png',
};

/** Formulaire : Web3Forms (recommandé) ou FormSubmit en secours. */
export const form = {
  /** Clé gratuite sur https://web3forms.com (e-mail bulletonsite@gmail.com). */
  web3formsAccessKey: '',
  /** Si Web3Forms est vide : activer une fois FormSubmit via le lien reçu par e-mail. */
  formsubmitEmail: 'bulletonsite@gmail.com',
  submitLabel: 'Envoyer ma demande de devis',
  sendingLabel: 'Envoi en cours…',
  successMessage:
    'Message envoyé. Audrey vous répond sous 48 h avec un devis gratuit. Pensez à vérifier vos spams.',
  needs: [
    { value: '', label: 'Choisir…', placeholder: true },
    { value: 'Site vitrine sur mesure', label: 'Site vitrine sur mesure' },
    { value: 'Site dynamique & catalogue', label: 'Site dynamique & catalogue' },
    { value: 'Application web & outil métier', label: 'Application web & outil métier' },
    { value: 'Identité visuelle (logo, charte)', label: 'Identité visuelle (logo, charte)' },
    { value: 'Site + identité visuelle', label: 'Site + identité visuelle' },
    { value: 'Je ne sais pas encore', label: 'Je ne sais pas encore — conseillez-moi' },
  ],
  budgets: [
    { value: 'Non précisé', label: 'Budget : non précisé' },
    { value: 'Site vitrine (500 – 1 500 €)', label: 'Site vitrine (500 – 1 500 €)' },
    { value: 'Site dynamique (2 000 – 3 500 €)', label: 'Site dynamique (2 000 – 3 500 €)' },
    { value: 'Outil métier (4 000 €+)', label: 'Outil métier (4 000 €+)' },
    { value: 'Identité visuelle (250 – 800 €)', label: 'Identité visuelle (250 – 800 €)' },
    { value: 'Harmonisation logo (160 – 250 €)', label: 'Harmonisation logo (160 – 250 €)' },
  ],
  hosting: [
    { value: 'Pas encore décidé', label: 'Après mise en ligne : pas encore décidé' },
    { value: 'Autonomie totale', label: 'Autonomie totale (pas d\'abonnement chez nous)' },
    { value: 'Pack tranquillité', label: 'Pack tranquillité (30 – 50 €/mois)' },
  ],
  timelines: [
    { value: 'Non précisé', label: 'Délai souhaité : non précisé' },
    { value: 'Dans le mois', label: 'Dans le mois' },
    { value: '1 – 3 mois', label: 'Dans 1 – 3 mois' },
    { value: 'Plus tard / pas pressé', label: 'Plus tard / pas pressé' },
  ],
};

/** Statistiques Plausible (bulletonsite.com) — mesure d'audience respectueuse, sans cookies publicitaires. */
export const analytics = {
  enabled: true,
  domain: 'bulletonsite.com',
  scriptSrc: 'https://plausible.io/js/script.js',
};

export const nav = [
  { id: 'projets', label: 'Réalisations' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Méthode & équipe' },
  { id: 'tarifs', label: 'Tarifs' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export const hero = {
  eyebrow: 'Identité visuelle · communication · développement',
  title: 'Votre site internet,',
  titleEm: 'conçu en équipe.',
  lead:
    'Communication, création d\'identité visuelle et développement réunis : vitrines, réservations, outils métier. Nous créons ce dont vous avez besoin. Un seul point de contact, une équipe complète derrière, du brief au prototype en quelques jours.',
  chips: ['Équipe dédiée', 'Prototype en 2–3 jours', 'Mobile & Google'],
  ctaPrimary: 'Demander un devis gratuit',
  ctaSecondary: 'Voir nos réalisations',
  stats: [
    { value: '4', suffix: '+', label: 'sites livrés' },
    { value: '500', suffix: '€', label: 'vitrine dès · sur devis' },
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

export const servicesIntro = {
  subtitle: 'Sur mesure, sans modèle préfabriqué — communication, identité et développement réunis.',
};

export const services = [
  {
    label: 'Équipe',
    title: 'Trois métiers complémentaires',
    text: 'Audrey écoute votre besoin, Niyazi conçoit l\'identité, Hugo développe et met en ligne. Trois expertises, un seul fil de discussion.',
  },
  {
    label: 'Sur mesure',
    title: 'Vitrine, dynamique ou outil métier',
    text: 'Site vitrine, catalogue évolutif ou application terrain (PWA, tableaux de bord…) : nous créons ce dont vous avez besoin, pas un thème générique.',
  },
  {
    label: 'Option',
    title: 'Identité visuelle à part',
    text: 'Logo et charte en option ou en amont du site. Vous avez déjà un logo ? Nous l\'harmonisons sans refaire toute une identité.',
  },
  {
    label: 'Pratique',
    title: 'Contact & réservations par e-mail',
    text: 'Demandes de devis, messages ou nuitées : chaque formulaire arrive dans votre boîte mail, sans plateforme intermédiaire.',
  },
  {
    label: 'Rythme',
    title: 'Prototype en 2–3 jours',
    text: 'Une première maquette rapidement, puis 1 à 2 semaines pour la version finale selon le projet et vos retours.',
  },
  {
    label: 'Qualité',
    title: 'Mobile, léger & visible',
    text: 'Site rapide sur téléphone, code propre et bases SEO pour être trouvé quand on cherche votre métier près de chez vous.',
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
      'Site vitrine pour une chambre d\'hôtes : identité visuelle créée avec nous, présentation du lieu, séjours thématiques et gestion des réservations par e-mail.',
    outcome: 'Les voyageurs réservent en direct, sans commission intermédiaire.',
    results: ['Identité visuelle', 'Réservations par e-mail', 'Site multilingue'],
    tags: ['Vitrine', 'Identité', 'Réservation'],
  },
  {
    id: 'quai-des-reves',
    category: 'vitrine',
    name: 'Quai des Rêves',
    sector: 'Maison d\'hôtes · Bretagne',
    url: 'https://quai-des-reves.vercel.app/',
    image: './assets/screenshots/quai-accueil.png',
    description:
      'Vitrine simple pour une maison d\'hôtes : identité déjà en place, histoire du lieu, chambres et formulaire pour demander une nuitée.',
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
      'Vitrine simple pour l\'entreprise : logo et charte déjà existants, métiers, zone d\'intervention, galerie de chantiers et demande de devis.',
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
    embed: 'screenshot',
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
  subtitle: 'Du premier échange à la mise en ligne : trois étapes, une équipe aux rôles bien définis.',
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
      text: 'Intégration, tests mobile, publication et prise en main. Paiement en 2 fois : 30 % à la commande, 70 % à la mise en ligne.',
      who: 'Hugo · Développement web',
    },
  ],
};

export const pricing = {
  title: 'Des offres claires, toujours sur devis',
  intro: {
    text:
      'Devis gratuit sous 48 h · fourchettes indicatives · sans engagement. Chaque site est conçu sur mesure (pas de modèles préfabriqués) ; l\'identité visuelle est une prestation à part. Seul votre devis personnalisé fait foi avant toute commande.',
    fromLabel: 'Vitrine sur mesure · à partir de',
    from: 500,
  },
  offers: [
    {
      label: 'Site vitrine sur mesure',
      subtitle: 'Votre carte de visite en ligne, rapide et crédible',
      range: '500 – 1 500 €',
      rangeNote: 'Fourchette indicative · sur devis',
      description:
        'Présence professionnelle pour rassurer vos prospects et présenter votre savoir-faire. Site de 3 à 5 pages, design fluide, code léger, structure pensée pour Google.',
      features: [
        '3 à 5 pages + mentions légales',
        'Formulaire contact ou demande par e-mail',
        'Mobile & bases SEO',
        'Mise en ligne · 1 à 2 tours de retours',
      ],
      highlight: true,
      badge: 'Le plus demandé',
    },
    {
      label: 'Site dynamique & catalogue',
      subtitle: 'Publiez votre contenu en autonomie',
      range: '2 000 – 3 500 €',
      rangeNote: 'Sur devis · cahier des charges',
      description:
        'Vous mettez à jour chantiers, réalisations ou actualités sans repasser par nous. Espace d\'administration privé, simple et sécurisé.',
      features: [
        'Back-office intuitif',
        'Blog, catalogue ou portfolio évolutif',
        'Plusieurs contributeurs possibles',
        'Pour les publications fréquentes en autonomie',
      ],
    },
    {
      label: 'Application web & outil métier',
      subtitle: 'Automatiser votre quotidien',
      range: 'À partir de 4 000 €',
      rangeNote: 'Sur devis · projet sur mesure',
      description:
        'Espace client, devis automatiques, réservation avancée, tableau de bord interne ou PWA terrain : une solution digitale conçue pour votre métier.',
      features: [
        'Cahier des charges dédié',
        'Développement sur mesure',
        'Outils métier & automatisations',
        'Ex. SQCDP · pilotage atelier',
      ],
    },
  ],
  identity: {
    label: 'Identité visuelle',
    subtitle: 'Logo, couleurs et charte — prestation séparée',
    range: '250 – 800 €',
    rangeNote: 'Sur devis · en option ou en amont du site',
    description:
      'Prestation distincte du développement web. Commandable seule, avant le site, ou en complément. Logo déjà prêt ? Nous l\'harmonisons dans le site sans refaire une identité complète.',
    items: [
      { label: 'Harmonisation (logo fourni)', range: '160 – 250 €' },
      { label: 'Création de logo', range: '250 – 450 €' },
      { label: 'Charte légère (logo + palette web)', range: '450 – 650 €' },
    ],
    contact: 'Niyazi · Identité visuelle',
  },
  vitrineAnchors: {
    title: 'Repères site vitrine',
    hint: 'Hors identité visuelle · montants indicatifs',
    rows: [
      { profile: 'Essentiel', content: '3–4 pages, logo fourni, contact', range: '500 – 700 €' },
      { profile: 'Complet', content: 'Galerie, réservation e-mail (gîte, artisan)', range: '900 – 1 200 €' },
      { profile: 'Renforcé', content: 'Multilingue, contenu structuré, SEO local', range: '1 200 – 1 500 €' },
    ],
  },
  examples: {
    title: 'Exemples de nos réalisations',
    items: [
      { name: 'Quai des Rêves', type: 'Vitrine simple', range: '~650 – 900 €' },
      { name: 'ETCBC Charpente', type: 'Vitrine simple', range: '~800 – 1 100 €' },
      { name: "La Maison d'Ela", type: 'Vitrine + réservations + identité visuelle', range: '~1 100 – 1 500 €' },
      { name: 'SQCDP', type: 'Outil métier · PWA', range: '4 000 €+' },
    ],
  },
  whyUs: {
    title: 'Pourquoi Bulle ton site',
    points: [
      {
        title: 'Sur mesure',
        text: 'Pas de thème générique : chaque site est pensé pour votre métier et vos objectifs.',
      },
      {
        title: 'Rapide & fiable',
        text: 'Sites légers, adaptés au mobile, architecture simple et peu exposée aux failles des CMS non maintenus.',
      },
      {
        title: 'Vous restez propriétaire',
        text: 'Le site vous appartient ; code et contenus remis à la livraison (détail dans le devis).',
      },
    ],
  },
  hostingIntro: {
    title: 'Après la mise en ligne : vous choisissez',
    text: 'Comme pour une maison : l\'adresse (nom de domaine) et le terrain (hébergement). Nous expliquons tout ; vous choisissez votre niveau d\'accompagnement.',
  },
  hosting: [
    {
      label: 'Autonomie totale',
      price: 'Pas d\'abonnement',
      priceNote: 'mensuel chez nous',
      forWho:
        'Vous souscrivez l\'hébergement et le domaine à votre nom (~50 – 80 € / an chez le fournisseur). Chez Bulle ton site, aucun forfait mensuel : nous installons, mettons en ligne et vous remettons les accès.',
      features: [
        'Guidance pour choisir et configurer l\'hébergement',
        'Installation et mise en ligne initiale',
        'Remise des accès (site, domaine, hébergement)',
        'Modification ou évolution ensuite = devis ponctuel',
      ],
    },
    {
      label: 'Pack tranquillité',
      price: '30 – 50 € / mois',
      priceNote: 'confirmé sur devis',
      forWho: 'Vous déléguez la technique et nous écrivez pour les petites mises à jour.',
      features: [
        'Sérénité ~30 € : hébergement, HTTPS, sauvegardes, surveillance, domaine',
        'Actif ~50 € : tout Sérénité + jusqu\'à 30–45 min de modifs texte/photo par mois',
        'Nouvelle page ou fonctionnalité = devis séparé',
      ],
      highlight: true,
    },
  ],
  footnotes: [
    'Toujours sur devis : les montants affichés ne constituent pas une offre ferme',
    'Identité visuelle facturée à part si demandée',
    'Devis gratuit · Sans engagement · Paiement 30 % à la commande, 70 % à la mise en ligne',
    'Délais indicatifs : prototype en 2–3 jours, livraison en 1 à 2 semaines',
  ],
};

export const comparison = {
  title: 'Faire soi-même ou être accompagné ?',
  subtitle:
    'Les solutions en ligne à faire soi-même conviennent si vous avez le temps de tout gérer. Nous, on conçoit un site à votre image, avec une équipe qui vous guide.',
  disclaimer:
    'Comparaison indicative à titre informatif, sans valeur contractuelle. Les situations et besoins varient selon les projets.',
  them: {
    label: 'Faire soi-même',
    hint: 'Modèles et outils en ligne',
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
      label: 'Résultat',
      them: 'Site fonctionnel, peu différenciant',
      us: 'Site soigné, crédible face à vos clients',
    },
  ],
};

export const faq = [
  {
    q: 'Les prix affichés sur le site sont-ils définitifs ?',
    a: 'Non. Les montants et fourchettes servent de repères pour vous orienter. Nous vous répondons sous 48 h avec un devis gratuit, détaillé et adapté à votre projet : c\'est lui qui fait foi. Rien n\'est facturé sans votre accord sur ce devis.',
  },
  {
    q: 'Qui accompagne mon projet au quotidien ?',
    a: 'Audrey est votre point de contact : brief, suivi et retours. Niyazi conçoit l\'identité visuelle, Hugo développe et met en ligne. Vous avez un seul fil de discussion avec nous, même si plusieurs expertises interviennent sur le projet.',
  },
  {
    q: 'L\'identité visuelle est-elle incluse dans le site vitrine ?',
    a: 'Non par défaut. Vous pouvez arriver avec votre logo, commander une création à part (250 – 800 € selon le scope), ou combiner site et identité sur un seul devis. L\'harmonisation d\'un logo fourni est facturée à part (environ 160 – 250 €) ou intégrée au devis web sans refaire une charte complète.',
  },
  {
    q: 'Ai-je besoin d\'un site dynamique pour mettre à jour mon site ?',
    a: 'Pas forcément. Pour beaucoup d\'artisans et de gîtes, un site vitrine suffit : vous nous envoyez vos changements (pack tranquillité ou devis ponctuel). Le site dynamique est pertinent si vous publiez souvent en autonomie via un back-office.',
  },
  {
    q: 'Combien de temps pour avoir mon site ?',
    a: 'Comptez 2–3 jours pour un premier prototype, puis 1 à 2 semaines pour la version finale selon le nombre de pages et vos retours.',
  },
  {
    q: 'Comment modifier mon site après la livraison ?',
    a: 'Deux options : l\'autonomie totale (hébergement et domaine à votre nom, ~50 – 80 €/an chez le fournisseur, sans abonnement mensuel chez Bulle ton site ; modifications ensuite sur devis ponctuel) ou le pack tranquillité (30 – 50 €/mois, petites mises à jour texte/photo incluses selon formule).',
  },
  {
    q: 'Que comprend le pack tranquillité ?',
    a: 'Formule Sérénité (~30 €/mois) : hébergement professionnel, HTTPS, sauvegardes, surveillance et gestion du nom de domaine. Formule Actif (~50 €/mois) : tout Sérénité + jusqu\'à 30–45 minutes de modifications texte ou photo par mois sur simple message. Une nouvelle page ou fonctionnalité fait l\'objet d\'un devis séparé. Le détail est confirmé sur devis.',
  },
  {
    q: 'Le nom de domaine est-il inclus ?',
    a: 'En pack tranquillité, nous pouvons le gérer pour vous (inclus selon devis). En autonomie totale, vous le souscrivez à votre nom : comptez environ 50 – 80 €/an côté fournisseur pour domaine et hébergement, sans marge cachée de notre côté.',
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
    a: '30 % à la commande, 70 % à la mise en ligne. Devis gratuit sous 48 h, sans engagement avant toute décision.',
  },
];

export const promo = {
  title: 'Prêt à lancer votre site ?',
  text: 'Décrivez votre projet via le formulaire : nous vous répondons sous 48 h avec un devis gratuit et des conseils adaptés.',
  cta: 'Demander mon devis gratuit',
};

export const organization = {
  parent: 'DHD',
  brand: 'Bulle ton site',
  footerLine: 'Bulle ton site',
  legalName: 'DHD',
  legalContact: 'Hugo Davion',
};

export const team = [
  {
    name: 'Audrey Jurado',
    role: 'Communication · Relationnel',
    photo: 'assets/audrey-jurado.png',
    bio: 'Votre premier contact : elle écoute votre activité, vos clients et vos objectifs. Des échanges simples, sans jargon.',
  },
  {
    name: 'Niyazi Azaiez',
    role: 'Identité visuelle · Graphiste',
    photo: 'assets/niyazi-azaiez.png',
    bio: 'Logo, couleurs, typographie et maquettes : une identité visuelle pensée pour votre métier, validée avant le développement.',
  },
  {
    name: 'Hugo Davion',
    role: 'Développeur web',
    photo: 'assets/hugo-portrait.png',
    bio: 'Il intègre le site, optimise mobile et référencement, puis publie en ligne. Vous nous envoyez vos changements, on s\'en occupe.',
  },
];

export const about = {
  title: "L'équipe",
  text: 'Audrey (communication), Niyazi (identité visuelle) et Hugo (développement) : trois métiers complémentaires pour un site cohérent de A\u00a0à\u00a0Z.',
  blurb: 'Pas de sous-traitance opaque : vous savez qui fait quoi, à chaque étape du projet.',
};

export const legal = {
  mentionsUrl: 'mentions-legales.html',
  privacyNote:
    'Vos données sont transmises via FormSubmit (service tiers) uniquement pour nous permettre de vous répondre. Conservation limitée au suivi de votre demande.',
  consentLabel:
    'J\'accepte que mes données soient traitées pour répondre à ma demande de contact, conformément aux mentions légales.',
};
