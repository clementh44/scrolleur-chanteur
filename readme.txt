


Comment utiliser :
Le fichier index.html doit être au bon endroit pour qu'il soit relié avec serveur apache ou autre
Modifier l'adresse ip à la ligne 4 de client.js pour qu'elle corresponde à l'adresse ip du serveur
A la racine du projet, lancer la commande ~$ node wsserver.js
Aller à la page web http://192.168.0.42 (ou autre adresse ip)
Aller une nouvelle fois à la même adresse ip mais avec un autre appareil (les 2 pages sont liés avec le websocket)

Si le websocket fonctionne, du texte circule sur le terminal ou vous avez lancé la commande.



PB de fonctionnement :
Si pas de websocket :
Vérifier que l'adresse ip est la bonne à la ligne 4 de client.js
Sinon désactivement temporairement le parefeu, il faudra donc ajouter port 8100 sur parfeu de l'ordi/raspi



A améliorer :
La gestion des refrains et couplet pour l'affichage n'est pas très propre.
Les annonces ne sont pas synchro.
Possibilité de préparer une messe et de l'enregistrer.
Un bouton de reconnexion ?
Ajout du php pour limiter le taille de la page html
