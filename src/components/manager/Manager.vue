<template>
  <div class="container-xl">
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <a class="navbar-brand" href="#">Scrolleur-chanteur</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li :class="['nav-item', viewOpened ? 'active' : '']">
            <a class="nav-link" href="#" @click="toggleView" title="Ouvrir/fermer la fenêtre de présentation"><font-awesome-icon :icon="'desktop'"></font-awesome-icon> Présentation</a>
          </li>
          <li :class="['nav-item', previewOpened ? 'active' : '']">
            <a class="nav-link" href="#" @click="togglePreview" title="Ouvrir/fermer l'aperçu d'un élément"><font-awesome-icon :icon="'eye'"></font-awesome-icon> Aperçu</a>
          </li>
          <li :class="['nav-item', paramOpened ? 'active' : '']">
            <a class="nav-link" href="#" @click="toggleParam" title="Ouvrir/fermer les paramètres"><font-awesome-icon :icon="'sliders-h'"></font-awesome-icon> Paramètres</a>
          </li>
          <li :class="['nav-item', settings.help ? 'active' : '']">
            <a class="nav-link" href="#" @click="settings.help = !settings.help" title="Ouvrir/fermer l'aide'"><font-awesome-icon :icon="'question-circle'"></font-awesome-icon> Aide</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="row">
      <!-- Fenêtre de présentation -->
      <WindowPortal
        v-model="viewOpened"
        ref="liveWindow"
        v-on:shortcuts="manageShortCuts"
        v-on:close="liveClosing"
        :width="settings.liveView.window.width"
        :height="settings.liveView.window.height"
        @custom-scroll="handleScroll"
      >
        <ViewWindow :element="viewBody" :settings="settings" :live="true" :duration="500"></ViewWindow>
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
        <!-- Termes à accepter -->
        <template v-if="!secliAccepted">
          <div class="alert alert-warning fade show mt-3" role="alert">
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
            <button type="button" class="btn btn-primary" @click="acceptSecli">
              Je comprends et accepte ces termes
            </button>
          </div>
        </template>

        <!-- Aide -->
        <div class="alert alert-success alert-dismissible fade show mt-3" role="alert" v-if="settings.help">
          <strong>Bienvenue dans cette version {{ version }} du <a href="https://github.com/clementh44/scrolleur-chanteur" target="_blank" rel="noopener">Scrolleur-Chanteur</a></strong>
          <button type="button" class="close" aria-label="Close" @click="settings.help = false">
            <span aria-hidden="true">&times;</span>
          </button>
          <p>
            Cette version permet de ne rien installer, il suffit de charger cette page quand on a internet et de ne pas la fermer ou l'actualiser pour s'en servir.
          </p>
          <hr />
          <p>
            Ici, c'est la page de gestion de la projection. Cliquez sur
            <em><font-awesome-icon :icon="'desktop'"></font-awesome-icon> Présentation</em>
            pour afficher la fenêtre de présentation (à mettre sur le vidéo-projecteur. Appuyez sur F11 pour mettre en plein écran).
          </p>
          <p>
            Pour afficher un chant, il suffit d'appuyer sur
            <font-awesome-icon :icon="'desktop'"></font-awesome-icon>.
          </p>
          <p>
            La <strong>Playlist</strong> permet de préparer une liste avec : des chants (ajouter avec <font-awesome-icon :icon="'plus'"></font-awesome-icon> depuis le <strong>Répertoire</strong>) ; un
            contenu vide (avec <font-awesome-icon :icon="['far', 'square']"></font-awesome-icon>) ; un texte personnalisé (avec <font-awesome-icon :icon="'align-left'"></font-awesome-icon>) ; une
            image (avec <font-awesome-icon :icon="'image'"></font-awesome-icon>).
          </p>
          <p>
            Les paramètres et la playlist (sauf les images) sont automatiquement sauvegardés dans le navigateur.<br />Vous pouvez changer les <strong>raccourcis clavier</strong> pour contrôler la
            présentation avec le clavier.
          </p>
          <p>
            Contact, chant manquant, idée, question... écrivez-moi via
            <a href="https://forms.gle/NtKpdCazNs9N4NY88" target="_blank" rel="noopener">ce formulaire</a>.
          </p>
          <p>
            <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=8C9QSKX238UGU&item_name=Soutenir+le+d%C3%A9veloppement+du+projet&currency_code=EUR" target="_blank" rel="noopener"
              >Soutenir le projet</a
            >.
          </p>
          <p> <a href="https://docs.google.com/document/d/19MGTOyoW13iaYUX2HcndmDFgLGre_xvMk36dkwvqBm4/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Documentation détaillée</a>. </p>
        </div>

        <!-- Playlist -->
        <div class="card mb-3">
          <a id="playlist-header" class="text-decoration-none" data-toggle="collapse" href="#collapse-playlist" aria-expanded="true" aria-controls="collapse-playlist">
            <h3 class="card-header d-flex justify-content-between">
              Playlist
              <font-awesome-icon class="pull-right" :icon="'chevron-down'"></font-awesome-icon>
            </h3>
          </a>
          <div id="collapse-playlist" class="card-body collapse show" aria-labelledby="playlist-header">
            <Playlist
              ref="playlist"
              v-model="playlist"
              v-on:display="displayElement"
              v-on:preview="previewElement"
              :settings="settings"
              :current-element-index="currentElementIndex"
              v-on:update-current-element-index="currentElementIndex = $event"
              v-on:search-score="searchScore($event.title, $event.query)"
              v-on:scroll-to-pos="scrollViewToPos($event.pos)"
            ></Playlist>
          </div>
        </div>

        <!-- Répertoire -->
        <div class="card mb-3">
          <a id="repertory-header" class="text-decoration-none" data-toggle="collapse" href="#collapse-repertory" aria-expanded="true" aria-controls="collapse-repertory">
            <h3 class="card-header d-flex justify-content-between">
              Répertoire
              <font-awesome-icon class="pull-right" :icon="'chevron-down'"></font-awesome-icon>
            </h3>
          </a>
          <div id="collapse-repertory" class="card-body collapse show" aria-labelledby="repertory-header">
            <div class="form-group">
              <label for="searchInput">Rechercher parmis les {{ songs.length }} chants</label>
              <div class="input-group">
                <input @keydown.stop type="text" id="searchInput" class="form-control" placeholder="Rechercher un titre..." v-debounce="searchSong" @click="$event.target.select()" />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" @click="searchScore(search, settings.score.google)" title="Rechercher le titre sur google">
                    <font-awesome-icon :icon="['fab', 'google']"></font-awesome-icon>
                  </button>
                </div>
              </div>
            </div>
            <ul class="list-group">
              <li :key="index" v-for="(song, index) in filteredSongs" class="list-group-item d-flex align-items-center">
                <div class="flex-grow-1">{{ song.title }}</div>
                <ElementActions :element="Object.assign({ type: 'song' }, song)" :settings="settings" @preview="previewElement($event)" @search-score="searchScore($event.title, $event.query)">
                  <template v-slot:end>
                    <button class="btn btn-light" @click="addSong(song)" title="Ajouter dans la playlist">
                      <font-awesome-icon :icon="'plus'"></font-awesome-icon>
                    </button>
                    <router-link :to="{ name: 'song', params: { id: song.id }}" target="_blank" class="btn btn-light" title="Ouvrir les paroles dans une fenêtre externe">
                      <font-awesome-icon :icon="'external-link-alt'"></font-awesome-icon>
                    </router-link>
                  </template>
                </ElementActions>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chants from "../../chants.json"
