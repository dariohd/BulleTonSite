# Notes techniques

One-page pilotée par **`config.js`**. `main.js` lit la config au chargement et construit les sections (offres, portfolio, FAQ, etc.).

## Portfolio iframe

Chaque entrée `portfolio` dans la config a une `url` live. Le carrousel charge l'URL dans une iframe. Les sites clients doivent autoriser `bulletonsite.com` en `frame-ancestors` (voir `embed-templates/vercel.json`).

## Diapo

Le dossier `diapo/` est une page séparée (format vertical). Le contenu source vit dans `Communication(PasUnProjet)` ; `npm run sync:site` copie vers BulleTonSite.

## Déploiement

Statique pur sur Vercel. Pas de variables d'environnement. Formulaire contact : selon implémentation dans `main.js` / `config.js`.
