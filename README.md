# Scrolleur Chanteur
Projet venant d'un besoin d'afficher les paroles de chants lors de messes ou temps de prière.

## Afficher les paroles
 - Ouvrir Paroles.html avec un navigateur


## Ajouter un chant
 - accéder directement à "chants.json" avec un éditeur de texte/code
 - utiliser le formulaire dans "Ajouter chant.html" OU reprendre le modèle à la main
 - puis insérer le chant sans faire attention à l'ordre (tri automatique avec l'id)


____ Titre ____
Majuscule au début
bien mettre les accents
mettre titre officiel  /  titre alternatif après
(Glorious) (Hopen) (Alegria) (Taizé)...

____  id  ____
(pour ordonner les chants dans l'ordre alphabetique)
exactement comme le titre mais :
en minuscule
sans-lespace-entre-les-mots
sans l'apostrophe '

___ couplet ___
commence par le numéro-espace-tiret-espace
1 - ...
2 - ...
3 - ...

____ PONT ____
comme un refrain mais commençant par PONT sur 1 ligne

___ traduction ___
à ajouter juste après le couplet/refrain/pont...


___ Messes ___
pour ajouter une messe
l'identifiant :
	messe-1-colombiere-sanctus-saint...
		1 = kyrie
		2 = gloria
		3 = alleluia
		4 = credo
		5 = sanctus
		6 = anamnèse
		7 = agnus

si plusieurs messes ont les mêmes paroles, juste modifier l'id et le titre en ajoutant le nom de la messe

## CMG sans
[CMG sans font](https://www.churchmotiongraphics.com/cmg-sans/)

## ToDo
- paramètre taille police ; zoom ?
- supprimer les icon en trop (https://fontawesome.com/)
- voir possibilité d'insérer un fond : photo ou vidéo
- ajouter une liste de chants : une pile de chants à personnaliser pour préparer l'ordre à l'avance
- ajout automatique du chant dans le fichier




## Changelog
*** v1.0 ***
	création d'un fichier html et ajout des chants à la main

04/11/17 :
	+ Alegria

04/12/17 :
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

07/12/17 :
	+ Nous Sommes (Hopen)

16/12/17 :
	+ Il est né le divin enfant

28/12/17 :
	+ Aujourd'hui s'est levée la lumière

*** v2.0 ***
	en xml

04-06/06/18 :
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

08/06/18 :
	ajustement dans le script

	+ Répands ton feu
	+ Viens Esprit Saint mets en nous ton feu
	+ L´Esprit Saint qui nous est donné
	+ Esprit de sainteté

06/07/18 : (tournoi festif du 7)
	màj Sauveur/Mighty to save
	+ que ma bouche en allemand
	Possibilité d'un double titre

24/05/2019 : (veillée pour visite pastorale de l'Evêque)
	ajout tuto
	+ Le Saint Esprit Descendra
	+ Ne crains pas
	Ta parole est présence (+ ajout du refrain)
	+ Marie veillée par trois étoiles

28/09/2019 : (Tournoi Festif - louange - messe)
	problème de sécurité cross file > option pour firefox
	liste triée avec les id + accents gérés
	màj bootstrap 3.3.7 > 4.1.3 (ajout de popper/js)
	màj jQuery 3.2.1 > 3.4.1
	màj Font Awesome 4.7.0 > 5.11.2
	Possibilité de rechercher un chant pour passer directement dessus
	ajustement des boutons et simplification (transparence, icones)
	+ Gwenolé
	+ Demeurez en mon amour

30/09/2019 :
	possibilité de cacher/afficher les paragraphes
	ajout d'un texte d'introduction/explications

05/10/2019 :
	javascript dans un fichier
	cacher/afficher uniquement les couplets
	les refrains deviennent toujours visibles au-dessus des couplets > si cela gêne, un clic dessus le replace à sa place fixe
	mise à jour auto du séparateur

20/10/2019 : (Taizé lycéens diocèse : messe + temps en diocèse)
	+ Choisis la vie
	+ Laissez-vous consumer
	coorection Notre Père (Glorious)
	màj boutons actions transparent car trop visible quand zoom

27/10/2019 : (messe en famille Derval)
	+ Regardez l'humilité de Dieu

23/11/2019 : (raclette confirmation)
	+ Pour tes merveilles
	+ Viens, Esprit de Sainteté
	+ Jésus, Toi qui as promis

03/01/2020 : (rencontre grands jeune)
	+ Le Seigneur nous a aimés
	+ Esprit de Dieu, souffle de vie
	+ Cantique de Siméon

24/01/2020 : (messe en famille Derval)
	+ Kyrie (Colombière)
	+ Gloire à Dieu (Emmaüs)
	+ Je crois en Dieu (symbole des apotres)
	+ Sanctus (Colombière)
	+ Anamnèse (Saint Jean)
	+ Agneau de Dieu (Colombière)
	+ Le fils de Dieu s'est fait homme

31/01/2020 :
	- Kadosh
	- Alleluia
	correction de chants ayant des blocks vides (Couronnée d'étoiles, Marie veillée, Mighty to save)
	travail à zéro pour une lecture sur tout navigateur : liste en json, traitement de la liste en javascript

*** v3.0 ***
	en html/js

02/02/2020 :
	correction du lien pour le css de bootstrap (http > local)
	amélioration des scripts
	amélioration des boutons de personnalisation (en haut)
	création d'un formulaire pour insérer un chant !!!
