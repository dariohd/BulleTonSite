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
  url: 'https://www.bulletonsite.com',
  domain: 'https://www.bulletonsite.com',
  diapoUrl: 'https://www.bulletonsite.com/diapo/',
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
    'Bulle ton site — sites vitrines, outils métier et identité visuelle sur mesure pour indépendants, PME, associations et commerces. Devis gratuit sous 48 h.',
};

export const seo = {
  title: 'Bulle ton site · Création de sites web sur mesure',
  description:
    'Sites web et outils sur mesure : communication, identité visuelle et création sur mesure. Indépendants, PME, associations, commerces. Vitrine dès 500 € · devis gratuit sous 48 h.',
  ogImage: 'assets/og-bubble.svg',
};

export const guarantees = [
  'Devis gratuit sous 48 h',
  'Prix affichés indicatifs · toujours sur devis',
  'Paiement 30 % à la commande, 70 % à la mise en ligne',
  'Après la mise en ligne : vous gérez seul ou pack tranquillité',
  'Équipe dédiée',
];

export const contact = {
  name: 'Audrey',
  email: 'bulletonsite@gmail.com',
  phone: '06 13 80 95 65',
  phoneTel: '+33613809565',
  zone: 'Partout en France · 100 % à distance',
  response: 'Audrey vous recontacte sous 48 h',
  formSub: 'Premier échange gratuit · Sans engagement · un seul interlocuteur pour vous',
  photo: 'assets/hugo-portrait.png',
};

