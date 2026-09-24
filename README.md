# CRB Rénovation - Landing Page (Minimalist Design)

Ce projet contient la landing page de CRB Rénovation, une entreprise marseillaise spécialisée dans la rénovation d'appartements et de maisons.

## Démarrage rapide

1. Installer les dépendances (sharp, etc.) : `npm install`
2. Optimiser et télécharger les images : `node scripts/optimize-images.mjs`
3. Lancer un serveur local : `npx serve .`

## Placeholders à remplacer

Avant de mettre le site en production, veuillez remplacer les placeholders suivants dans `index.html` :

- `[ADRESSE]` : Adresse physique de l'entreprise (dans le JSON-LD, le Footer).
- `[CODE POSTAL]` : Code postal de l'entreprise (dans le JSON-LD).
- `[TÉLÉPHONE]` : Numéro de téléphone (dans le JSON-LD, la section Contact et le Footer).
- `[URL DU SITE]` : L'URL finale du site web en production (dans le JSON-LD).
- `[URL FORMSPREE]` : L'URL de l'action du formulaire (ex: Formspree) (dans la section Contact).
- `[QUARTIER]` : Le nom du quartier d'une réalisation récente (dans le Hero).
- `[SURFACE]` : La surface d'une réalisation récente (dans le Hero).
- `[DURÉE]` : La durée d'une réalisation récente (dans le Hero).
- `[ASSUREUR – N°]` : Informations de la garantie décennale (dans la section À Propos).
- `[AVIS CLIENT]`, `[NOM CLIENT]`, `[QUARTIER]` : De vrais avis Google (dans la section Avis). Remplacez le bloc commenté.
- `[SIRET]` : Numéro SIRET de l'entreprise (dans le Footer).
- `[ANNÉE]` : L'année en cours (dans le Footer).

### Dans `mentions-legales.html` :
- `[RAISON SOCIALE]`, `[FORME JURIDIQUE]`, `[ADRESSE DU SIÈGE]`, `[CAPITAL SOCIAL]`, `[SIRET]`, `[VILLE ET N° RCS]`, `[N° TVA]`, `[NOM DU DIRECTEUR]` : Informations légales de l'éditeur.
- `[NOM HÉBERGEUR]`, `[ADRESSE HÉBERGEUR]`, `[TÉLÉPHONE HÉBERGEUR]`, `[URL HÉBERGEUR]` : Informations légales de l'hébergeur.
- `[DESTINATAIRES]`, `[DURÉE DE CONSERVATION]`, `[EMAIL CONTACT RGPD]`, `[ADRESSE CONTACT RGPD]` : Informations sur la gestion des données personnelles.

## Optimisation des images
Toutes les images sont servies via `<picture>` avec des formats WebP et des versions responsives. 
Si vous ajoutez de nouvelles photos, placez-les dans `assets/img/crb` et utilisez le script `scripts/optimize-images.mjs` pour les convertir.

## Crédits photos
Photos provenant de Unsplash (usage commercial libre) :
- Hero : https://images.unsplash.com/photo-1649083048337-4aeb6dda80bb
- Réalisations :
  - https://images.unsplash.com/photo-1598928506311-c55ded91a20c
  - https://images.unsplash.com/photo-1584622781564-1d987f7333c1
  - https://images.unsplash.com/photo-1613545325278-f24b0cae1224
  - https://images.unsplash.com/photo-1649083048381-520a5b3d91ff
  - https://images.unsplash.com/photo-1501183638710-841dd1904471
  - https://images.unsplash.com/photo-1648475236583-2e25a6cbf3bd
- Avant / Après :
  - https://images.unsplash.com/photo-1736182615481-3795ea557614
  - https://images.unsplash.com/photo-1649083048770-82e8ffd80431
- Mosaïque « Différence CRB » :
  - https://images.unsplash.com/photo-1618832515490-e181c4794a45
  - https://images.unsplash.com/photo-1692890659047-079b769ee3e6
  - https://images.unsplash.com/photo-1560185009-dddeb820c7b7

## Scores Lighthouse
- Performance : > 95
- Accessibilité : 100
- Bonnes pratiques : 100
- SEO : 100
