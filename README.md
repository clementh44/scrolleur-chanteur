# Scrolleur Chanteur - v4
![GitHub last commit](https://img.shields.io/github/last-commit/clementh44/scrolleur-chanteur?label=Update&style=for-the-badge) ![](https://img.shields.io/badge/dynamic/json?color=success&label=Version&prefix=v&query=version&url=https://raw.githubusercontent.com/clementh44/scrolleur-chanteur/master/package.json&style=for-the-badge)

Projet venant d'un besoin d'afficher les paroles de chants lors de messes ou temps de prière.
Genre de logiciel gratuit de vidéo-projection des paroles de chants et même plus avec un système de zone de texte personnalisée (psaume du jour, annonces particulières, paroles de chants de dernière minute...).

### Utiliser la dernière version : [https://chantons.netlify.app/](https://chantons.netlify.app/)

- [Installation locale](#installationlocale)
- [Changelog](#changelog)
  - [Version 1.0](#-v10-)
  - [Version 2.0](#-v20-)
  - [Version 3.0](#-v30-)
  - [Version 4.0](#-v40-)

## Installation locale
### Prérequis
Installer git, nodeJS (inclus npm qui est un gestionnaire de paquets) et télécharger le projet dans le dossier courant

**Linux**
```
sudo apt install git nodejs npm
git clone https://github.com/clementh44/scrolleur-chanteur.git
```

**Mac**

[Homebrew](https://brew.sh/index_fr) est pratique pour gérer les outils du terminal
```
brew installer git nodejs npm
git clone https://github.com/clementh44/scrolleur-chanteur.git
```

**Windows**

Télécharger et installer [Git ici](https://gitforwindows.org/) et [nodeJs ici](https://nodejs.org/en/download/)
```
git clone https://github.com/clementh44/scrolleur-chanteur.git
```

 ### Mettre à jour à jour le projet et lancer un serveur
En se plaçant dans le dépôt local (dossier téléchargé localement) :

```
git pull
npm install
npm run serve
```

puis ouvrir un des liens proposés : http://localhost:8080 ou http://IPserveur:8080


L’autre possibilité est de faire la commande `npm run build` (à la place de `npm run serve`) et de copier le contenu du dossier *dist* dans un serveur.


## Ancienne version
La version 3 ne sera pas améliorée mais est téléchargeable **[> ici <](https://github.com/clementh44/scrolleur-chanteur/releases/latest)**
Les chants ajoutés dans la version 4 ne seront peut-être pas dans cette version 3. Ouvrir Ajouter chant.html pour en ajouter manuellement.

### Consignes pour un chant
- **Titre**
  - Majuscule au début
  - bien mettre les accents
  - mettre titre officiel  /  titre alternatif après
  - (Glorious) (Hopen) (Alegria) (Taizé)...

- **id** (pour ordonner les chants dans l'ordre alphabetique) exactement comme le titre mais :
  - en minuscule
  - sans-lespace-entre-les-mots
  - sans l'apostrophe '

- **couplet**
   - commence par le numéro-espace-tiret-espace :
     - 1 - ...
     - 2 - ...
     - 3 - ...

- **PONT**
  - comme un refrain mais commençant par PONT sur 1 ligne

- **traduction**
  - à ajouter juste après le couplet/refrain/pont...

- **Messes** (pour ajouter une messe)
  - l'identifiant : messe-1-colombiere-sanctus-saint...
    - 1 = kyrie
    - 2 = gloria
    - 3 = alleluia
    - 4 = credo
    - 5 = sanctus
    - 6 = anamnèse
    - 7 = agnus

si plusieurs messes ont les mêmes paroles, juste modifier l'id et le titre en ajoutant le nom de la messe

## Changelog
### *** v1.0 ***

création d'un fichier html et ajout des chants à la main

**04/11/17 :**
```
  + Alegria
```

**04/12/17 :**
```
  + Adorez-le
  + Appelés enfants de Dieu
  + Ave Maria (Glorious)
  + Béni soit ton nom
  + Bless the Lord

  Ajout d'un block 'traduction'
  Simplification du code

  + C'est par ta grâce
  + Chantez avec moi le Seigneur
  + Debout, resplendis
  + Donne moi seulement de t'aimer
  + Glory to the Lord : ajout de la traduction
  + Humblement, dans le silence
  + Je n’ai d’autre désir
  + Je veux te louer
  + Jésus le Christ
  + La ténèbre n'est point ténèbre
  + Mendiez
  + Mon âme se repose
  + Mon Père, je m'abandonne à toi
  + Nada te turbe
  + Notre Père (Glorious)
  + Prosternez-vous
  + Receive the power
  + Simplement je m'abandonne
  + Victoire à l'Agneau de Dieu
```

**07/12/17 :**
```
  + Nous Sommes (Hopen)
```

**16/12/17 :**
```
  + Il est né le divin enfant
```

**28/12/17 :**
```
  + Aujourd'hui s'est levée la lumière
```

### *** v2.0 ***

Passage en xml pour avoir la liste des chants dans un autre fichier et construire le fichier html automatiquement


**04-06/06/18 :**
```
  changement en xml pour ordre alphabétique automatique
  ajout d'un bouton pour réduire la marge de gauche

  + Beni soit Dieu le Père
  + Je viens vers toi, Jésus
  + Je vous ai choisis
  + Notre Dieu s'est fait homme
  + Psaume 26 - Le Seigneur est ma lumière et mon salut
  + Seigneur, mon secours
  + Toujours plus loin
  + Viens, Esprit Saint descends sur nous
  + Vous serez vraiment grands
```

**08/06/18 :**
```
  ajustement dans le script

  + Répands ton feu
  + Viens Esprit Saint mets en nous ton feu
  + L´Esprit Saint qui nous est donné
  + Esprit de sainteté
```

**06/07/18 : (tournoi festif du 7)**
```
  màj Sauveur/Mighty to save
  + que ma bouche en allemand
  Possibilité d'un double titre
```

**24/05/2019 : (veillée pour visite pastorale de l'Evêque)**
```
  ajout tuto
  + Le Saint Esprit Descendra
  + Ne crains pas
  Ta parole est présence (+ ajout du refrain)
  + Marie veillée par trois étoiles
```

**28/09/2019 : (Tournoi Festif - louange - messe)**
```
  problème de sécurité cross file > option pour firefox
  liste triée avec les id + accents gérés
  màj bootstrap 3.3.7 > 4.1.3 (ajout de popper/js)
  màj jQuery 3.2.1 > 3.4.1
  màj Font Awesome 4.7.0 > 5.11.2
  Possibilité de rechercher un chant pour passer directement dessus
  ajustement des boutons et simplification (transparence, icones)
  + Gwenolé
  + Demeurez en mon amour
```

**30/09/2019 :**
```
  possibilité de cacher/afficher les paragraphes
  ajout d'un texte d'introduction/explications
```

**05/10/2019 :**
```
  javascript dans un fichier
  cacher/afficher uniquement les couplets
  les refrains deviennent toujours visibles au-dessus des couplets > si cela gêne, un clic dessus le replace à sa place fixe
  mise à jour auto du séparateur
```

**20/10/2019 : (Taizé lycéens diocèse : messe + temps en diocèse)**
```
  + Choisis la vie
  + Laissez-vous consumer
  coorection Notre Père (Glorious)
  màj boutons actions transparent car trop visible quand zoom
```

**27/10/2019 : (messe en famille Derval)**
```
  + Regardez l'humilité de Dieu
```

**23/11/2019 : (raclette confirmation)**
```
  + Pour tes merveilles
  + Viens, Esprit de Sainteté
  + Jésus, Toi qui as promis
```

**03/01/2020 : (rencontre grands jeune)**
```
  + Le Seigneur nous a aimés
  + Esprit de Dieu, souffle de vie
  + Cantique de Siméon
```

**24/01/2020 : (messe en famille Derval)**
```
  + Kyrie (Colombière)
  + Gloire à Dieu (Emmaüs)
  + Je crois en Dieu (symbole des apotres)
  + Sanctus (Colombière)
  + Anamnèse (Saint Jean)
  + Agneau de Dieu (Colombière)
  + Le fils de Dieu s'est fait homme
```

**31/01/2020 :**
```
  - Kadosh
  - Alleluia
  correction de chants ayant des blocks vides (Couronnée d'étoiles, Marie veillée, Mighty to save)
  travail à zéro pour une lecture sur tout navigateur : liste en json, traitement de la liste en javascript
```

### *** v3.0 ***

Passsage en html/js pour une plus large compatibilité

**02/02/2020 :**
```
  correction du lien pour le css de bootstrap (http > local)
  amélioration des scripts
  amélioration des boutons de personnalisation (en haut)
  création d'un formulaire pour insérer un chant !!!
```

**06/02/2020 v3.0.1 :**
```
  corrections : nom de la page d'ajout de chant, bug manque de PopperJs, bug de mise à jour des espaces vides, bug sur certains chants
  ajouts : curseur en mode pointeur sur les couplets et refrains (puisque cliquables), super aperçu en .gif
```

**29/05/2020 v3.1.0 : (Pentecôte)**
```
  ajout de l'arrière-plan personnalisable avec une image ou une vidéo :
    > 1 bouton pour importer le fichier depuis son ordinateur (vidéo mp4, webm ou ogg)
    > 1 bouton pour supprimer l'arrière-plan avec un fondu
    > l'action "afficher fond" supprime l'arrière-plan avec un fondu
  passage au jQuery non slim pour utiliser les animations

  + Dieu nous a tous appelés (Nous sommes le corps du Christ)
  + Anamnese Emmaus
  + Tu fais ta demeure en nous
  + Esprit de Pentecôte, souffle de Dieu
  + J'ai vu des fleuves d'eau vive
  + Messe Soleil des Nations (Gloire à Dieu, Sanctus)
  + Devenez ce que vous recevez
```

**05/06/2020 v3.2.0**
```
  ajout des explications directement avec le formulaire de création d'un chant
```

**05/06/2020 v3.2.1**
```
  + Viens Esprit Saint (Veni Sancte Spiritus)
  + L'Esprit de Dieu repose sur moi
  + Messe du Partage
  + À l'image de ton amour
  + Peuple de baptisés
```

**08/06/2020 v3.2.2**
```
  mise à jour des packages
  corrections (Notre Père, caractère apostrophe)
  ajout explications pour l'ordinaire
  + Credo symbole de Nicée
  + couplets La Première en chemin
```

**08/06/2020 v3.2.3**
```
  correction de jquery pour la page du formulaire
  changement des boutons du formulaire
```

**11/06/2020 v3.2.4**
```
  + Peuple de Dieu, marche joyeux
  + Celui qui a mangé de ce pain
  + Tournez les yeux vers le Seigneur
  + Pour l'appel à rejoindre ton peuple
  + Messe de la Trinité (Gloria, Sanctus, Agnus)
  + N'ayons pas peur de vivre au monde
```

**27/06/2020 v3.3.0**
```
  marge par défaut au niveau 0 (les plus petites)
  ajout du numéro du couplet automatique dans le formulaire
```

**27/06/2020 v3.3.1**
```
  correction Que ma bouche chante ta louange
  + Chantez, priez, célébrez le Seigneur
  + Dieu nous accueille en sa maison
  + Venez, approchons-nous
  + Mendiant du jour
  + Christ aujourd'hui nous appelle
  + Écoute la voix du Seigneur
  + Partageons le pain du Seigneur
  + Souffle imprévisible
  + Heureux, bienheureux
  + Prenez et mangez, ceci est mon Corps
  + Un grand champ à moissonner
  + Lève les yeux et regarde
  + Levez les yeux et regardez
```

**27/06/2020 v3.4.0**
```
  ajout de 5 zones personnalisables
  message pour être sûr d'actualiser la page
```

**27/06/2020 v3.5.0**
```
  ajout d'une page d'aide au cadrage avec un vidéo-projecteur
```

**06/07/2020 v3.6.0**
```
  ajout d'un bouton pour cacher tous les couplets
  corrections des noms... lyrics, chorus, verse
```

**06/07/2020 v3.6.1**
```
  + Sur les chemins du monde
  + Au coeur de ce monde
  + Tenons en éveil la mémoire du Seigneur
```

**19/07/2020 v3.6.2**
```
  + Sainte-Anne Ô Bonne Mère
```

**21/07/2020 v3.6.3**
```
  + Messe de Saint-François-Xavier : Kyrie, Gloire à Dieu, Sanctus (Agnus et Anamnèse classique)
```

**31/07/2020 v3.6.4**
```
  + Prenons le large
  + En marchant vers Toi, Seigneur
```

**16/08/2020 v3.6.5**
```
  + Église du Seigneur
  + J'ai vu l'eau vive (Keur Moussa)
  + (Messe Colombière) Gloria
  + Notre Père (Glorious)
  + Ouvrez vos Cœurs
  + Je vous salue Marie (Angélus)
  + Ô Père, je suis ton enfant
```

**16/08/2020 v3.6.6**
```
corrections
```

**21/08/2020 v3.6.7**
```
  + Les mots que tu nous dis
  + Pain véritable (Pain de vie, corps ressucité)
  + Peuple de frères, peuple du partage
```

**31/08/2020 v3.6.8**
```
  + Psaume de la création
```

**06/09/2020 v3.6.9**
```
  corrections chants
  + Approchons-nous de la table
  + Tu entends mon cri
  + Notre dieu c’est fait homme
```

### *** v4.0 ***
Version 4 accessible ici : [https://chantons.netlify.app/](https://chantons.netlify.app/)
- sans installation
- hors ligne
- sauvegarde des paramètres dans le navigateur
- facile d'utilisation

**16/09/2020 v4.0.1**
```
  la version 4 est maintenant la principale
  + Ordinaire de messe Au coeur de ce monde (Rimaud)
  + Si le Père vous appelle
  + Bénissez Dieu
  + Alléluia, Jubilate
  + Esprit de lumière, Esprit créateur
  + Allez à Jésus Eucharistie
  + Jésus, Agneau de Dieu
  + Allez dans le monde entier
  + Par toute la terre
```

**23/09/2020 v4.0.2**
```
  Scroll vers le haut quand le chant change
  Ajout d'un bouton pour rechercher un titre sur google à partir de la barre de recherche
  Ajout d'un paramètre de personnalisation de la taille de la présentation (utile pour utiliser avec OBS studio par exemple)
```

**25/09/2020 v4.0.3**
```
  fix scrollTop quand la fenêtre de live n'est pas encore ouverte
  fix paramètres de dimensions de la fenêtre
  Aide : ajout d'un lien vers un formulaire
  Aide : se cache definitivement (ouvia les paramètres)
  Live : ajout d'une transition en fondu quand le contenu change
  + À ce monde que tu fais
  + Messe de l'Ermitage (Kyrie, Sanctus, Anamnèse, Agnus)
  + Messe de Sylvanès (Kyrie, Gloria, Sanctus, Anamnèse, Agnus)
  + Pour que nos cœurs
```

**28/09/2020 v4.0.4**
```
  Ajout de raccourcis clavier :
    echap pour fermer la fenêtre latérale (paramètres ou aperçu)
    flèche gauche ou droite pour afficher l'élément précédent ou suivant de la playlist
  Petit flou sympa dans la fenêtre latérale (léger car pas implémenté sur firefox)
```

**10/10/2020 v4.0.5**
```
  + Laisserons-nous à notre table
  + Aimer, c'est tout donner
  + Il est grand le bonheur de donner
  + Le vent souffle où il veut
  + Nous t'avons reconnu, Seigneur
```

**17/10/2020 v4.0.6**
```
  + Marie du Rosaire
```

**27/10/2020 v4.1.0**
```
  Pop-up pour le respect des droits d'auteur. Les paroisses cotisent annuellement au SECLI qui retransmet aux éditeurs qui retransmettent aux auteurs.
    L'utilisation de cet outil doit être dans le cadre exclusif d'une paroisse ou d'un groupe cotisant au SECLI.

  fix de la recherche de partition

  ajout de la cote, éditeur, auteur, compositeur des chants (source : secli.cef.fr) ; séparation des messes même si les paroles sont les même pour ajouter les cotes etc... (Emmaüs, Saint-Claude de la Colombière, Partage, Sylvanès, Soleil des Nations, Ermitage, Trinité, Saint François-Xavier, Au cœur de ce monde)
```

**27/10/2020 v4.1.1**
```
  + Ils sont nombreux les bienheureux
  + Bienheureux le pauvre
  + Dieu nous te louons
```

**29/10/2020 v4.2.0**
```
  Ajout des informations du chant affiché (cote, nouvelle cote SECLI, auteur, compositeur, éditeur). Affichage parametrable.
  Ajout lien don si ça se propage
  Ajout boutons : vider la playlist, intercaller du vide

  fix raccourcis clavier en éditant du texte
```

**31/10/2020 v4.2.1**
```
  + Vous êtes sans pareille
```

**04/12/2020 v4.2.2**
```
  + Jésus est le chemin
  + Vienne la rosée
  + Venez, divin Messie
  + Voici le Corps et le Sang du Seigneur
  + Dans le désert un cri s'élève
  + Préparez le chemin du Seigneur
```

**04/12/2020 v4.3.0**
```
  délai sur la recherche d'un chant pour plus de fluidité
  amélioration de l'indexation
```

**20/12/2020 v4.4.0**
```
  fix espace blanc quand pas de contenu au début d'un chant (ni titre ou infos)
  Amélioration générale de l'affichage du texte : Titre plus petit, infos Secli plus discrètes, espace entre les lignes plus petit
  Déplacement de la barre latérale
```

**22/12/2020 v4.5.0**
```
  Ajout des explications pour télécharger et installer la v4 localement
  Passage des boutons dans un menu
  Affichage du nombre de chants
```

**22/12/2020 v4.5.1**
```
  + Il es né le divin enfant (corrections) SYLH160 / F160
  + Voici la nuit P156-1
  + La voici, la nuit de Dieu F256
  + Gaudete Christus est natus FX73-73
  + Venu en notre chair (Anamnèse) C72 / EDIT14-44
  + Agneau de Dieu (musique Mozart) AL145
  + En accueillant l'amour DLH126 / DP126
  + Il est venu marcher sur nos routes F50-21-2
  + Peuple dans la nuit F237 / EDIT10-77
  + Les anges dans nos campagnes F9
  + Au plus haut du ciel C221-1 / Y221-1
  + Veilleurs, bénissez Dieu P19-58 / X19-58
  + Peuple fidèle (Adeste fideles) F5
  + Exultez de joie, peuples de l'univers F35-24
  + Puissance et gloire de l'Esprit
  + Chantons l'enfant qui nous est né
  + Douce nuit, sainte nuit !
  + Le Verbe s'est fait chair D155 / F155
  + Aujourd'hui dans notre monde F47 / FP47
  + Heureuse es-tu Marie V140 / VP140
  + L'enfant qui vient de naitre F255 / EDIT843
  + L'étoile s'est levée sur un enfant F46-47
  + La sagesse a dressé une table SYLF502 / D580
  + Le Fils de Dieu, le Roi de gloire F59
  + Noël, rumeur d'enfance F251-2SM
  + Louange et gloire à ton nom C250 / Y250
  + Lumière des hommes G128-2bis
  + Plus haut que les cieux E11-50-1 / VP11-50-1
  + Réjouis-toi, Jérusalem, alléluia ! E13-96 / EU13-96
  + Un enfant est né F279 / EDIT14-06
  + Tout le ciel s’emplit F58
  + Voici que l’ange Gabriel V516
  + Venez du fond des temps
  + Seigneur Jésus, tu es présent D370 / DEV297
  + Vous m’avez reconnu à la fraction du pain XD58-47
  + Guetteurs d’aurore E35-92
  + Les temps se renouvellent E177 / EDIT853
  + Préparez les chemins du Seigneur E134 / EA134
  + Quittons nos robes de tristesse E187
  + Toi qui ravis le cœur de Dieu VLH136 / VP136-2
  + Joie au ciel E255
  + Vienne, Seigneur, vienne ton jour E240
  + Aube nouvelle E130
  + Voici la demeure de Dieu SYLG420 / EX420
  + Aujourd’hui, montons sur la montagne T119 / M119
  + Bénis le Seigneur, ô mon âme Z582 / Z102-6
  + Louez Dieu, tous les peuples ! C201 / U622
  + Louez, exaltez le Seigneur DEV44-66
  + Nous te rendons grâce M58 / MY58
  + Seigneur, que ta Parole A51 / U641
  + Peuple de lumière T601
  + Aimer, il suffit d'aimer D600 / EDIT260
  + C'est toi Seigneur le Pain rompu D293
  + L'Amour jamais ne passera X44-65 / OX44-65
  + Ta parole nous réveille U526 / EDIT13-15
  + Pour avancer ensemble K20-38 / KD20-38
  + Béni sois-tu Seigneur V24
  + Ô Mère du Sauveur V59-25
  + Saurais-je dire oui V601 / DEV293
  + Sous ton voile de tendresse VP56-48
  + Marie, tendresse des pauvres V231
  + Vierge de lumière V223
  + Messe de Saint Paul
```

**22/12/2020 v4.6.0**
```
  Personnalisation des couleurs de la présentation
  Ascenseur de la présentation plus discret
```

**23/12/2020 v4.6.1**
```
  + Gloire à Dieu pour le temps de Noël
```

**30/12/2020 v4.7.0**
```
  aide dans le menu
```

**06/01/2021 v4.8.0**
```
  amélioration de l'actualisation des données (Vue.set pour modifier un objet et garder la réactivité)
  correction de l'icone animé de la playlist qui s'écrasait (quand titre long + écran petit)
  raccourcis clavier : on peut rester appuyer, le comportement par défaut est annulé (défilement avec les flèches par exemple)
  corrections safari : Titre de la SideBox écrasé
  agrandissement jusqu'à 8x la taille d'origine (128px)
  messages pour le SECLI déplacé

  Contrôle de la présentation depuis la playlist :
    (obligé de passer par la playlist pour afficher un chant dans la présentation)
    scroller de quelques pixels,
    passer à la partie suivante ou précédente du chant (couplet par exemple),
    afficher/cacher un couplet ou traduction,
    attacher/détacher un refrain,
    contrôle via raccourcis clavier personnalisable

  Corrections chants :
    coeur en cœur
    ’ en '
    Agnus Soleil des nations
    Esprit de sainteté
    Autres s'il y a que des chorus (problème de défilement)

  + Écoute, ton Dieu t'appelle (300ème chant !)
  + Allez dire à tous les hommes
```

**09/01/2021 v4.9.0**
```
  Quelques optimisations ergonomiques et mises à jour
```

**13/01/2021 v4.10.0**
```
  Amélioration du visuel à la suppression d'un élément
  Correction espace avant le texte (lors du formatage du code)
  Correction : espace vide inutilement affiché dans l'aperçu
  Possibilité de copier le texte dans l'aperçu
  Ajout du lien vers la documentation en attendant son intégration
```

**15/01/2021 v4.10.1**
```
  + Que tu es bon, Seigneur !
  + Messe dite "de Lourdes" AL23-23 ; AL189 ; A168/C168 ; AL23-14
  + Un homme au cœur de feu T170-1/O170-1
  + Vienne la paix sur notre terre T150-1/M150-1
```

**17/01/2021 v4.10.2**
```
  + Dieu saint - Kyrie Trisagion A96/C585
  + (Messe festive pour les dimanches du temps ordinaire) Gloire à Dieu AL40-83-32
  + (Messe festive pour les dimanches du temps ordinaire) Alleluia AL48-00
  + (Messe festive pour les dimanches du temps ordinaire) Anamnèse AL48-00
  + (Messe festive pour les dimanches du temps ordinaire) Saint le Seigneur AL48-00
  + (Messe festive pour les dimanches du temps ordinaire) Agneau de Dieu AL48-00
  + (Messe Christus Vincit) Gloire à Dieu C39-47
  + (Messe Christus Vincit) Alleluia U39-48
  + (Messe Christus Vincit) Saint, le Seigneur AL39-49
  + (Messe Christus Vincit) Anamnèse CL38-03-11
  + (Messe Christus Vincit) Agneau de Dieu D39-50
  + Tournés vers l'avenir K238

  Optimisation : le tri des chants ne se fait qu'une seule fois (au chargement de la page)
  Ajout d'un bouton pour supprimer les éléments vides de la playlist
  Amélioration du défilement par raccourcis clavier (descend/monte d'une ligne)
```

**21/01/2021 v4.10.3**
```
  Format documents avec Prettier
  Correction "Vous recevrez une force"

  + (Messe de Saint Jean) Kyrie AL68-19 13-25-01
  + (Messe de Saint Jean) Gloria AL68-19 13-25-02
  + (Messe de Saint Jean) Alleluia AL68-19 13-25-03
  + (Messe de Saint Jean) Sanctus AL68-19 13-25-04
  + (Messe de Saint Jean) Anamnèse AL68-19 13-25-05
  + Alléluia, Jésus sauveur T552 11-05
  + Me voici vers Toi EDIT21-06
  + Acclamons le Roi du ciel EDIT21-42
  + (Messe Que Tes Œuvres sont belles) Homme au milieu des hommes A220-1 R220-1
  + (Messe Que Tes Œuvres sont belles) Au plus haut du ciel C221-1 Y221-1
  + (Messe Que Tes Œuvres sont belles) Hosanna, Hosanna C220-1
  + (Messe Que Tes Œuvres sont belles) Anamnèse C220-1
  + (Messe Que Tes Œuvres sont belles) Agneau de Dieu, Agneau vainqueur A221-1 C570-1
  + Que tes œuvres sont belles A219-1 Y219-1
  + Alléluia, le Seigneur règne A507 Y548
  + Céleste Jérusalem 15-09
  + Chante, chante l'amour du Seigneur R537 Y537
  + Comme un souffle fragile U45 X785
  + Comme une biche Z510 Z41-2
  + Dieu nous appelle A205
  + En toi Seigneur mon espérance G45-35 GP45-35
  + Envoyés dans ce monde H20-35 HY20-35
  + Fais paraître ton jour Y53 HY53
  + Heureux les hommes au cœur de chair W100 WT100
  + Laudate Dominum (Taizé)
  + Le Seigneur est roi Z594 Z95-5
  + Les saints et les saintes de Dieu EDIT15-98
  + Nous chanterons pour toi, Seigneur K38
  + Ouvre mes yeux Seigneur G79-1 GP79-1
  + Peuple choisi K64
  + Prenons la main que Dieu nous tend T42-2 GR42-2
  + Tu es notre Dieu A187 RA187
  + Tu nous appelles à t'aimer T52
```

**22/01/2021 v4.10.4**
```
  + Viens embraser nos coeurs K35-29
```

**24/01/2021 v4.11.0**
```
  Ajout d'un bouton pour avoir accès uniquement aux paroles d'un chant depuis le répertoire
  Ajout d'une fenêtre pour les utilisateurs de safari afin d'expliquer le comportement anormal
```

**26/01/2021 v4.11.1**
```
  Ajout d'un sitemap pour mieux se retrouver
```

**28/01/2021 v4.11.2**
```
  Ajout de liens utiles dans l'aide

  + (Messe de Saint Boniface) Kyrie 14-28-01 AL68-18
  + (Messe de Saint Boniface) Gloria 14-28-02 AL68-18
  + (Messe de Saint Boniface) Alleluia 14-28-03 AL68-18
  + (Messe de Saint Boniface) Sanctus 14-28-04 AL68-18
  + (Messe de Saint Boniface) Anamnèse 14-28-05 AL68-18
  + (Messe de Saint Boniface) Agnus 14-28-06 AL68-18
```

**05/02/2021 v4.11.3**
```
  Ajout d'une barre de menu dans la page pour un chant

  + Signes par milliers K226 TK226
  + Comme lui
  + (Messe du peuple de Dieu) Kyrie AL597
  + (Messe du peuple de Dieu) Gloria AL597
  + (Messe du peuple de Dieu) Sanctus AL597
  + (Messe du peuple de Dieu) Anamnèse AL597
  + (Messe du peuple de Dieu) Agnus AL597
```

**07/02/2021 v4.11.4**
```
  Corrections chants
  Ajout d'une miniature de l'image dans la playlist
```

**08/02/2021 v4.11.5**
```
  + Vivons en enfants de lumière G14-57-1
  + Avec toi nous irons au désert G229
  + Lave-moi, Seigneur mon Dieu IEV 824
  + (Messe de la Réconciliation) Seigneur, prends pitié AL137
  + (Messe de la Réconciliation) Gloire à Dieu AL137
  + (Messe de la Réconciliation) Saint le Seigneur AL137
  + (Messe de la Réconciliation) Anamnèse AL137
  + (Messe de la Réconciliation) Agneau de Dieu AL137
  + Sur les routes de l'alliance G321
  + Peuple de l'alliance G244
  + Changez vos cœurs G162 GA162
  + Parole éternelle du Père U13-94 GU13-94
  + Goûtez et voyez, comme est bon le Seigneur D57-71
  + Revenez à moi de tout votre cœur SYLK94 GX94
  + Rends-nous la joie de ton salut G268
  + Tant qu'il fait jour L231-1 M231-1
  + Invisible, ô toi, lumière C239 DEV149
  + Seigneur, ne nous traite pas selon nos péchés G60
  + Quarante jours dans le désert G275 GY275
  + Ne craignez pas G139 R559
  + Le grain de blé G228 GP228
  + Pour que l'homme soit un fils G297-1 GP297-1
  + Où sont Amour et Charité D511 X567
```

**13/02/2021 v4.11.6**
```
  + Levons les yeux F67-27
```

**25/02/2021 v4.12.0**
```
  Enregistrement automatique de la playlist dans le navigateur : aussi en modifiant les couplets/refrains, textes persos etc...
  Correction du chant où il manquait l'id "rends-nous-la-joie-de-ton-salut"
  Correciton du chant "Avec toi nous irons au désert" où il y avait une répétition inutile
  Ajout de bordures personnalisées
  Amélioration de la gestion du scroll
```

**26/02/2021 v4.12.1**
```
  + Baptisé dans la lumière de Jésus I297 N297
```

**28/02/2021 v4.12.2**
```
  Corrections chants
  + Agneau de l'Alliance fidèle A240-1 C240-1
```

**13/03/2021 v4.12.3**
```
  Modifications mineures du texte de bienvenue
```

**24/03/2021 v4.13.0**
```
  passage de Bootstrap à vue-bootstrap
  ajout d'une animation au déplacement d'un élément dans la playlist
  ajout d'un logo/favicon
```

**25/03/2021 v4.13.1**
```
  + Vivez l'espérance T52-46
  + Grain de blé H510 GX510
  + Voici celui qui vient Z44-79 HX44-79
  + Ô Croix dressée sur le monde H30
  + Jésus, Messie humilié C246-1
  + Gloire à Toi, sauveur des hommes H27
  + Voici que s'ouvrent pour le roi H96-3 HA96-3
  + Victoire, tu régneras H32
  + La nuit qu'il fut livré C3 HP3
  + Chrétiens, chantons le Dieu vainqueur I36
  + Criez de joie, Christ est ressuscité I52-51
  + À toi la gloire
  + Alleluia, louez Dieu (psaume 148) Z585 Z148-3
  + Alleluia, proclamez que le Seigneur est bon (psaume 117) Z558 Z117-5
  + Grande est ta puissance EDIT18-34

  correction Hosanna, Ouvrons les portes au Roi
```

**27/03/2021 v4.13.2**
```
  + (Messe Polyphonie pour un avenir) Kyrie C44-97
  + (Messe Polyphonie pour un avenir) Gloire à Dieu
  + (Messe Polyphonie pour un avenir) Sanctus
  + (Messe Polyphonie pour un avenir) Anamnèse
  + (Messe Polyphonie pour un avenir) Agneau de Dieu AL35-46-20

  Correction Revenez à moi
```

**08/04/2021 v4.13.3**
```
  + En toi j'ai mis ma confiance S501 DEV132
  + Heureux celui qui se souvient G552
  + En quel pays de solitude G184 GP184-1
  + Quand je viens vers Toi DEV279 G41
  + Je te cherche dieu D532 DEV162
  + Je vous donnerai un cœur nouveau Z566 Z(AT)38
  + Parole du Seigneur Jésus
  + Vous m'avez reconnu XD58-47
  + Quand l'heure fut venue D52-61
  + Pain de dieu pour notre marche U11-21 GU11-21
  + Pour toi Seigneur EDIT18-37
  + Veillez et priez G267 EDIT14-32
  + Au cœur de nos détresses H128 HP128
  + Mystère du calvaire H44
  + Par la croix qui fit mourir H67-1 HP67-1
  + La coupe que nous bénissons D361-1
  + Qui mange ma chair D290
  + Ouvert est le tombeau I298
  + Bénissez le Seigneur (Cantique des créatures) Z(AT)41
  + Depuis l'aube où sur la terre I29 IP29
  + Dieu notre Père, amour puissant L31-44 MP31-44
  + Il est vraiment ressuscité SYLR1 I1
  + Il est temps de quitter vos tombeaux EDIT15-89
  + Il nous précède en Galilée I26-38
  + Jour du Seigneur, Christ ressuscité A531
  + Jour du Vivant I34-92-8 IP34-92-8
  + Par la musique et par nos voix (psaume 150) Y43-38
  + Sans avoir vu I168
  + Tu nous as sauvés, alléluia EDIT15-31
  + Pour accomplir les œuvres du Père K52-92-2
  + Ravive en toi le don de Dieu KT58-21
  + Viens, esprit de Dieu K235 KY235
  + Le Christ est vivant I214
```

**09/04/2021 v4.13.4**
```
  Ajout d'un gif comme tuto rapide
  Ajout d'une couleur pour l'icone de Présentation (en attendant un super redesign...)
```

**25/06/2021 v4.13.5**
```
  + Awesome God (Hillsong)
  + Saint-Esprit (Voici mon cœur) (Glorious)
```