/** Formulaire : FormSubmit (https://formsubmit.co). */
export const form = {
  /** E-mail de réception — activer une fois via le lien reçu de FormSubmit au premier envoi. */
  formsubmitEmail: 'bulletonsite@gmail.com',
  submitLabel: 'Envoyer ma demande de devis',
  sendingLabel: 'Envoi en cours…',
  successMessage:
    'Message envoyé. Audrey vous répond sous 48 h avec un devis gratuit. Pensez à vérifier vos spams.',
  needs: [
    { value: '', label: 'Choisir…', placeholder: true },
    { value: 'Site vitrine sur mesure', label: 'Site vitrine sur mesure' },
    { value: 'Site à mettre à jour soi-même', label: 'Site à mettre à jour soi-même (catalogue, actualités)' },
    { value: 'Application web & outil métier', label: 'Outil sur mesure (devis, réservations, suivi…)' },
    { value: 'Identité visuelle (logo, charte)', label: 'Identité visuelle (logo, charte)' },
    { value: 'Site + identité visuelle', label: 'Site + identité visuelle' },
    { value: 'Je ne sais pas encore', label: 'Je ne sais pas encore — conseillez-moi' },
  ],
  budgets: [
    { value: 'Non précisé', label: 'Budget : non précisé' },
    { value: 'Site vitrine (500 – 1 500 €)', label: 'Site vitrine (500 – 1 500 €)' },
    { value: 'Site dynamique (2 000 – 3 500 €)', label: 'Site à mettre à jour soi-même (2 000 – 3 500 €)' },
    { value: 'Outil métier (4 000 €+)', label: 'Outil sur mesure (4 000 €+)' },
    { value: 'Identité visuelle (250 – 800 €)', label: 'Identité visuelle (250 – 800 €)' },
    { value: 'Harmonisation logo (160 – 250 €)', label: 'Harmonisation logo (160 – 250 €)' },
  ],
  hosting: [
    { value: 'Pas encore décidé', label: 'Après mise en ligne : pas encore décidé' },
    { value: 'Autonomie totale', label: 'Je gère l\'hébergement moi-même (pas d\'abonnement chez nous)' },
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
  eyebrow: 'Identité visuelle · communication · mise en ligne',
  title: 'Votre site internet,',
  titleEm: 'conçu en équipe.',
  lead:
    'Communication, identité visuelle et mise en ligne réunies : vitrines, réservations, outils sur mesure. Indépendants, PME, associations et commerces — un seul interlocuteur, partout en France.',
  chips: ['Équipe dédiée', 'Maquette en 2–3 jours', 'Téléphone & Google'],
  ctaPrimary: 'Demander un devis gratuit',
  ctaSecondary: 'Voir nos réalisations',
  stats: [
    { value: '4', suffix: '+', label: 'sites livrés' },
    { value: '500', suffix: '€', label: 'vitrine dès · sur devis' },
    { value: '1–2', suffix: ' sem.', label: 'de création' },
    { value: '2–3', suffix: ' jours', label: 'première maquette' },
  ],
};

export const sectorsLead = 'Exemples de secteurs accompagnés';

export const sectors = [
  'Artisans & bâtiment',
  'Tourisme · gîtes & chambres d\'hôtes',
  'Commerces & restauration',
  'Professions libérales',
  'PME & services B2B',
  'Associations & projets locaux',
];

export const servicesIntro = {
  subtitle: 'Sur mesure, sans modèle préfabriqué — communication, identité et mise en ligne réunies.',
};

export const services = [
  {
    label: 'Équipe',
    title: 'Trois métiers complémentaires',
    text: 'Audrey écoute votre besoin, Niyazi conçoit l\'identité, Hugo crée et met le site en ligne. Trois expertises, un seul fil de discussion.',
  },
  {
    label: 'Sur mesure',
    title: 'Vitrine, site modifiable ou outil sur mesure',
    text: 'Une vitrine simple, un site que vous mettez à jour vous-même, ou un outil sur tablette et téléphone : nous créons ce dont vous avez besoin, pas un modèle générique.',
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
    title: 'Maquette en 2–3 jours',
    text: 'Un premier aperçu de votre site rapidement, puis 1 à 2 semaines pour la version finale selon le projet et vos retours.',
  },
  {
    label: 'Qualité',
    title: 'Sur téléphone & sur Google',
    text: 'Site lisible et rapide sur mobile, pensé pour que vos clients vous trouvent quand ils cherchent votre métier près de chez eux.',
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
    results: ['Identité visuelle', 'Réservations par e-mail', 'Plusieurs langues'],
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
    results: ['Maquette en 3 jours', 'Formulaire nuitées intégré', '100 % à distance'],
    tags: ['Histoire du lieu', 'Réservation'],
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
    results: ['Galerie par type de chantier', 'Demandes de devis ciblées', 'Parfait sur téléphone'],
    tags: ['Vitrine', 'Galerie', 'Devis'],
  },
];

export const projectsCustom = [
  {
    id: 'sqcdp',
    category: 'sur-mesure',
    name: 'SQCDP',
    sector: 'Pilotage industriel · outil sur mesure',
    url: 'https://sqcdp.vercel.app/',
    embed: 'screenshot',
    image: null,
    description:
      'Outil de suivi d\'atelier : tableaux de bord animés, réunions et mode sans connexion pour le terrain.',
    outcome: 'Un outil pensé pour le métier, utilisable au bureau comme en atelier.',
    results: ['Utilisable sur tablette', 'Fonctionne sans réseau en atelier', 'Suivi qualité en direct'],
    tags: ['Outil métier', 'Atelier', 'Sur mesure'],
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
      title: 'Maquette & identité visuelle',
      text: 'Premier aperçu et direction graphique en 2–3 jours. Vous validez avant la version finale.',
      who: 'Niyazi · Identité visuelle & graphisme',
    },
    {
      num: '03',
      title: 'Mise en ligne',
      text: 'Tests sur téléphone, publication et prise en main. Paiement en 2 fois : 30 % à la commande, 70 % à la mise en ligne.',
      who: 'Hugo · Mise en ligne & technique',
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
        'Présence professionnelle pour rassurer vos prospects et présenter votre savoir-faire. Site de 3 à 5 pages, fluide sur téléphone, pensé pour être trouvé sur Google.',
      features: [
        '3 à 5 pages + mentions légales',
        'Formulaire contact ou demande par e-mail',
        'Parfait sur téléphone · visible sur Google',
        'Mise en ligne · 1 à 2 séries de corrections',
      ],
      highlight: true,
      badge: 'Le plus demandé',
    },
    {
      label: 'Site à mettre à jour soi-même',
      subtitle: 'Vous modifiez textes et photos sans nous',
      range: '2 000 – 3 500 €',
      rangeNote: 'Sur devis · selon votre projet',
      description:
        'Vous mettez à jour chantiers, réalisations ou actualités quand vous voulez. Une page privée, simple et sécurisée, pour gérer votre contenu.',
      features: [
        'Page simple pour modifier votre site',
        'Actualités, blog ou galerie de réalisations',
        'Plusieurs personnes peuvent publier',
        'Idéal si vous ajoutez du contenu souvent',
      ],
    },
    {
      label: 'Outil sur mesure',
      subtitle: 'Automatiser votre quotidien',
      range: 'À partir de 4 000 €',
      rangeNote: 'Sur devis · projet sur mesure',
      description:
        'Espace client, devis automatiques, réservation avancée, suivi interne ou outil sur téléphone et tablette : une solution pensée pour votre métier.',
      features: [
        'On part de votre besoin réel',
        'Conçu pour votre façon de travailler',
        'Devis, réservations, suivi… selon le projet',
        'Ex. SQCDP · suivi d\'atelier',
      ],
    },
  ],
  identity: {
    label: 'Identité visuelle',
    subtitle: 'Logo, couleurs et charte — prestation séparée',
    range: '250 – 800 €',
    rangeNote: 'Sur devis · en option ou en amont du site',
    description:
      'Prestation distincte de la création du site. Commandable seule, avant le site, ou en complément. Logo déjà prêt ? Nous l\'harmonisons dans le site sans refaire une identité complète.',
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
      { profile: 'Renforcé', content: 'Plusieurs langues, contenu soigné, visible près de chez vous sur Google', range: '1 200 – 1 500 €' },
    ],
  },
  examples: {
    title: 'Exemples de nos réalisations',
    items: [
      { name: 'Quai des Rêves', type: 'Vitrine simple', range: '~650 – 900 €' },
      { name: 'ETCBC Charpente', type: 'Vitrine simple', range: '~800 – 1 100 €' },
      { name: "La Maison d'Ela", type: 'Vitrine + réservations + identité visuelle', range: '~1 100 – 1 500 €' },
      { name: 'SQCDP', type: 'Outil sur mesure · atelier', range: '4 000 €+' },
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
        text: 'Sites rapides sur téléphone, simples à faire évoluer, sans logiciel lourd à maintenir.',
      },
      {
        title: 'Vous restez propriétaire',
        text: 'Le site vous appartient ; fichiers et contenus remis à la livraison (détail dans le devis).',
      },
    ],
  },
  hostingIntro: {
    title: 'Après la mise en ligne : vous choisissez',
    text: 'Comme pour une maison : l\'adresse (nom de domaine) et le terrain (hébergement). Nous expliquons tout ; vous choisissez votre niveau d\'accompagnement.',
  },
  hosting: [
    {
      label: 'Gestion en autonomie',
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
        'Sérénité ~30 € : hébergement, connexion sécurisée, sauvegardes, surveillance, nom de domaine',
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
    'Délais indicatifs : maquette en 2–3 jours, livraison en 1 à 2 semaines',
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
      us: 'Quelques échanges : premier contact, retours, validation',
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
    a: 'Audrey est votre point de contact : premier échange, suivi et retours. Niyazi conçoit l\'identité visuelle, Hugo prépare et met le site en ligne. Vous avez un seul fil de discussion avec nous, même si plusieurs expertises interviennent sur le projet.',
  },
  {
    q: 'L\'identité visuelle est-elle incluse dans le site vitrine ?',
    a: 'Non par défaut. Vous pouvez arriver avec votre logo, commander une création à part (250 – 800 € selon le scope), ou combiner site et identité sur un seul devis. L\'harmonisation d\'un logo fourni est facturée à part (environ 160 – 250 €) ou intégrée au devis web sans refaire une charte complète.',
  },
  {
    q: 'Ai-je besoin d\'un site que je peux modifier moi-même ?',
    a: 'Pas forcément. Pour beaucoup de vitrines, vous nous envoyez vos changements (pack tranquillité ou devis ponctuel). Un site modifiable par vous est utile si vous publiez souvent (actualités, galerie, catalogue) sans passer par nous.',
  },
  {
    q: 'Combien de temps pour avoir mon site ?',
    a: 'Comptez 2–3 jours pour une première maquette, puis 1 à 2 semaines pour la version finale selon le nombre de pages et vos retours.',
  },
  {
    q: 'Comment modifier mon site après la livraison ?',
    a: 'Deux options : la gestion en autonomie (hébergement et nom de domaine à votre nom, ~50 – 80 €/an chez le fournisseur, sans abonnement mensuel chez Bulle ton site ; modifications ensuite sur devis ponctuel) ou le pack tranquillité (30 – 50 €/mois, petites mises à jour texte/photo incluses selon formule).',
  },
  {
    q: 'Que comprend le pack tranquillité ?',
    a: 'Formule Sérénité (~30 €/mois) : hébergement professionnel, connexion sécurisée, sauvegardes, surveillance et gestion du nom de domaine. Formule Actif (~50 €/mois) : tout Sérénité + jusqu\'à 30–45 minutes de modifications texte ou photo par mois sur simple message. Une nouvelle page ou fonctionnalité fait l\'objet d\'un devis séparé. Le détail est confirmé sur devis.',
  },
  {
    q: 'Le nom de domaine est-il inclus ?',
    a: 'En pack tranquillité, nous pouvons le gérer pour vous (inclus selon devis). En gestion en autonomie, vous le souscrivez à votre nom : comptez environ 50 – 80 €/an côté fournisseur pour le nom de domaine et l\'hébergement, sans marge cachée de notre côté.',
  },
  {
    q: 'Travaillez-vous avec mon métier ?',
    a: 'Oui. Les secteurs listés sur le site (artisans, tourisme, commerces, professions libérales…) sont des exemples, pas une liste fermée. Nous accompagnons aussi des PME, associations, indépendants et porteurs de projet avec une vitrine ou un outil sur mesure (réservations, catalogue, formulaire, outil interne…). Décrivez votre activité : on vous dit franchement si on peut vous accompagner.',
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
  brand: 'Bulle ton site',
  footerLine: 'Bulle ton site',
  /** Entité légale (mentions légales, schema.org) */
  legalName: 'Hugo Davion',
  /** Nom commercial (mentions légales uniquement) */
  commercialName: 'DARIOH DEV',
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
    bio: 'Logo, couleurs, typographie et maquettes : une identité visuelle pensée pour votre métier, validée avant la mise en ligne.',
  },
  {
    name: 'Hugo Davion',
    role: 'Création & mise en ligne du site',
    photo: 'assets/hugo-portrait.png',
    bio: 'Il prépare le site, optimise l\'affichage sur téléphone et la visibilité sur Google, puis le met en ligne. Vous nous envoyez vos changements, on s\'en occupe.',
  },
];

export const about = {
  title: "L'équipe",
  text: 'Audrey (communication), Niyazi (identité visuelle) et Hugo (mise en ligne) : trois métiers complémentaires pour un site cohérent de A\u00a0à\u00a0Z.',
  blurb: 'Pas de sous-traitance opaque : vous savez qui fait quoi, à chaque étape du projet.',
};

export const legal = {
  mentionsUrl: 'mentions-legales.html',
  privacyNote:
    'Vos données sont transmises via FormSubmit (service tiers) uniquement pour nous permettre de vous répondre. Conservation limitée au suivi de votre demande.',
  consentLabel:
    'J\'accepte que mes données soient traitées pour répondre à ma demande de contact, conformément aux mentions légales.',
};