import WindowPortal from "../WindowPortal"
import ViewWindow from "../view/ViewWindow"
import SideBox from "../sideBox/SideBox"
import Playlist from "./Playlist"
import Settings from "./Settings"
import ElementActions from "./ElementActions"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faSquare } from "@fortawesome/free-regular-svg-icons"
import { faPlus, faDesktop, faSlidersH, faChevronDown, faFileAlt, faImage, faQuestionCircle, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"

library.add(faSquare, faPlus, faDesktop, faSlidersH, faChevronDown, faFileAlt, faImage, faQuestionCircle, faExternalLinkAlt, faGoogle)

export default {
  name: "Manager",
  data() {
    return {
      version: process.env.VUE_APP_VERSION,
      songs: Chants,
      secliAccepted: false,
      currentElementIndex: -1,
      viewBody: { type: "empty" },
      viewOpened: false,
      playlist: [],
      search: "",
      paramOpened: false,
      settings: {
        version: 20210103, // à incrémenter s'il y a des changements dans la structure des paramètres et forcer la ràz des paramètres sauvegardés dans le navigateur
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
            background: "#FFFFFF",
            text: "#000000",
            empty: "#FFFFFF"
          },
          padding: 0,
          fontSize: 1,
          window: {
            height: 400,
            width: 600
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
        setTimeout(() => this.handleScroll(this.$refs.liveWindow.$el.ownerDocument.defaultView), 100)
      }, 500)
      if (!this.viewOpened) {
        this.toggleView()
      }
    },
    liveClosing: function() {
      this.currentElementIndex = -1
    },
    /* Scroll to the position in the song */
    scrollViewToPos: function(pos) {
      if (this.viewBody.type == "song") {
        let DOMelements = this.$refs.liveWindow.$el.getElementsByClassName("song-part") //liste des blocs (verse, chorus, translation)
        if (pos < 0 || pos > DOMelements.length) {
          console.warn("I'm not suppose to be here...")
          return
        }

        //hauteur de l'élément sticky (chorus) qui est plus haut
        let getLastStickyHeight = (pos, DOMelements) => {
          let stickyHeight = 0
          let searchSticky = pos
          while (searchSticky >= 0) {
            let lyrics = this.viewBody.lyrics[searchSticky]
            if (lyrics.type == "chorus" && lyrics.sticky) {
              let stickyElement = DOMelements[searchSticky]
              if (stickyElement.offsetHeight > this.$refs.liveWindow.$el.ownerDocument.defaultView.innerHeight) {
                this.viewBody.lyrics[searchSticky].sticky = false //on détache le chorus (sticky=false) si sa hauteur dépasse la hauteur de la fenêtre
              } else {
                stickyHeight = stickyElement.offsetHeight
              }
              searchSticky = 0 //pour sortir de la boucle
            }
            searchSticky--
          }
          return stickyHeight
        }

        let stickyHeight = 0 //hauteur de l'élément sticky (chorus) qui est plus haut
        let scrollHeight = 0 //hauteur du scroll

        if (pos == DOMelements.length) {
          //si on est au bout du contenu > afficher uniquement le dernier élément sticky ou afficher le vide
          if (DOMelements[pos - 1].classList.contains("chorus")) {
            //si le dernier élément est un chorus > vide
            scrollHeight = DOMelements[pos - 1].offsetTop + DOMelements[pos - 1].offsetHeight
          } else {
            //sinon, on récupère le dernier sticky
            scrollHeight = DOMelements[pos - 1].offsetTop + DOMelements[pos - 1].offsetHeight - getLastStickyHeight(pos - 1, DOMelements)
          }
        } else {
          if (!DOMelements[pos].classList.contains("chorus")) {
            //récupération de l'hauteur de l'element sticky plus haut
            stickyHeight = getLastStickyHeight(pos - 1, DOMelements)
          }
          scrollHeight = DOMelements[pos].offsetTop - stickyHeight
        }
        this.$refs.liveWindow.$el.parentNode.scrollTo({
          top: scrollHeight,
          left: 0,
          behavior: "smooth"
        })
      } else {
        console.warn("scrollViewToPos function : the element has to be a song")
      }
    },
    handleScroll(view) {
      this.$refs.playlist.handleScroll(view)
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
    addSong: function(song) {
      if (!this.playlist.find((element) => element.id == song.id)) {
        this.playlist.push(song)
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
          this.scrollViewToPos(this.$refs.playlist.getNextPartIndex())
        }
      } else if (event.key == this.settings.shortcuts.partPrevious) {
        event.preventDefault()
        if (this.viewOpened && this.viewBody.type == "song") {
          this.scrollViewToPos(this.$refs.playlist.getPreviousPartIndex())
        }
      }
    },
    acceptSecli: function() {
      this.secliAccepted = true
      this.$cookies.set("secliAccepted", true, "30d")
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
  },
  watch: {
    settings: {
      handler: function(newSettings) {
        localStorage.setItem("settings", JSON.stringify(newSettings))
      },
      deep: true
    },
    playlist: function(newPlaylist) {
      localStorage.setItem("playlist", JSON.stringify(newPlaylist.filter((element) => element.type != "file")))
    }
  }
}
</script>

<style scoped src="./Manager.css"></style>

<!--
Available elements :
{
    type: empty | grid | song | text
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
-->
