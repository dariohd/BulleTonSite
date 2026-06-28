# Bulle ton site

![bulletonsite.com](docs/screenshot.png)

Site commercial one-page pour **Bulle ton site** — création de sites web pour artisans, tourisme et commerces locaux.

| | |
|---|---|
| **URL production** | https://bulletonsite.com |
| **Diapo promo** | https://bulletonsite.com/diapo/ |
| **Dépôt GitHub** | [github.com/dariohd/BulleTonSite](https://github.com/dariohd/BulleTonSite) |
| **Notes techniques** | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| **Hébergement** | Vercel |

## Stack

- HTML5, CSS3, **JavaScript modules** (ESM)
- Thèmes CSS interchangeables
- Carrousel de **réalisations clients** avec mini-navigateurs iframe
- `serve` en local (port 3000)
- Vercel : déploiement statique

## Fonctionnalités

- One-page : hero, services, équipe, processus, tarifs, FAQ
- **Portfolio intégré** : aperçus live des sites clients (iframe)
- **Diapo verticale 9:16** (`/diapo/`) pour réseaux sociaux
- Formulaire contact
- Config centralisée (`config.js`) : textes, tarifs, témoignages, projets
- Templates d'embed pour nouveaux clients (`embed-templates/`)
- SEO + Open Graph

## Structure

```
BulleTonSite/
├── index.html
├── config.js           # Contenu éditable (brand, offres, portfolio)
├── main.js, styles.css
├── diapo/
├── embed-templates/
├── assets/
├── vercel.json
└── package.json
```

## Prérequis

- Node.js 18+
- npm

## Développement local

```bash
npm install
npm start
```

→ http://localhost:3000

Ne pas ouvrir `index.html` en double-clic (modules ES).

## Diapo promo

- Local : http://localhost:3000/diapo/
- Production : https://bulletonsite.com/diapo/

Contenu édité dans `Entreprise/Communication(PasUnProjet)/`, puis publié :

```bash
cd ../Communication(PasUnProjet)
npm run sync:site
```

## Miniatures iframe (sites clients)

Pour qu'un site client s'affiche dans le carrousel :

1. Copier `embed-templates/vercel.json` sur le site client (CSP `frame-ancestors`)
2. Remplacer le domaine dans la config
3. Mettre à jour `config.js` → entrée `portfolio` du client

Voir `embed-templates/LISEZMOI.txt` et `PROMPTS.md`.

## Personnalisation

Tout le contenu marketing est dans **`config.js`** :

- `brand` — nom, baseline, contact
- `offers` — formules et prix
- `portfolio` — sites clients (URL, captures, tags)
- `team`, `testimonials`, `faq`

## Déploiement

Push `main` → Vercel auto-deploy sur bulletonsite.com.

## Contact

- **Bulle ton site** — [bulletonsite.com](https://bulletonsite.com)
- Hugo Davion — davionhugo@gmail.com
