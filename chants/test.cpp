#include <iostream>
#include <fstream>
#include <stdio.h>
#include <unistd.h>
#include <pthread.h>
#include <string>
#include <dirent.h>

using namespace std;

//#include "decodage.h"

//Decodage decodage;
//Serveur serveur;

/*void *lire(void *){
    while(1){
        decodage.traitement(serial.getSerial());
    }
    return NULL;
}

void *ecrire(void *){
    while(1){
        string msg;
        msg.reserve(100);
        std::cout << "ecrire" << "\n";
        if(decodage.new_msg(&msg)){
            std::cout << "msg à envoyer : " << msg << "\n";
            serial.write_msg(msg);
        }else{
            sleep(1);
        }
	}
    return NULL;
}*/

int split(std::string msg_recu, std::string donnees[10], char separateur)
{
    int j = 0;
    int ia = 0;
    donnees[0] = "0";
    for (unsigned int i = 0; i < msg_recu.length(); i++)
    {
        char c = msg_recu.at(i);
        if (c == separateur)
        {
            donnees[j] = msg_recu.substr(ia, i - ia);
            j++;
            ia = i + 1;
        }
    }
    donnees[j] = msg_recu.substr(ia, msg_recu.length() - 1);
    j++;
    return j;
}
/*
void liste_fichier_v2(const char* path, std::string fichiers[100]){
     DIR* rep = opendir(path);
     int nb = 0;
    if ( rep != NULL )
    {
        struct dirent* ent;
        while ( (ent = readdir(rep) ) != NULL)
        {
            std::string valeur[10];
            int longueur = split(ent->d_name, valeur, '.');
            if(valeur[1] == "pdf"){
                string dossier(ent->d_name);
                string ancien = string("./Cantiques/") + dossier;
                string nouv = string("./premier/") + dossier;
                rename(ancien.c_str(),nouv.c_str());
                std::cout << nouv << "\n";
            }
            else if(valeur[1] == "PDF"){
                string dossier(ent->d_name);
                string ancien = string("./Cantiques/") + dossier;
                string nouv = string("./premier/") + valeur[0] + ".pdf";
                rename(ancien.c_str(),nouv.c_str());
                std::cout << nouv << "\n";
            }else{
                string dossier(ent->d_name);
                string ancien = string("./Cantiques/") + dossier;
                string nouv = string("./reste/") + dossier;
                rename(ancien.c_str(),nouv.c_str());
                std::cout << nouv << "\n";
            }
        }
        closedir(rep);
    }
}*/

void liste_fichier(const char *path, std::string fichiers[2000])
{
    DIR *rep = opendir(path);
    int nb = 0;
    if (rep != NULL)
    {
        struct dirent *ent;
        while ((ent = readdir(rep)) != NULL)
        {
            //std::string valeur[10];
            //split(ent->d_name, valeur, '.');
            //if(valeur[1] == "pdf"){
            fichiers[nb] = ent->d_name;
            nb++;
            //}
        }
        closedir(rep);
    }
}
/*
void version(std::string fichier){
    std::string valeur[30];
    int longueur = split(fichier, valeur, ' ');
    if(isdigit(valeur[longueur-1].at(0)) && valeur[longueur-1].length() == 5){
        string nouv = fichier;
        nouv.at(nouv.length()-6) = '_';
        nouv.at(nouv.length()-5) = 'v';
        nouv.at(nouv.length()-4) = valeur[longueur-1].at(0);
        nouv.at(nouv.length()-3) = '.';
        nouv.at(nouv.length()-2) = 'p';
        nouv.at(nouv.length()-1) = 'd';
        nouv += "f";
        std::cout << nouv << "\n";
        string ancien = string("./premier/") + fichier;
        string nouveau = string("./second/") + nouv;
        rename(ancien.c_str(),nouveau.c_str());
    }
    else std::cout << "non" << "\n";
}*/
/*
void detection_cote(std::string fichier){
    std::string valeur[30];
    split(fichier, valeur, '_');
    for(unsigned int i=0;i<valeur[0].length();i++){
        if(isdigit(valeur[0].at(i))){
            string ancien = string("./premier/") + fichier;
            string nouveau = string("./reste/") + fichier;
            rename(ancien.c_str(),nouveau.c_str());
            return;
        }
    }
}*/

