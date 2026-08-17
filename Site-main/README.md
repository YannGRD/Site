# yanngrd.fr · v2

Site portfolio — Yann GRD, Consultant en communication.

## Changements depuis v1

- **Police** : Cabinet Grotesk (sans empâtements) + General Sans pour le corps. Plus moderne, plus impactant.
- **Layout** : asymétrique. Méthode en zigzag, projets en liste éditoriale verticale (façon Sotheby's / Pentagram), grands chiffres décalés sur les résultats.
- **Animations** : reveal au scroll (fade + translate), parallax léger sur les éléments de fond, hover image-preview sur les rows projets, transitions soignées sur la nav et les liens.
- **Identité** : "Yann GRD" partout, mail `contact@yanngrd.com`.
- **Portrait** : version corrigée (mug rouge, pas de texte), compressé de 4,4 Mo à 77 Ko.
- **Visuels Netflix** : 8 visuels intégrés en mosaïque asymétrique (hero plein, vertical, wide, deux moitiés, offset 7/12).

## Structure

```
/
├── index.html
├── projets/
│   └── netflix.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── images/
│       ├── portrait.jpg
│       └── netflix/
│           ├── 01-castle-night.jpg → 06-jumping-woman.jpg
│           ├── 07-jump.jpg, 08-group-couch.jpg (en réserve)
│           └── netflix-logo.png
└── .nojekyll
```

## Tester en local

Ouvre `index.html` dans ton navigateur. Si certains chemins ne chargent pas :

```bash
cd yanngrd-site
python3 -m http.server 8000
# puis http://localhost:8000
```

## Déployer sur GitHub Pages

1. Crée un repo (ex: `yanngrd-site`)
2. Pousse :
```bash
cd yanngrd-site
git init && git add . && git commit -m "v2 — asymmetry + scroll animations"
git branch -M main
git remote add origin git@github.com:<user>/<repo>.git
git push -u origin main
```
3. **Settings → Pages → main / root**
4. Custom domain `yanngrd.fr` + DNS chez IONOS (CNAME → `<user>.github.io`)

## À faire ensuite

- [ ] Dupliquer `netflix.html` pour les 4 autres projets (Sciences Po, Chasseurs, Intercéréales, SIETREM)
- [ ] Compresser tous les visuels de chaque case study à venir (objectif : <300 Ko par image)
- [ ] Favicon (un point rouge sur fond cassé)
- [ ] Image OG (1200×630) pour les partages

## Stack

- HTML statique pur, CSS vanilla, ~120 lignes de JS sans dépendance
- Polices via Fontshare CDN (gratuites, self-hostables si tu veux passer offline)
- IntersectionObserver pour les animations (fallback : tout reste visible)
- Respecte `prefers-reduced-motion`

## Couleurs

| Var               | Hex       | Usage                          |
|-------------------|-----------|--------------------------------|
| `--color-bg`      | `#f8f7f4` | Fond principal                 |
| `--color-bg-dark` | `#0a0a0a` | Hero, contact, results         |
| `--color-ink`     | `#111111` | Texte principal                |
| `--color-mute`    | `#888580` | Texte secondaire               |
| `--color-line`    | `#e8e5e0` | Bordures, gros chiffres méthode|
| `--color-accent`  | `#BA0000` | Rouge signature                |
