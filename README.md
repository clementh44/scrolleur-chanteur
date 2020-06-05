# Scrolleur Chanteur
Projet venant d'un besoin d'afficher les paroles de chants lors de messes ou temps de prière.

## Comment télécharger et afficher les paroles ?
 - Télécharger la dernière version [ici](https://github.com/clementh44/scrolleur-chanteur/releases/latest)
 - Décompresser le fichier télécharger (clic droit > extraire)
 - Ouvrir Paroles.html (cela s'ouvre avec un navigateur internet)


## Aperçu
![aperçu de la page](https://media.giphy.com/media/SUtin2dmPZqqX6elFc/giphy.gif)

## Comment ajouter un chant ?
les chants sont listés dans le dossier "*js*" dans le fichier "*chants.js*"
 - utiliser le formulaire dans "Ajouter chant.html" OU reprendre le modèle à la main
 - puis insérer le chant sans faire attention à l'ordre (tri automatique avec l'identifiant 'id')

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


## CMG sans
Police d'écriture téléchargée ici : [CMG sans font](https://www.churchmotiongraphics.com/cmg-sans/)


## ToDo
- paramètre taille police ; zoom ?
- ajouter une liste de chants : une pile de chants à personnaliser pour préparer l'ordre à l'avance
- ajout automatique du chant dans le fichier
- possibilité de choisir son fichier de chants


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