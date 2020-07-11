<?php

if(isset($_GET['chant']) && isset($_GET['id']) && isset($_GET['titre'])){

    $id = (String) trim($_GET['id']);
    $chant = (String) trim($_GET['chant']);
    $titre = (String) trim($_GET['titre']);

    $file = fopen("../chants/".$id.".txt", "r");

    // création du fichier
    
    // écriture
    if(!$file){
        $f = fopen("../chants/".$id.".txt", "c+");
        fputs($f, $chant );
        // fermeture
        fclose($f);



        $fichier = fopen('../chants/sommaire.js', 'r+');
        
        if ($fichier)
        {
            /*Tant que l'on est pas à la fin du fichier*/
            $buffer = fgets($fichier);
            $buffer = $buffer."{\n".'	"id": "'.$id.'",'."\n".'	"titre": "'.$titre.'"'."\n},";

            while (!feof($fichier))
            {
                /*On lit la ligne courante*/
                $buffer = $buffer.fgets($fichier);
            }
            fseek($fichier, 0); // On remet le curseur au début du fichier
            fputs($fichier, $buffer);
            /*On ferme le fichier*/
            fclose($fichier);
        } 
        else echo "fichier introuvable : sommaire.js";
        echo "ok";
    } else echo "Chant déjà existant !";

}else echo "Il manque des paramètres";

?>