double size_file(const char *addr)
{
    FILE *fichier;
    double size; //long c'est %ld

    fichier = fopen(addr, "rb");

    if (fichier)
    {
        fseek(fichier, 0, SEEK_END); // non-portable
        size = ftell(fichier);
        fclose(fichier);
    }
    return size;
}
/*
void detection_boublon(const char* path, std::string fichiers[2000]){
     DIR* rep = opendir(path);
    if ( rep != NULL )
    {
        struct dirent* ent;
        struct dirent* a_ent;
        while ( (ent = readdir(rep) ) != NULL)
        {
            string localisation = string(path) + string(ent->d_name);
            double taille = size_file(localisation.c_str());
            if(a_ent != NULL){
                string a_localisation = string(path) + string(a_ent->d_name);
                double a_taille = size_file(a_localisation.c_str());
                if(taille > a_taille - 50 && taille < a_taille + 50){
                    std::cout << ent->d_name << " et " << a_ent->d_name << "\n";
                }
            }
            a_ent = ent;
        }
        closedir(rep);
    }
}*/

/*
int main() {
    /*std::string msg = "test.pdf";
    std::string valeur[3];
    int longueur = split(msg, valeur, '.');
    for(int i=0; i<longueur; i++){
        std::cout << valeur[i] << "\n";
    }*/
/*
    string fichier[2000];
    liste_fichier(".",fichier);
    //detection_boublon("./premier/",fichier);
    int i=0;
    while(i<2000 && fichier[i] != ""){
        std::cout << fichier[i] << "\n";
        //detection_cote(fichier[i]);
        i++;
    }

    //version("Mystère du calvaire 3.pdf");
    
    return 0;
}*/

void nouvFichier(std::string titre, std::string texte[], int taille)
{
    string const nomFichier(titre);
    ofstream monFlux(nomFichier.c_str());

    if (monFlux)
    {
        int i = 0;
        while (i < taille && texte[i] != "")
        {
            monFlux << texte[i] << endl;
            i++;
        }
    }
    else
    {
        std::cout << "ERREUR: Impossible d'ouvrir le fichier." << endl;
    }
}

int main()
{
    ifstream fichier("chants.js");

    if (fichier)
    {
        //L'ouverture s'est bien passée, on peut donc lire

        string ligne; //Une variable pour stocker les lignes lues
        int l=0;
        std::string sommaire[2000];
        int s=0;

        while (getline(fichier, ligne)) //Tant qu'on n'est pas à la fin, on lit
        {
            sommaire[s] = ligne;
            s++;
            if (ligne[0] == '{')
            {
                //id
                getline(fichier, ligne);
                //std::cout << ligne << endl;
                sommaire[s] = ligne;
                s++;
                std::string valeur[20];
                split(ligne, valeur, '"');
                std::string id = valeur[3];
                //titre
                getline(fichier, ligne);
                sommaire[s] = ligne;
                s++;
                std::string valeur2[20];
                split(ligne, valeur2, '"');
                std::string texte[200];
                texte[0] = valeur2[3];
                int i = 1;

                getline(fichier, ligne); //        "paroles": [
                getline(fichier, ligne); //        {
                while (ligne[1] == '{')
                {
                    getline(fichier, ligne); //        couplet ou refrain
                    std::string valeur4[20];
                    split(ligne, valeur4, '"');
                    if (valeur4[3].at(0) == 'r')
                        texte[i] = "# refrain";
                    else if (valeur4[3].at(0) == 't')
                        texte[i] = "# traduction";
                    else if (valeur4[3].at(0) == 'c')
                        texte[i] = "# couplet";
                    else
                        std::cout << "ERR: type" << endl;
                    i++;

                    getline(fichier, ligne); // text
                    std::string valeur3[20];
                    split(ligne, valeur3, '"');

                    std::string valeur5[20];
                    split(valeur3[3], valeur5, '\\');

                    int k = 0;
                    while (k < 20)
                    {
                        if (k == 0) {
                            texte[i] = valeur5[k];
                            i++;
                        }
                        else {
                            if(valeur5[k] != "" && valeur5[k].at(0) == 'n'){
                                texte[i] += valeur5[k].substr(1);
                                i++;
                            } else {
                                texte[i] += valeur5[k];
                            }
                        }
                        k++;
                    }

                    getline(fichier, ligne); // },
                    getline(fichier, ligne); //        {
                }
                getline(fichier, ligne);
                sommaire[s] = ligne;
                s++;

                /*for (int j = 0; j < i; j++)
                {
                    if (texte[j] == ""){
                        cout << "ERR:espace a " << l << endl;
                        for (int m = 0; m < i; m++)
                        {
                            cout << texte[m] << endl;
                        }
                    }
                }*/

                if(i>2){
                    std::cout <<id << endl;
                    nouvFichier(id + ".txt",texte, 200);
                }
            }
            else
            {
                //cout << ligne << endl;
            }
            l++;
        }
        //for(int n=0; n<s; n++)std::cout << sommaire[n] << endl;
        //nouvFichier("sommaire.js", sommaire, 2000);
    }
    else
    {
        std::cout << "ERREUR: Impossible d'ouvrir le fichier en lecture." << endl;
    }

    return 0;
}
