# Prompts à coller dans chaque repo client

Copiez le bloc correspondant dans la discussion Cursor (ou ticket) du **site client**, pas du portfolio.

---

## Prompt générique (tous les sites Vercel)

```
Autorise l'affichage de ce site en iframe sur mon portfolio Bulle ton site.

À la racine du projet, crée ou mets à jour vercel.json avec cet en-tête HTTP sur toutes les pages :

Content-Security-Policy: frame-ancestors 'self' https://bulletonsite.vercel.app https://bulletonsite.com https://www.bulletonsite.com http://localhost:3000

Si un vercel.json existe déjà avec d'autres headers, fusionne sans supprimer le reste.
Si une CSP complète existe déjà, ajoute ou remplace uniquement la directive frame-ancestors.

Ne touche pas au contenu du site, seulement la config de déploiement.
Après modification, indique-moi de redéployer sur Vercel.
```

---

## Prompt Netlify

```
Autorise l'affichage de ce site en iframe sur bulletonsite.com et bulletonsite.vercel.app.

Dans public/_headers (ou _headers à la racine selon la structure Netlify), ajoute :

/*
  Content-Security-Policy: frame-ancestors 'self' https://bulletonsite.vercel.app https://bulletonsite.com https://www.bulletonsite.com http://localhost:3000

Fusionne avec les headers existants si besoin. Redéploie ensuite.
```

---

## La Maison d'Elá, lamaisondela.com

```
Contexte : ce site est montré en aperçu interactif sur https://bulletonsite.com (section Réalisations).

Ajoute à la racine un vercel.json (ou complète l'existant) pour autoriser l'iframe depuis :
- https://bulletonsite.vercel.app
- https://bulletonsite.com
- https://www.bulletonsite.com
- http://localhost:3000

Directive CSP : frame-ancestors 'self' https://bulletonsite.vercel.app https://bulletonsite.com https://www.bulletonsite.com http://localhost:3000

Tu peux t'inspirer du fichier embed-templates/vercel.json du repo bulletonsite.
Redéploie sur Vercel après le changement.
```

---

## Quai des Rêves, quai-des-reves.vercel.app

```
Ce site doit pouvoir s'afficher en iframe sur bulletonsite.com (portfolio Bulle ton site).

Mets à jour vercel.json à la racine avec l'en-tête :
Content-Security-Policy: frame-ancestors 'self' https://bulletonsite.vercel.app https://bulletonsite.com https://www.bulletonsite.com http://localhost:3000

Si le site bloque encore l'embed (X-Frame-Options: DENY ou SAMEORIGIN), retire ou assouplis cette règle au profit de frame-ancestors ci-dessus.
Redéploie sur Vercel.
```

---

## ETCBC, etcbc-charpente.com

```
Autorise l'encadrement de ce site par mon portfolio :
https://bulletonsite.vercel.app et https://bulletonsite.com

Ajoute dans vercel.json (racine du projet) :
"Content-Security-Policy": "frame-ancestors 'self' https://bulletonsite.vercel.app https://bulletonsite.com https://www.bulletonsite.com http://localhost:3000"

Ne modifie pas le design ni les pages. Commit + push pour déclencher le redéploiement Vercel.
```

---

## SQCDP, sqcdp.vercel.app

```
Le portfolio bulletonsite.com affiche sqcdp.vercel.app dans un mini-navigateur.

Configure vercel.json pour autoriser frame-ancestors depuis bulletonsite (vercel.app + .com + www + localhost:3000).

Voir directive exacte dans le repo bulletonsite, dossier embed-templates/vercel.json.
Redéploie après modification.
```

---

## Vérification rapide

Après déploiement client, ouvre la console sur bulletonsite.com → section Réalisations :
si l'iframe charge, c'est bon ; sinon tu verras « Refused to frame… » → l'en-tête n'est pas encore actif ou une autre couche (Cloudflare, plugin) bloque encore.
