# Handoff — yanngrd-site (v10, corrections post-portfolio)

## En 30 secondes

Site portfolio statique de **Yann GRD** (consultant communication FR).
Slogan principal : **« Donnez-lui une couleur. »**
Identité visuelle : noir / blanc / rouge accent, point rouge après "Yann GRD" dans le nav.
Structure : `index.html` (homepage) + dossier `projets/` avec un fichier HTML par case study.
CSS dans `assets/css/style.css`, JS dans `assets/js/main.js`, polices dans `assets/fonts/`.
Déploiement : GitHub Pages, fichier `.nojekyll` à la racine.

## Ce qui est fait (v10 — alignement portfolio)

**Les 5 case studies sont en ligne et alignés avec le portfolio PDF "YG - Portfolio 2026" envoyé par Yann** :
- **01 Netflix** — `projets/netflix.html` — Désenchantée, lead créatif chez MNSTR
- **02 SIETREM** — `projets/sietrem.html` — Refonte d'identité totale (saga super-héros), lead stratégie & création
- **03 Sciences Po** — `projets/sciences-po.html` — Plateforme "Révélez-vous", lead stratégie & création
- **04 Chasseurs de Graines** — `projets/chasseurs.html` — Marque + saga photo filière céréales, Médaille d'or CEDAP 2025, lead stratégie & création
- **05 Intercéréales** — `projets/intercereales.html` — Campagne nationale "Sans Pain, c'est Moins Bien", co-lead stratégie & création, Argent Grand Prix Food & Beverage 2025

**La boucle de nav inter est entièrement fermée** (Netflix → SIETREM → Sciences Po → Chasseurs → Intercéréales → Netflix).

## Corrections appliquées en v10

1. **Lien cassé sur `index.html`** : `projets/chasseurs-de-graines.html` corrigé en `projets/chasseurs.html`. Le lien Intercéréales était déjà bon.
2. **CSS hero title débordement** (`.cs-hero__title`) : `max-width: 18ch` → `26ch` + ajout `overflow-wrap: break-word`. Plus de débordement sur le titre Intercéréales "Pour défendre une filière. On la fait disparaître." (et n'importe quel autre titre long à l'avenir).
3. **Pages projets — rôles, titres et narratives** : déjà alignés avec le portfolio PDF (rôles passés en *Lead/Co-lead stratégie & création*, narratives reprises du PDF, vrais chiffres).
4. **Page Intercéréales — visuels mosaïque** : les 4 visuels génériques (épi de blé, croque-monsieur, etc.) ont été remplacés par les vrais visuels du portfolio :
   - `01-metro.jpg` (hero) — Affichage métro station Luxembourg
   - `02-trophee.jpg` (tall) — Trophée Argent Grand Prix Food & Beverage 2025
   - `03-disparition.jpg` (wide) — Frame "LA DISPARITION" de la web-série
   - `04-instagram.jpg` (offset) — Publication @lescereales "À travers la Croûte"
5. **Chiffres Intercéréales** : +25M vues, ×7,2 abonnés, +1,6% conso 18-25 ans, + bloc awards (Argent Grand Prix Food & Beverage + Lauréat La Nuit des Rois XII).

## Le Drive marche très bien

**Folder racine** : `1C0H_uMRB7JtFDg9e0nSxuBS_V9S2WvqN`

Sous-dossiers (tous traités) :
- Netflix : `1OfZZgwjq_6J5hmrMHRPznXaXgrPqxcT9`
- SIETREM : `1hS4aCY8cYaOzUseniwxKDg0lEyDCAa7L`
- Sciences Po : `1bBB8YwsabaNoCJMFY7-SA024Ef67ssYW`
- Chasseurs de Graines : `1F9h88IvYzd6wJQLegluqxMZnZq2RDFoV`
- Intercéréales : `1d8ooB3vMozoooeQVCKPRbYMIA4AlnQZc`

**Note** : Le portfolio PDF en ligne (`YG - Portfolio 2026.pdf`, 102 Mo) est trop lourd pour `read_file_content`. Yann a fourni une version compressée en upload chat à la session v10, c'est la voie à privilégier pour les futures sessions.

## Workflow Drive → site

Helper Python à recréer en début de session si besoin :

```python
# /home/claude/save_drive.py
import json, base64, sys
from pathlib import Path
src = Path(sys.argv[1])
dst = Path(sys.argv[2])
outer = json.loads(src.read_text())
inner = json.loads(outer[0]["text"])
binary = base64.b64decode(inner["content"])
dst.parent.mkdir(parents=True, exist_ok=True)
dst.write_bytes(binary)
print(f"{inner['title']} -> {dst.name} ({len(binary):,} bytes, {inner['mimeType']})")
```

## Conventions éditoriales

- **Français**, ton sobre et incisif.
- *italiques* sur mots-clés émotionnels.
- **strong** sur le rôle / verbe d'action principal de Yann.
- Pattern de titre hero : opposition / punchline qui pose la tension du projet.
- Pas de logo image dans le hero du case study — la marque vit en texte dans `cs-hero__client`.

## Specs d'images web

- **Hero bandeau** : 1920×600, q82, ~100–220 KB
- **Mosaïque landscape** : 2000×1333 (3:2), q72–78, ~180–500 KB
- **Mosaïque portrait/tall** : 1324×1985 (2:3), q72–78, ~400 KB
- **Bannière wide** : 2000×740 ou similaire, q75–78, ~75–250 KB

Toujours JPEG progressif (`progressive=True`) + `optimize=True`.

```python
from PIL import Image, ImageOps
def fit_jpg(src, dst, size, quality=78, center=(0.5, 0.5)):
    im = Image.open(src).convert("RGB")
    out = ImageOps.fit(im, size, method=Image.LANCZOS, centering=center)
    out.save(dst, "JPEG", quality=quality, optimize=True, progressive=True)
```

## Nav inter en boucle (5 cas)

- **netflix.html** (01) : prev → `intercereales.html` ✓ · next → `sietrem.html` ✓
- **sietrem.html** (02) : prev → `netflix.html` ✓ · next → `sciences-po.html` ✓
- **sciences-po.html** (03) : prev → `sietrem.html` ✓ · next → `chasseurs.html` ✓
- **chasseurs.html** (04) : prev → `sciences-po.html` ✓ · next → `intercereales.html` ✓
- **intercereales.html** (05) : prev → `chasseurs.html` ✓ · next → `netflix.html` ✓ (boucle)

## TODO Yann pour la suite

1. **Netflix** — Vérifier si tu veux ajouter un teaser visuel d'awards (cohérence avec Chasseurs & Intercéréales).
2. **SIETREM** — Les chiffres "×7 visiteurs / ×4,3 abonnés / 2 ans de refonte" viennent du portfolio. Confirmer si "2 ans" doit rester ou si tu préfères un 3e KPI chiffré.
3. **Sciences Po** — Les chiffres "+100K visiteurs / +1,5K leads / ×2,8 abonnés" viennent du portfolio. À valider.
4. **Intercéréales** — Vérifier le crop des nouveaux visuels (notamment Instagram, le statut bar reste un peu visible).

## Fichiers livrés à date

- v4 → v9 : voir handoff précédents
- **v10** — Alignement complet sur le portfolio PDF : fix liens cassés home, fix CSS hero title débordement, refonte visuels mosaïque Intercéréales avec assets portfolio.

## Comment je dois bosser quand on reprend

- Démarre direct sur le sujet.
- Pour les choix éditoriaux ambigus, je propose et je signale dans le récap final ce qui demande validation.
- À chaque cas / chaque session de correction, je zippe et je présente avec `present_files`.
