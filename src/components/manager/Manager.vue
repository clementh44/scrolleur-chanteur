<template>
  <b-container fluid="xl">
    <b-navbar toggleable="sm" type="light" class="bg-light">
      <b-navbar-brand href="#">Scrolleur-chanteur</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :active="viewOpened" @click="toggleView" title="Ouvrir/fermer la fenêtre de présentation"> <font-awesome-icon :icon="'desktop'"></font-awesome-icon> Présentation </b-nav-item>
          <b-nav-item :active="previewOpened" @click="togglePreview" title="Ouvrir/fermer l'aperçu d'un élément"> <font-awesome-icon :icon="'eye'"></font-awesome-icon> Aperçu </b-nav-item>
          <b-nav-item :active="paramOpened" @click="toggleParam" title="Ouvrir/fermer les paramètres"> <font-awesome-icon :icon="'sliders-h'"></font-awesome-icon> Paramètres </b-nav-item>
          <b-nav-item :active="settings.help" @click="settings.help = !settings.help" title="Ouvrir/fermer l'aide'" class="text-success">
            <font-awesome-icon :icon="'question-circle'"></font-awesome-icon> Aide
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-row>
      <!-- Fenêtre de présentation -->
      <WindowPortal v-model="viewOpened" v-on:shortcuts="manageShortCuts" v-on:close="liveClosing" :width="settings.liveView.window.width" :height="settings.liveView.window.height">
        <ViewWindow ref="liveWindow" :element="viewBody" :settings="settings" :live="true" :duration="500"></ViewWindow>
      </WindowPortal>

      <!-- Fenêtre d'aperçu -->
      <SideBox v-show="previewOpened" header="Aperçu" @close="previewOpened = false">
        <template v-slot:content>
          <ViewWindow :element="previewBody" :settings="settings" :live="false"></ViewWindow>
        </template>
      </SideBox>

      <!-- Fenêtre des paramètres -->
      <SideBox v-show="paramOpened" header="Paramètres" @close="paramOpened = false">
        <template v-slot:content>
          <Settings :settings="settings"></Settings>
        </template>
      </SideBox>

      <div class="col">
        <!-- Information Missel -->
        <b-alert show variant="info" dismissible fade class="mt-3">
          <p
            ><strong>Nouveau !</strong> <a href="#missel-header">Aide à destination des fidèles pour la nouvelle traduction française du Missel Romain. (voir après le Répertoire)</a><br />
            Prières eucharistiques, réponses de l'assemblée, mise en évidence des modifications etc... Tout est prêt pour découvrir les textes de la liturgie pour l'avent 2021 !</p
          >
          <p>
            Depuis le 26 novembre, modification des ordinaires de messe. <b-button v-b-toggle.collapse-ordinaires variant="outline-primary" size="sm">Voir les ordinaires modifiés</b-button><br />
            <b-collapse id="collapse-ordinaires" class="mt-2">
              <b-card>
                <ul class="card-text">
                  <li
                    >Messe de Sylvanes : <a href="/song/messe-1-de-sylvanes-kyrie-nouvelle-traduction" target="_blank">versets de l'acte pénitentiel</a>,
                    <a href="/song/messe-2-de-sylvanes-gloire-a-dieu-gloria">Gloria</a>, <a href="/song/messe-7-de-sylvanes-agneau-de-dieu-agnus">agneau de Dieu</a>,
                    <a href="/song/messe-6-de-sylvanes-anamnese">anamnèse</a></li
                  >
                  <li
                    >Messe de l'Ermitage : <a href="/song/messe-1-de-lermitage-seigneur-prends-pitie-kyrie-nouvelle-traduction" target="_blank">versets de l'acte pénitentiel</a>,
                    <a href="/song/messe-7-de-lermitage-agneau-de-dieu-agnus">agneau de Dieu</a>, <a href="/song/messe-6-de-lermitage-anamnese">anamnèse</a></li
                  >
                  <li
                    >Messe de Saint-Paul : <a href="/song/messe-1-saint-paul-kyrie-nouvelle-traduction" target="_blank">versets de l'acte pénitentiel</a>,
                    <a href="/song/messe-2-saint-paul-gloria">Gloria</a></li
                  >
                  <li
                    >Messe Polyphonie pour un avenir :
                    <a href="/song/messe-1-polyphonie-pour-un-avenir-kyrie-nouvelle-traduction" target="_blank">proposition pour les versets de l'acte pénitentiel</a></li
                  >
                  <li>Messe Emmaüs : <a href="/song/messe-7-emmaus-agneau-de-dieu">agneau de Dieu</a></li>
                  <li
                    >Messe Saint Claude de la Colombière : <a href="/song/messe-2-claude-colombiere-gloria">Gloria</a>,
                    <a href="/song/messe-7-claude-colombiere-agnus-agneau-de-dieu">agneau de Dieu</a></li
                  >
                  <li>Messe du Partage : <a href="/song/messe-2-du-partage-gloire-a-dieu">Gloire à Dieu</a>, <a href="/song/messe-7-du-partage-agneau-de-dieu-agnus">agneau de Dieu</a></li>
                  <li
                    >Messe Soleil des Nations : <a href="/song/messe-7-soleil-des-nations-agneau-de-dieu-agnus">agneau de Dieu</a>, <a href="/song/messe-6-soleil-des-nations-anamnese">anamnèse</a></li
                  >
                  <li>Messe de la Trinité : <a href="/song/messe-2-trinite-gloire-a-dieu-gloria">Gloire à Dieu</a></li>
                  <li
                    >Messe de Saint François-Xavier : <a href="/song/messe-2-saint-francois-xavier-gloire-a-dieu-gloria">Gloire à Dieu</a>,
                    <a href="/song/messe-7-de-saint-francois-xavier-agnus">agneau de Dieu</a></li
                  >
                  <li>Messe de Lourdes : <a href="/song/messe-2-de-lourdes-gloria">Gloria</a>, <a href="/song/messe-7-de-lourdes-agneau-de-dieu">agneau de Dieu</a></li>
                  <li>Messe Christus Vincit : <a href="/song/messe-2-christus-vincit-gloire-a-dieu">Gloire à Dieu</a>, <a href="/song/messe-christus-vincit-agneau-de-dieu">agneau de Dieu</a></li>
                  <li
                    >Messe festive pour les dimanches du temps ordinaire (Isabelle Fontaine) : <a href="/song/messe-2-festive-pour-les-dimanches-du-temps-ordinaire-gloire-a-dieu">Gloire à Dieu</a>,
                    <a href="/song/messe-7-festive-pour-les-dimanches-du-temps-ordinaire-agneau-de-dieu">agneau de Dieu</a></li
                  >
                  <li>Messe de Saint Jean : <a href="/song/messe-2-de-saint-jean-gloria">Gloria</a></li>
                  <li>Messe de Saint Boniface : <a href="/song/messe-2-saint-boniface-gloria">Gloria</a></li>
                  <li>Messe du Peuple de Dieu : <a href="/song/messe-2-du-peuple-de-dieu-gloria">Gloria</a>, <a href="/song/messe-7-du-peuple-de-dieu-agnus">agneau de Dieu</a></li>
                  <li
                    >Messe de la Réconciliation : <a href="/song/messe-2-de-la-reconciliation-gloire-a-dieu">Gloire à Dieu</a>,
                    <a href="/song/messe-7-de-la-reconciliation-agneau-de-dieu">agneau de Dieu</a></li
                  >
                  <li>Messe Que Tes Œuvres sont belles : <a href="/song/messe-6-que-tes-oeuvres-sont-belles-anamnese">anamnèse</a></li>
                  <li><a href="/song/messe-7-agneau-de-dieu-mozart">Agneau de Dieu de Mozart</a></li>
                  <li><a href="/song/gloire-a-dieu-pour-le-temps-de-noel">Gloire à Dieu pour le temps de Noël</a></li>
                  <li><a href="/song/messe-6-jesus-messie-humilie">Anamnèse Jésus, Messie humilié</a></li>
                </ul>
              </b-card>
            </b-collapse>
          </p>
          <p><a href="https://forms.gle/NtKpdCazNs9N4NY88" target="_blank" rel="noopener">Signaler des erreurs, suggestions ou manques.</a></p>
          <p>
            <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=8C9QSKX238UGU&item_name=Soutenir+le+d%C3%A9veloppement+du+projet&currency_code=EUR" target="_blank" rel="noopener"
              ><strong>Soutenir</strong> ce site et son développement. Merci !</a
            >
          </p>
          <small
            ><a href="https://github.com/clementh44/scrolleur-chanteur#dernière-version" target="_blank">Version {{ version }}</a></small
          >
        </b-alert>

        <!-- Aide -->
        <b-alert variant="success" :show="settings.help" @dismissed="settings.help = false" dismissible fade class="mt-3">
          <strong
            >Bienvenue dans cette version {{ version }} du <a href="https://github.com/clementh44/scrolleur-chanteur#dernière-version" target="_blank" rel="noopener">Scrolleur-Chanteur</a></strong
          >
          <p>
            Cette page est chargée, plus besoin d'internet et rien à installer pour projeter dès maintenant ce que l'on souhaite (chant, image, texte) via le vidéoprojecteur ou l'écran branché à
            l'ordinateur.
          </p>
          <p><b-img thumbnail center fluid src="/ScrolleurChanteur Tuto rapide 09042021-2.gif"></b-img></p>
          <hr />
          <p><strong>Explications</strong></p>
          <p>
            Ici, c'est la page de gestion de la projection. Cliquez sur
            <em><font-awesome-icon :icon="'desktop'"></font-awesome-icon> Présentation</em>
            pour afficher la fenêtre de présentation (à mettre sur le vidéo-projecteur. Appuyez sur F11 pour mettre en plein écran).
          </p>
          <p>
            La <strong>Playlist</strong> permet de préparer une liste avec : des chants (ajouter avec
            <b-iconstack variant="success">
              <b-icon stacked icon="music-note-list" shift-h="-2"></b-icon>
              <b-icon stacked icon="plus" scale="0.75" shift-h="8"></b-icon>
            </b-iconstack>
            depuis le <strong>Répertoire</strong>) ; un contenu vide (avec <font-awesome-icon :icon="['far', 'square']"></font-awesome-icon>) ; un texte personnalisé (avec
            <font-awesome-icon :icon="'align-left'"></font-awesome-icon>) ; une image (avec <font-awesome-icon :icon="'image'"></font-awesome-icon>).
          </p>
          <p> Pour afficher un élément de la <strong>Playlist</strong>, il suffit d'appuyer sur <font-awesome-icon :icon="'desktop'"></font-awesome-icon>.</p>
          <p>
            Les paramètres et la playlist (sauf les images) sont automatiquement sauvegardés dans le navigateur.<br />Vous pouvez changer les <strong>raccourcis clavier</strong> pour contrôler la
            présentation avec le clavier depuis les paramètres (voir le menu en haut).
          </p>
          <hr />
          <p><strong>Liens utiles</strong></p>
          <p>
            Contact, question, chant manquant, idée... écrivez-moi via
            <a href="https://forms.gle/NtKpdCazNs9N4NY88" target="_blank" rel="noopener">ce formulaire</a>.
          </p>
          <p>
            <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=8C9QSKX238UGU&item_name=Soutenir+le+d%C3%A9veloppement+du+projet&currency_code=EUR" target="_blank" rel="noopener"
              ><strong>Soutenir</strong> ce site et son développement. Merci !</a
            >
          </p>
          <p> <a href="https://docs.google.com/document/d/19MGTOyoW13iaYUX2HcndmDFgLGre_xvMk36dkwvqBm4/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Documentation détaillée</a>. </p>
          <p>
            Trouvez les paroles de chants sur les sites suivants : <a href="https://secli.cef.fr/rechercher-des-fiches-de-chants" target="_blank" rel="noopener noreferrer">secli.cef.fr</a> |
            <a href="https://www.chantonseneglise.fr/recherche" target="_blank" rel="noopener noreferrer">ChantonsEnEglise.fr</a><br />
            Trouvez les textes du jour sur : <a href="https://www.aelf.org/" target="_blank" rel="noopener noreferrer">aelf.org</a>
          </p>
        </b-alert>

        <!-- Précisions pour Safari -->
        <b-alert variant="danger" :show="isSafari()" dismissible fade class="mt-3">
          <h5 class="alert-heading">
            Pour information
          </h5>
          <hr />
          <p>
            Vous semblez utiliser le navigateur web Safari (mac, iPhone, iPad). Pour information, le défilement du contenu via les boutons (raccourcis clavier ou boutons pour faire défiler ou se
            déplacer vers une partie d'un chant) n'est pas fluide. Vous pouvez essayer sur un autre navigateur web (Firefox ou Chrome).
          </p>
        </b-alert>

        <!-- Termes à accepter -->
        <b-alert variant="warning" :show="!secliAccepted" fade class="mt-3">
          <h5 class="alert-heading">
            Protection des œuvres
          </h5>
          <hr />
          <p>
            Les textes (faisant partie d'une œuvre au même titre que sa musique) présents sur cet outil sont à l'usage exclusif des cotisants au SECLI.
          </p>
          <p>
            En continuant à utiliser l'outil, vous déclarez cotiser par ailleurs au SECLI (<a href="https://secli.cef.fr/" target="_blank" rel="noopener"
              >Secrétariat des Editeurs de Chants pour la LIturgie</a
            >) directement ou via votre paroisse ou groupe.
          </p>
          <hr />
          <b-button variant="primary" @click="acceptSecli">
            Je comprends et accepte ces termes
          </b-button>
        </b-alert>

        <!-- Playlist -->
        <b-card class="mb-3" no-body>
          <b-card-header id="playlist-header" class="text-decoration-none d-flex justify-content-between" header-text-variant="success" header-tag="h3" v-b-toggle.collapse-playlist>
            <div><b-icon icon="music-note-list"></b-icon> Playlist</div>
            <font-awesome-icon class="pull-right when-open" :icon="'chevron-up'"></font-awesome-icon>
            <font-awesome-icon class="pull-right when-closed" :icon="'chevron-down'"></font-awesome-icon>
          </b-card-header>
          <b-collapse id="collapse-playlist" visible>
            <b-card-body>
              <Playlist
                ref="playlist"
                v-model="playlist"
                v-on:display="displayElement"
                v-on:preview="previewElement"
                :settings="settings"
                :current-element-index="currentElementIndex"
                v-on:update-current-element-index="currentElementIndex = $event"
                v-on:search-score="searchScore($event.title, $event.query)"
                v-on:scroll-to-pos="$refs.liveWindow.scrollViewToPos($event.pos)"
                v-on:display-and-scroll="$refs.liveWindow.displayAndScroll($event.pos)"
              ></Playlist>
            </b-card-body>
          </b-collapse>
        </b-card>

        <!-- Répertoire -->
        <b-card class="mb-3" no-body>
          <b-card-header id="repertory-header" class="text-decoration-none d-flex justify-content-between" data-toggle="collapse" header-tag="h3" v-b-toggle.collapse-repertory>
            Répertoire
            <font-awesome-icon class="pull-right when-open" :icon="'chevron-up'"></font-awesome-icon>
            <font-awesome-icon class="pull-right when-closed" :icon="'chevron-down'"></font-awesome-icon>
          </b-card-header>
          <b-collapse id="collapse-repertory" visible>
            <b-card-body>
              <b-form-group>
                <label for="searchInput">Rechercher parmis les {{ songs.length }} chants</label>
                <b-input-group>
                  <b-form-input @keydown.stop type="text" id="searchInput" placeholder="Rechercher un titre..." v-debounce="searchSong" @click="$event.target.select()"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="outline-secondary" @click="searchScore(search, settings.score.google)" v-b-tooltip.hover title="Rechercher le titre sur google">
                      <font-awesome-icon :icon="['fab', 'google']"></font-awesome-icon>
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
              <div>
                <b-pagination
                  v-model="filteredSongsCurrentPage"
                  :total-rows="filteredSongsItem"
                  :per-page="filteredSongsPerPage"
                  first-number
                  last-number
                  align="center"
                  aria-controls="filtered-songs"
                ></b-pagination>

                <b-table
                  id="filtered-songs"
                  :items="filteredSongs"
                  :per-page="filteredSongsPerPage"
                  :current-page="filteredSongsCurrentPage"
                  :fields="[{ key: 'item', label: '' }]"
                  :bordered="true"
                  thead-class="d-none"
                >
                  <template #cell(item)="data">
                    <div class="d-flex align-items-center">
                      <div class="flex-grow-1" v-html="data.item.title"></div>
                      <ElementActions
                        :element="Object.assign({ type: 'song' }, data.item)"
                        :settings="settings"
                        @preview="previewElement($event)"
                        @search-score="searchScore($event.title, $event.query)"
                      >
                        <template v-slot:end>
                          <b-button variant="light" @click="addElement(data.item)" v-b-tooltip.hover title="Ajouter dans la playlist">
                            <b-iconstack variant="success">
                              <b-icon stacked icon="music-note-list" shift-h="-2"></b-icon>
                              <b-icon stacked icon="plus" scale="0.75" shift-h="8"></b-icon>
                            </b-iconstack>
                          </b-button>
                          <b-button variant="light" :to="{ name: 'song', params: { id: data.item.id } }" target="_blank" v-b-tooltip.hover title="Ouvrir les paroles dans une fenêtre externe">
                            <font-awesome-icon :icon="'external-link-alt'"></font-awesome-icon>
                          </b-button>
                        </template>
                      </ElementActions>
                    </div>
                  </template>
                </b-table>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>

        <!-- Missel Romain -->
        <b-card class="mb-3" no-body border-variant="warning">
          <b-card-header id="missel-header" class="text-decoration-none d-flex justify-content-between missel-card-title" data-toggle="collapse" header-tag="h3" v-b-toggle.collapse-missel>
            Missel Romain
            <font-awesome-icon class="pull-right when-open" :icon="'chevron-up'"></font-awesome-icon>
            <font-awesome-icon class="pull-right when-closed" :icon="'chevron-down'"></font-awesome-icon>
          </b-card-header>
          <b-collapse id="collapse-missel" visible>
            <b-card-body>
              <div class="mb-3">
                Aide à destination des fidèles pour la <strong>nouvelle traduction du Missel Romain</strong> appliquée à partir du premier dimanche de l'avent 2021 (28/11/2021)<br />
                <a href="https://docs.google.com/document/d/18QE7Okgjws0reUaglACkB8djVEE9dCwaDcs8OZQuUcs/edit?usp=sharing" target="_blank" rel="noopener"
                  >Aide à propos du déroulement d'une liturgie de l'eucharistie.</a
                >
              </div>
              <div class="mb-3"
                >Il est possible de changer la couleur des élements modifiés
                <b-dropdown text="Couleur">
                  <b-dropdown-item @click="changeMisselColor('#FFFA70')">
                    <span style="color:#FFFA70; background-color: #000;"><strong>Jaune</strong></span>
                  </b-dropdown-item>
                  <b-dropdown-item @click="changeMisselColor('#4DACFE')">
                    <span style="color:#4DACFE;"><strong>Bleu</strong></span>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
              <b-form-group>
                <b-input-group>
                  <b-form-input @keydown.stop type="text" id="searchInput" placeholder="Rechercher..." v-debounce="searchMissel" @click="$event.target.select()"></b-form-input>
                </b-input-group>
              </b-form-group>
              <div>
                <b-pagination
                  v-model="filteredMisselCurrentPage"
                  :total-rows="filteredMisselItem"
                  :per-page="filteredMisselPerPage"
                  first-number
                  last-number
                  align="center"
                  aria-controls="filtered-missel"
                ></b-pagination>

                <b-table
                  id="filtered-missel"
                  :items="filteredMissel"
                  :per-page="filteredMisselPerPage"
                  :current-page="filteredMisselCurrentPage"
                  :fields="[{ key: 'item', label: '' }]"
                  :bordered="true"
                  thead-class="d-none"
                >
                  <template #cell(item)="data">
                    <div class="d-flex align-items-center">
                      <div class="flex-grow-1">{{ data.item.title }}</div>
                      <ElementActions :element="Object.assign({ type: 'text' }, data.item)" :settings="settings" @preview="previewElement($event)">
                        <template v-slot:end>
                          <b-button variant="light" @click="addElement(data.item)" v-b-tooltip.hover title="Ajouter dans la playlist">
                            <b-iconstack variant="success">
                              <b-icon stacked icon="music-note-list" shift-h="-2"></b-icon>
                              <b-icon stacked icon="plus" scale="0.75" shift-h="8"></b-icon>
                            </b-iconstack>
                          </b-button>
                        </template>
                      </ElementActions>
                    </div>
                  </template>
                </b-table>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import Chants from "../../chants.json"
import Missel from "../../misselRomain.json"
import WindowPortal from "../WindowPortal"
import ViewWindow from "../view/ViewWindow"
import SideBox from "../sideBox/SideBox"
import Playlist from "./Playlist"
import Settings from "./Settings"
import ElementActions from "./ElementActions"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faSquare } from "@fortawesome/free-regular-svg-icons"
import { faDesktop, faSlidersH, faChevronDown, faChevronUp, faFileAlt, faImage, faQuestionCircle, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"

library.add(faSquare, faDesktop, faSlidersH, faChevronDown, faChevronUp, faFileAlt, faImage, faQuestionCircle, faExternalLinkAlt, faGoogle)

export default {
  name: "Manager",
  data() {
    return {
      version: process.env.VUE_APP_VERSION,
      songs: Chants,
      missel: Missel,
      secliAccepted: false,
      currentElementIndex: -1,
      viewBody: { type: "empty" },
      viewOpened: false,
      playlist: [],
      filteredSongsPerPage: 10,
      filteredSongsCurrentPage: 1,
      filteredSongsHeader: [
        { key: "title", label: "Titre" },
        { key: "actions", label: "Actions" }
      ],
      search: "",
      filteredMisselPerPage: 10,
      filteredMisselCurrentPage: 1,
      filteredMisselHeader: [
        { key: "title", label: "Titre" },
        { key: "actions", label: "Actions" }
      ],
      searchMisselText: "",
      paramOpened: false,
      settings: {
        version: 20210908, // à incrémenter s'il y a des changements dans la structure des paramètres et forcer la ràz des paramètres sauvegardés dans le navigateur
        liveView: {
          viewThemes: [
            {
              text: "Noir sur blanc",
              value: {
                background: "#FFFFFF",
                text: "#000000",
                empty: "#FFFFFF"
              }
            },
            {
              text: "Blanc sur noir",
              value: {
                background: "#000000",
                text: "#FFFFFF",
                empty: "#000000"
              }
            }
          ],
          colors: {
            background: "#000000",
            text: "#FFFFFF",
            empty: "#000000"
          },
          padding: {
            view: 0,
            verse: {
              left: 0,
              bottom: 0.5
            },
            chorus: {
              left: 0.5,
              bottom: 0.5
            },
            translation: {
              left: 1,
              bottom: 0.5
            }
          },
          fontSize: 1,
          window: {
            height: 400,
            width: 600
          },
          borders: {
            styles: [
              {
                text: "Solide",
                value: "solid"
              },
              {
                text: "Pointillé",
                value: "dotted"
              },
              {
                text: "Tirets",
                value: "dashed"
              },
              {
                text: "Double",
                value: "double"
              },
              {
                text: "Rainurée",
                value: "groove"
              },
              {
                text: "Relief",
                value: "ridge"
              },
              {
                text: "Relief intérieur",
                value: "inset"
              },
              {
                text: "Relief extérieur",
                value: "outset"
              }
            ],
            empty: false,
            song: false,
            file: false,
            text: false,
            top: {
              displayed: true,
              color: "#D6B300",
              style: "solid",
              width: 5
            },
            right: {
              displayed: true,
              color: "#D6B300",
              style: "solid",
              width: 5
            },
            bottom: {
              displayed: true,
              color: "#D6B300",
              style: "solid",
              width: 5
            },
            left: {
              displayed: true,
              color: "#D6B300",
              style: "solid",
              width: 5
            }
          }
        },
        song: {
          showTitle: true,
          showRating: true,
          showWriter: false,
          showComposer: false,
          showPublisher: false,
          verseOpacity: 0.1
        },
        score: {
          enabled: false,
          query: "",
          google: "http://www.google.com/search?q=<TITRE>",
          googlePdf: "http://www.google.com/search?q=<TITRE>+filetype:pdf",
          youtube: "https://www.youtube.com/results?search_query=<TITRE>"
        },
        help: true,
        shortcuts: {
          playlistNext: "ArrowRight",
          playlistPrevious: "ArrowLeft",
          scrollDown: "ArrowDown",
          scrollUp: "ArrowUp",
          partNext: "*",
          partPrevious: "$"
        }
      },
      previewOpened: false,
      previewBody: { type: "empty" }
    }
  },
  components: {
    WindowPortal,
    ViewWindow,
    Playlist,
    SideBox,
    Settings,
    ElementActions
  },
  methods: {
    // LIVE
    toggleView: function() {
      if (!this.viewOpened) {
        this.viewBody = { type: "empty" }
      }
      this.viewOpened = !this.viewOpened
    },
    displayElement: function(element, index) {
      if (index != undefined) {
        this.currentElementIndex = index
      }

      this.viewBody = { type: "empty" }
      setTimeout(() => {
        this.$refs.liveWindow.scrollTop()
        this.viewBody = element
        setTimeout(() => this.$refs.liveWindow.handleScroll(), 100)
      }, 500)
      if (!this.viewOpened) {
        this.toggleView()
      }
    },
    liveClosing: function() {
      this.currentElementIndex = -1
    },
    // APERCU
    togglePreview: function() {
      this.previewOpened = !this.previewOpened
      if (this.previewOpened && this.paramOpened) {
        this.paramOpened = false
      }
    },
    previewElement: function(element) {
      this.previewBody = element
      if (!this.previewOpened) {
        this.togglePreview()
      }
    },
    // PARAMETRES
    toggleParam: function() {
      this.paramOpened = !this.paramOpened
      if (this.paramOpened && this.previewOpened) {
        this.previewOpened = false
      }
    },
    // PLAYLIST
    addElement: function(el) {
      if (!this.playlist.find((element) => element.id == el.id)) {
        this.playlist.push(el)
      }
    },
    // PARTITION
    searchScore: function(title, query) {
      if (query && query.includes("<TITRE>")) {
        window.open(query.replace("<TITRE>", title.replace(/ /g, "+")))
      }
    },

    // fonction pour le debounce de la recherche d'un titre
    searchSong: function(title) {
      this.search = title
    },
    searchMissel: function(title) {
      this.searchMisselText = title
    },

    // AUTRE
    beforeClose: function(event) {
      event.returnValue = "Fermez ou rafraichissez la page si vous avez une connection internet. Les paramètres et la playlist sont enregistrés (sauf les images)"
    },
    manageShortCuts: function(event) {
      if (event.key == this.settings.shortcuts.playlistNext) {
        event.preventDefault()
        if (this.currentElementIndex + 1 < this.playlist.length) {
          this.currentElementIndex++
          this.displayElement(this.playlist[this.currentElementIndex])
        }
      } else if (event.key == this.settings.shortcuts.playlistPrevious) {
        event.preventDefault()
        if (this.currentElementIndex > 0) {
          this.currentElementIndex--
          this.displayElement(this.playlist[this.currentElementIndex])
        }
      } else if (event.key == this.settings.shortcuts.scrollDown) {
        event.preventDefault()
        if (this.viewOpened) {
          this.$refs.liveWindow.scrollDown()
        }
      } else if (event.key == this.settings.shortcuts.scrollUp) {
        event.preventDefault()
        if (this.viewOpened) {
          this.$refs.liveWindow.scrollUp()
        }
      } else if (event.key == this.settings.shortcuts.partNext) {
        event.preventDefault()
        if (this.viewOpened && this.viewBody.type == "song") {
          this.$refs.liveWindow.scrollNextPart()
        }
      } else if (event.key == this.settings.shortcuts.partPrevious) {
        event.preventDefault()
        if (this.viewOpened && this.viewBody.type == "song") {
          this.$refs.liveWindow.scrollPreviousPart()
        }
      }
    },
    acceptSecli: function() {
      this.secliAccepted = true
      this.$cookies.set("secliAccepted", true, "30d")
    },
    isSafari: function() {
      var ua = navigator.userAgent.toLowerCase()
      if (ua.indexOf("safari") != -1) {
        if (ua.indexOf("chrome") > -1) {
          return false // Chrome
        } else {
          return true // Safari
        }
      }
      return false
    },
    changeMisselColor: function(newColor) {
      this.missel.forEach((element) => {
        this.$set(element, "text", element.text.replaceAll(/#....../g, newColor))
      })
    }
  },
  computed: {
    filteredSongs: function() {
      if (this.search == "") {
        return this.songs
      }
      return this.songs.filter((song) => {
        // normalise le terme recherché (sans accents, minuscule)
        return this.search
          .normalize("NFD")
          .replace(/[\u0300-\u036f,']/g, "")
          .toLowerCase()
          .split(" ")
          .every((s) => song.id.includes(s))
      })
    },
    filteredSongsItem() {
      return this.filteredSongs.length
    },
    filteredMissel: function() {
      if (this.searchMisselText == "") {
        return this.missel
      }
      return this.missel.filter((text) => {
        // normalise le terme recherché (sans accents, minuscule)
        return this.searchMisselText
          .normalize("NFD")
          .replace(/[\u0300-\u036f,']/g, "")
          .toLowerCase()
          .split(" ")
          .every((s) => text.id.includes(s))
      })
    },
    filteredMisselItem() {
      return this.filteredMissel.length
    }
  },
  beforeMount() {
    window.addEventListener("beforeunload", this.beforeClose)
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("beforeunload", this.beforeClose)
    })
  },
  mounted() {
    if (localStorage.getItem("settings")) {
      var localSettings = JSON.parse(localStorage.getItem("settings"))
      // pour forcer la mise à zéro des paramètres s'il y a des changements dans la structure
      if (localSettings.version && localSettings.version >= this.settings.version) {
        this.settings = localSettings
      } else {
        localStorage.setItem("settings", JSON.stringify(this.settings))
      }
    }
    if (localStorage.getItem("playlist")) {
      this.playlist = JSON.parse(localStorage.getItem("playlist"))
    }
    if (this.$cookies.isKey("secliAccepted")) {
      this.secliAccepted = this.$cookies.get("secliAccepted")
    }
  },
  created() {
    window.addEventListener("keydown", this.manageShortCuts)

    //tri et préparation de la liste des chants
    this.songs.forEach((song) => {
      this.$set(song, "type", "song")
      song.lyrics.forEach((lyrics) => {
        if (lyrics.type == "chorus" && lyrics.sticky == undefined) {
          this.$set(lyrics, "sticky", true)
        } else if ((lyrics.type == "verse" || lyrics.type == "translation") && lyrics.show == undefined) {
          this.$set(lyrics, "show", true)
        }
        if (lyrics.isActive == undefined) {
          this.$set(lyrics, "isActive", false)
        }
      })
    })
    this.songs.sort(function(a, b) {
      return a.id.localeCompare(b.id)
    })

    //tri et préparation du Missel
    this.missel.forEach((element) => {
      this.$set(element, "type", "text")
      this.$set(element, "isTitleDisplayed", false)
    })
    this.missel.sort(function(a, b) {
      return a.id.localeCompare(b.id)
    })
  },
  watch: {
    settings: {
      handler: function(newSettings) {
        localStorage.setItem("settings", JSON.stringify(newSettings))
      },
      deep: true
    },
    playlist: {
      handler: function(newPlaylist) {
        localStorage.setItem("playlist", JSON.stringify(newPlaylist.filter((element) => element.type != "file")))
      },
      deep: true
    }
  }
}
</script>

<style scoped src="./Manager.css"></style>

<!--
Available elements :
{
    type: empty | grid | song | text | file
    title: ""
}

{
    type: song
    title: ""
    rating: ""
    newrating: ""
    writer: ""
    publisher: ""
    composer: ""
    lyrics: [
        {
            type: verse | chorus | translation
            text: ""
            sticky: true | false (chorus)
            show: true | false (verse or translation)
            isActive: true | false
        },
        {...}
    ]
}

{
    type: text
    title: ""
    isTitleDisplayed: true | false
    text: ""
}

{
  type: file
  width:
}
-->
