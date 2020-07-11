<?php

if(isset($_GET['chant'])){

    $id = (String) trim($_GET['chant']);

    $fichier = fopen('../chants/'.$id.'.txt', 'r');

    if ($fichier)
    {
        /*Tant que l'on est pas à la fin du fichier*/
        while (!feof($fichier))
        {
            /*On lit la ligne courante*/
            $buffer = fgets($fichier);
            /*On l'affiche*/
            echo $buffer;
        }
        /*On ferme le fichier*/
        fclose($fichier);
    } 
    else echo "fichier introuvable : ".$id;

}else echo "erreur";

?>