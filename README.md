# Scrolleur Chanteur - v4.0
Projet venant d'un besoin d'afficher les paroles de chants lors de messes ou temps de prière.
Genre de logiciel gratuit de vidéo-projection des paroles de chants et même plus avec un système de zone de texte personnalisée (psaume du jour, annonces particulières, paroles de chants de dernière minute...).

### Utiliser la dernière version : [https://chantons.netlify.app/](https://chantons.netlify.app/)

## Ancienne version
La version 3 ne sera pas améliorée mais est téléchargeable **[> ici <](https://github.com/clementh44/scrolleur-chanteur/releases/latest)**
Les chants ajoutés dans la version 4 ne seront peut-être pas dans cette version 3. Ouvrir Ajouter chant.html pour en ajouter manuellement.

### Consignes pour un chant :
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
- > sans installation
- > hors ligne
- > sauvegarde des paramètres dans le navigateur
- > facile d'utilisation

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
