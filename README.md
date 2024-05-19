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
  - [Dernière version](#dernière-version)

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

- **Missel** (pour ajouter un texte)
  - l'identifiant commence par
    - 1xx = Rites initiaux
      - 11x = Salutation
      - 12x = Acte pénitentiel
      - 13x = Gloire à Dieu
    - 2xx = Liturgie de la Parole
    - 3xx = Liturgie de l'Eucharistie
    - 4xx = Rite de communion
    - 5xx = Rite de conclusion

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

**25/06/2021 v4.14.0**
```
  Ajout d'un système de pagination pour le répertoire : page et actions pour rapide (possibilité d'améliorer la recherche plus tard)
```

**21/07/2021 v4.14.1**
```
  + Je veux voir Dieu (canon)
  + Réjouis-toi, fille de Sion 17-51
  + Faites tout ce qu'il vous dira
  + Chantons sans fin le nom du Seigneur EDIT15-85
  + Criez, criez de joie ! EDIT15-41
  + Alleluia, Christ est vivant ! I22-15
  + Dieu te propose le bonheur
  + Gloire à toi, ô Dieu, notre Père M44-59 IEV : N°14-12
  + Ô Dieu, Seigneur des puissances Y52-60
  + Ô Jésus Sauveur EDIT173
  + Viens, sois ma lumière
  + Vivre comme le Christ
  + Oui, le Seigneur est notre joie R524 Y524
  + Venez, crions de joie, pour le Seigneur Z94-22
  + Avec des cris de joie
  + Jeunes et vieux
  + Gloire à toi, source de toute joie EDIT162
  + Au matin, la pierre est roulée EDIT157 15-05
  + Acclamez le Seigneur 22-04 Y69-72
  + Je veux te louer ô Paraclet
  + Poussons ensemble des cris d'allégresse
  + Allez par toute la terre (Psaume 95) TL20-76
  + Soyons toujours joyeux 04-62 C512
  + À toi la Gloire
  + Pousse des cris de joie IEV : N°12-38
  + Âme du Christ D21
  + Marche en ma présence BEAT0270
  + Je te reçois, Jésus 95-15
  + Vous qui avez soif, venez à moi Z44-82 X44-82
  + Toi qui règnes dans les cieux
  + Joie pour ceux qui ont pardonné
  + Trouver dans ma vie ta présence P205 EDIT13-56
  + Garde-moi mon Seigneur EDIT161 IEV : N°15-15
  + O éternel (Garde-moi, mon Dieu) C41-67 DEV240 08-15
  + Ton amour, ta puissance (More love, more power)
  + Ô prends mon âme E32-79
  + Jésus, Jésus
  + Tu es le roi de gloire
  + Moi, si j'avais commis EDIT117
  + Venez à moi, vous qui portez un fardeau IEV : N°16-17 EDIT15-74
  + En esprit et en vérité
  + Nous t'adorons dans ton temple (Car un jour près de toi) JEM463
  + Je vous aime ô mon Dieu IEV 20-09
  + Me voici, Seigneur (Psaume 138-137) N°837
  + Puisque tu fais miséricorde Z44-71 Z129-15
  + Je te donne tout
  + Nous te rendons grâce (Psaume 63) 01-43 M58
  + Jésus, adoramus te
  + À l'Agneau de Dieu (Élevé à la droite de Dieu) JEM519
  + Ô vrai corps de Jésus
  + Pour renaître sous le souffle de l'Esprit de Dieu
  + Vivre d'amour
  + Souffle, souffle de Dieu, JEM501
  + Viens descends des cieux 18-32 EDIT18-40
  + Je sais que tu es là
  + Ce que Dieu a choisi (Ce qu’il y a de fou dans le monde) O14-49 L14-49
  + Béni soit Dieu pour le don de son Esprit K35-79
  + Viens feu de Dieu
  + Viens Esprit créateur
  + Viens Esprit de Dieu 17-60
  + Viens, Esprit très saint K35-30 IEV : N°13-41
  + Viens, souffle de Dieu K59-28 IEV : N°18-33
  + Marie, témoin d'une espérance V23-07
  + Le Seigneur fit pour moi des merveilles SYLS46 Z(NT)1
  + Ô Maria EDIT169
  + (Missa pro Europa) Kyrie, eleison
  + (Missa pro Europa) Gloria
  + (Missa pro Europa) Alleluia
  + (Missa pro Europa) Grande doxologie (Gloire et louange à notre Dieu)
  + (Missa pro Europa) Sanctus
  + (Missa pro Europa) Agnus
  + Je suis votre painJe suis votre pain D159-3
```

**08/09/2021 v4.14.2**
```
  mise à jour du sitemap
  Corrections diverses
  ajout des espaces insécables avec \u00a0 ? : ! « » (bis) (x3)
```

**08/09/2021 v4.15.0**
```
  Ajout de marges personnalisées (à gauche et en bas des couplets, refrains et traductions)
```

**27/09/2021 v4.16.0**
```
  Modification de l'affichage de texte (chant ou texte personnalisé) pour pouvoir afficher du format html (modification de la base de données pour retours à la ligne et espaces insécables)
```

**07/10/2021 v4.17.0**
```
  Ajout d'un éditeur plus poussé (tiptap.dev) pour le texte personnalisable
```

**07/10/2021 v4.18.0**
```
  Aide pour l'assemblée avec la nouvelle traduction du Missel Romain en français appliquée au premier dimanche de l'avent le dimanche 28 novembre 2021
```

**12/10/2021 v4.18.1**
```
  Amélioration du SiteMap pour un meilleur référencement sur le long terme
    Supprimer le sitemap existant (le copier)
    npm run sitemap
    Coller les éléments les plus récents dans l'ancien sitemap (page principale et nouveaux chants)
```

**13/10/2021 v4.18.2**
```
  + Nous voici, Église notre mère (Fratello 2016)

  quelques corrections
    id de chants (Messe du partage, Je crois en un seul Dieu, Je suis votre pain)
    détails pour Missel Romain
    &nbsp; dans la playlist (v-html) puis mauvais affichage des parties d'un chant dans la playlist
    marge droite/gauche pour chants et texte personnalisé
    Style par défaut en blanc sur noir

  Ajout d'un style pour la playlist
  Personnalisation du titre pour les chants
  Ajout d'un bouton pour rapidement aller vers un couplet, l'afficher et cacher tous les autres
```

**17/10/2021 v4.18.3**
```
  Correction de bug avec des espaces insécables
  Ajout du fichier robot.txt
  Ajout lien dans le message d'annonce de la nouvelle traduction du missel romain
  Affichage d'une aide pour les boutons
  Ajout de Google Analytics (essai peut-être temporaire) (plugin vue-gtag)
```

**16/11/2021 v4.18.4**
```
  Nouvelle traduction du Missel Romain :
    Personnalisation de la couleur des éléments modifiés
    Corrections
    Ajout du rite de conclusion
    Ajout d'un lien vers une aide
```

**26/11/2021 v4.18.5**
```
  + Comme un ami T58 M534
  + Seigneur, venez E20
  + Viens pour notre attente E34
  + Le monde ancien s'en est allé E135 X894

  Ajout d'un lien direct vers la description de la dernière version
  Modification des ordinaires de messe pour la nouvelle traduction du missel romain. Tout est prêt pour la projection !
    Messe de Sylvanes : versets de l'acte pénitentiel, Gloria, agneau de Dieu, anamnèse
    Messe de l'Ermitage : versets de l'acte pénitentiel, agneau de Dieu, anamnèse
    Messe de Saint-Paul : versets de l'acte pénitentiel, Gloria
    Messe Polyphonie pour un avenir : proposition pour les versets de l'acte pénitentiel
    Messe Emmaüs : agneau de Dieu
    Messe Saint Claude de la Colombière : Gloria, agneau de Dieu
    Messe du Partage : Gloire à Dieu, agneau de Dieu
    Messe Soleil des Nations : agneau de Dieu, anamnèse
    Messe de la Trinité : Gloire à Dieu
    Messe de Saint François-Xavier : Gloire à Dieu, agneau de Dieu
    Messe de Lourdes : Gloria, agneau de Dieu
    Messe Christus Vincit : Gloire à Dieu, agneau de Dieu
    Messe festive pour les dimanches du temps ordinaire (Isabelle Fontaine) : Gloire à Dieu, agneau de Dieu
    Messe de Saint Jean : Gloria
    Messe de Saint Boniface : Gloria
    Messe du Peuple de Dieu : Gloria, agneau de Dieu
    Messe de la Réconciliation : Gloire à Dieu, agneau de Dieu
    Messe Que Tes Œuvres sont belles : anamnèse
    Agneau de Dieu de Mozart
    Gloire à Dieu pour le temps de Noël
    Anamnèse Jésus, Messie humilié
```

**10/12/2021 v4.18.6**
```
  Corrections
    &nbsp; afficher dans le title de la page
    optimisation des packages
    Vidéo à la place du gif
  Ajout d'un meta description personnalisé aux chants
```

**22/12/2021 v4.18.7**
```
  Correction
    Fenêtre de l'aperçu tout en haut à cause de l'aide
```

**02/01/2022 v4.18.8**
```
  + En mémoire du Seigneur D304-1
  + Il vient EY73-74
  + (Messe sur des Noëls populaires) Kyrie A13-00
  + (Messe sur des Noëls populaires) Sur notre terre et dans les cieux - Gloria AL14-06
  + (Messe sur des Noëls populaires) Saint notre dieu (Sanctus) C14-54
  + (Messe sur des Noëls populaires) Agneau de Dieu, sauveur du monde (Agnus) D14-55
  + Sur tes murs, Jérusalem (Pour l'amour de Sion) JEM713

  Ajout de choix dans les couleurs pour les temps liturgiques
  Possibilité de personnaliser la couleur des modifications du Missel Romain
```

**23/01/2022 v4.19.0**
```
  + Viens ma toute belle
  + Gloria Guillou AL13-89

  Texte persdonnalisé : retour à la ligne simple en appuyant sur la touche Entrée
  Tableaux Répartoire et Missel Romain :
    tri avec l'outil intégré et non manuellement
    recherche plus poussée : possiblité de rechercher dans le contenu (paroles, auteur, compositeur, éditeur etc...)
  Nettoyage dans le code (forEach en for...of, `${}` pour la concaténation de text)
```

**26/01/2022 v4.20.0**
```
  Améliorations pour le référencement : h1 et p ; breadcrum ; utilisation de schema.org
```

**26/01/2022 v4.20.0**
```
  Les refrains peuvent être cachés
  Ajout d'un bouton pour afficher les paramètres depuis la playlist
  Ajout d'un message quand le chant recherché n'existe pas
  Ajout d'un paramètre pour l'affichage des chants : alignement du texte à gauche ou au centre

  Corrections
    chant À ce monde que tu fais
    Aide (tooltip) disparait quand le curseur passe dessus (plus pratique)
```

**03/02/2022 v4.21.0**
```
  Optimisation des imports (icons bootstrap et icons FontAwesome) (~30% en moins du javascript)
```

**24/02/2022 v4.21.1**
```
  Correction :
    A toi la gloire (doublon)

  + Ta parole, Seigneur, est vérité, et ta loi délivrance ! (Psaume 018 - 15ème dimanche du temps ordinaire - Année C)
  + Peuple d'un Dieu qui est justice K19-93-1 KP19-93-1
  + Ta parole est la lumière de mes pas U11-19 GU11-19
  + Gloire au Christ, Parole/sagesse/Lumière éternelle du Dieu vivant A7 U640
  + Gloire et louange à toi, Seigneur, Jésus
  + Appelés à la liberté SM177 EDIT292
  + Prends Seigneur et reçois (La prière de St Ignace) EDIT17-19
  + Approchons-nous du Seigneur
  + Au désert avec l'Esprit G525
  + Au désert avec toi, Jésus-Christ G52-81
  + Avec toi, Seigneur A123
  + Christ, le fils du Père G50 GY50
  + Fais grandir en nous la foi GX60-80
  + Habitant du désert G27-47-1 GP27-47-1
  + Le chemin du serviteur G291
  + Point de prodigue sans pardon G183-1 GP183-1
  + Quarante jours d'une avancée GA58-20-4
  + Ton peuple dans la nuit se met en marche G26-36 GR26-36
  + Tu connais ton œuvre, Dieu créateur G109-1 GX109-1
  + Tu es passé faisant le bien G47-92
```

**22/03/2022 v4.21.2**
```
  Correction de l'icône quand la playlist est vide

  + Pain de Dieu, pain de vie D381
  + Ubi caritas X78-01
  + Joyeuse lumière de la gloire P28
  + Qu'éclate dans le ciel (Exultet) IL111-3
  + À la victime pascale
```

**27/03/2022 v4.22.0**
```
  Import-Export de la playlist (chants, textes, images)
  Corrections :
    Import de plusieurs fois la même image impossible
    Affichage de l'aide dans l'éditeur du texte personnalisable reste affiché en passant le curseur dessus
```

**13/04/2022 v4.23.0**
```
  Insertion des textes du prochain dimanche depuis aelf.org
  Corrections :
    petite correction d'affichage
    Heureux les cœurs miséricordieux
```

**15/04/2022 v4.23.1**
```
  Ajout d'un nouveau sitemap pour google........?
  Suppression de l'info du missel romain, liste des ordinaires modifiés tout en bas.
  Modification de l'aide

  Modification dans tous les chants pour passer de "homme" à "Homme" dans le sens humain.
    Sur 564 références,
      Homme(s) apparait 267 fois
      Femme/femme 11 fois (obligé pour évoquer Marie ou la femme adultère)

  Correction de Mendiant du jour
```

**17/05/2022 v4.23.2**
```
  Corrections
    FIX marges sur le chant même quand le texte est centré
    FIX éditeur/aelf sur l'import et la modification par la suite de ce qui est importé
    FIX éditeur sur le retour à la ligne
```

**04/06/2022 v4.23.3**
```
  + Donne-nous ton Fils V116
  + Que ces lieux soient visités JEM647
  + Manifeste-toi JEM452
  + (Messe Polyphonie pour un avenir) Alléluia U44-83
  + (Messe de la Visitation) Kyrie 14-27-01
  + (Messe de la Visitation) Gloria 14-27-03
  + (Messe de la Visitation) Alléluia 14-27-02
  + (Messe de la Visitation) Sanctus 14-27-04
  + (Messe de la Visitation) Anamnèse
  + (Messe de la Visitation) Agnus 14-27-05

  Corrections
    esprit > Esprit
    "sticky": false, sur certaines messes où le refrain n'a pas besoin de rester au-dessus des autres éléments (chants avec plusieurs)
    changement de l'icone d'ajout d'un text personnalisé
```

**21/09/2022 v4.23.4**
```
  Correction du title de la page principale
  Correction du chant Manifeste-toi
  Correction doublon du chant Vous m'avez reconnu
  Missel : suppression des couleurs après presque 1 an avec la nouvelle traduction
  Correction text si résultat de recher dans le répertoire vide
  Ajout d'un message dans la page des paroles d'un chant

  + Jésus, Verbe de Dieu, Kyrie G323-1 AL323-1
  + Recevez le Christ D74-13
  + Pain des merveilles D203
  + (Messe de l'Alliance) Dans ton amour, pitié pour moi ! A220
  + (Messe de l'Alliance) Gloire à Dieu notre Père A220
  + (Messe de l'Alliance) Alléluia de l'Alliance A220
  + (Messe de l'Alliance) Je crois en Dieu qui donne vie A220
  + (Messe de l'Alliance) Saint, le Très-Haut A220
  + (Messe de l'Alliance) Anamnèse A220
  + (Messe de l'Alliance) Doxologie A220
  + (Messe de l'Alliance) Corps du Seigneur, sang de l'Agneau A220
  + Venez à lui T508 X508
  + Venez, ayez foi en lui DEV363 IEV 17-59
  + Allez porter ma joie au monde EDIT47-07
  + Dieu qui nous appelle à vivre K158
  + Allez-vous en sur les places T28
  + Louange à toi, ô Christ IEV : N°17-40 EDIT15-99
```

**05/12/2022 v4.23.5**
```
  + Que soit béni le Nom de Dieu A245 Y245
  + Relever le faible (Glorious)
  + Maranatha, viens Seigneur Jésus E511 EX511
  + Ô viens, Jésus, ô viens, Emmanuel E147
  + Toi qui viens pour tout sauver E68-2SM EP68-2SM
  + Les pauvres mangeront à la table du Seigneur SYLF501 B512
  + N'aie pas peur G249 R249
  + Réjouis-toi, Marie V144
  + The kingdom of God (Taizé)
  + Adoramus te EDIT15-40
  + Adoramus te, O Christe (taizé)
  + Benedictus (Taizé)
  + Bonum est confidere (Taizé)
  + Celui qui croit en moi
  + Chercher avec toi, Marie (avec toi dans nos vie) V282
  + Dans nos obscurités (Taizé)
```

**10/05/2023 v4.23.6**
```
  Suppression de JQuery
  Correction des espaces insécables, d'espaces inutiles

  Corrections des chants Resucito, Vivre comme le Christ, C'est par ta grâce, Répands ton feu
  Ajout de couplets au chant Vivre d'amour

  + O clemens Maria
  + Source de tout amour
  + La voix du bien aimé
  + À toi notre louange
  + Grandes et merveilleuses JEM414
  + Venez vous abreuver DEV524
  + Ave Maria sois notre secours IEV : n°10-06
```

**12/05/2023 v4.24.0**
```
  Correction des problèmes de compilation (mise à jour des icones)
```

**19/06/2023 v4.24.1**
```
  Correction(s) :
    Symbole de Nicée (consubstantiel)
    homme > Homme quand cela revient de parler d'humain

  Corrections dans les icons suite à la mise à jour de FontAwesome en version 6 https://fontawesome.com/v6/docs/web/setup/upgrade/whats-changed
```

**05/07/2023 v4.24.2**
```
  Correction(s) :
    Angélus : et à l'heure de la mort
    Anamnèse messe de la Trinité : (bis) ajouté

  + Totus tuus IEV 16-16 EDIT15-72
```

**09/07/2023 v4.24.3**
```
  + Salve Regina
```

##### Dernière version
**19/07/2023 v4.24.4**
```
  + Glorifie le seigneur
  + Dansons ensemble
  + Christ est la lumière (Light Of All The Earth) JEM1057
  + Célébrez la douceur de son nom IEV 19-09
  + Sauve ton peuple IEV 22-21
  + Viens esprit saint - Ruah (Shalom)
  + Pour brûler le monde (Anuncio)
  + Abba Père (Collectif Cieux Ouverts)
  + Lumière du monde - Et me voici pour louer - Light of the World JEM 788
  + Ce Nom si merveilleux - O ce nom est si merveilleux - Beautiful Name JEM 1079
  + Ta majesté (Glorious)
  + Tu viens pour moi (Glorious)
  + Je bénirai (Glorious)
  + Car Dieu est un Dieu puissant - Our God is a awesome God JEM 385
  + À toi puissance et gloire A29-45 Y29-45
  + Criez de joie, pauvres de cœur IEV 15-11 EDIT159
  + Hymne des chérubins
  + Père saint IEV 15-43 EDIT15-60
  + Chez nous soyez Reine
  + Ô Mère bien aimée
  + Tu es bénie, ô Marie EDIT25-10
  + Marie, douce lumière
  + J'attendrai (Glorious)
```

**09/09/2023 v4.24.5**
```
  Correction(s) :
    Gloria (Messe de Lourdes)
    Tu as porté celui qui porte tout
    Je t'exalte ô roi mon Dieu
    À ce monde que tu fais

    chant du répertoire et chant de la playlist indépendant

  + Dieu Très-Haut qui fais merveille C127-1 Y127-1
  + Qui donc est Dieu ? L82-2 MP82-2
  + Vers toi, terre promise E18 GA18
  + Réveille les sources de l'eau vive G548
  + Source d'espérance K240
```

**15/11/2023 v4.24.6**
```
  + Dieu de l'Univers, Dieu saint DEV47-29
  + Laissons entrer le Roi de gloire JEM1097
  + Seigneur, par la clarté - Brille, ô Jésus (Lord, the light of your love - Shine Jesus shine) JEM495
  + Barukh ha ba be shem Adonai ASA352
  + Nous n'aurons pas de répit (We Will Give Ourselves no Rest) ASA299
  + Lumière de la joie ALG1402
  + Notre Dieu (Our God) JEM951
  + Célébrez l'Éternel JEM661
  + Victoire, alléluia
```

**15/11/2023 v4.24.7**
```
  + (Messe de San Lorenzo) Kyrie AL595 07-41-01
  + (Messe de San Lorenzo) Gloria AL595
  + (Messe de San Lorenzo) Alleluia AL595 07-41-03
  + (Messe de San Lorenzo) Sanctus AL595 07-41-04
  + (Messe de San Lorenzo) Anamnèse AL595 07-41-05
  + (Messe de San Lorenzo) Agnus Dui AL595 07-41-04
  + L'Esprit et l'épouse JEM869
```

**07/02/2024 v4.24.8**
```
  Correction(s) :
    Ne crains pas
    Me voici vers Toi
    Sanctus - Messe Saint François-Xavier
    "homme" / "Homme"

  + Ave Maria
  + À toi, Seigneur
  + Dieu notre Père, voici le pain B57-30
  + Éclate de joie
  + Goûtez et voyez D68-45 IEV 21-06
  + Habiter le seuil de ta maison, Seigneur E22-11 EDIT626
  + Magnificat
  + Pange lingua EDIT15-59 IEV 14-34
  + À vous d'en être les témoins (Kerygma 2023)
```

**22/02/2024 v4.24.9**
```
  Correction(s) :
    À toi notre louange
    côtes IEV

  + Ave Maria de Lourdes V125 DEV71
  + Emmène-moi vers le large
  + Glorificamus Te IEV 18-10 EDIT18-33
```

##### Dernière version
**19/05/2024 v4.24.10**
```
  Correction(s) :
    Je t'exalte ô roi mon Dieu
    Psaume 26 - Le Seigneur est ma lumière et mon salut
    Je n'ai d'autre désir

  + Éclate de joie
```