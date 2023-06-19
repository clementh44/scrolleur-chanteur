<template>
  <div>
    <!-- Barre d'actions -->
    <b-badge variant="success">Nouveauté du 13/04</b-badge><small> export/import de la playlist ! | Import des textes de la liturgie de dimanche prochain (bouton Aelf)</small>
    <hr />
    <b-button-toolbar class="mb-3">
      <!-- Quadrillage -->
      <b-button-group class="mr-3">
        <b-button @click="display({ type: 'grid' })" variant="secondary" v-b-tooltip.hover.noninteractive title="Quadrillage d'aide au cadrage de la projection">
          <font-awesome-icon :icon="'border-all'"></font-awesome-icon>
        </b-button>
      </b-button-group>
      <!-- Ajouter... -->
      <b-button-group class="mr-3">
        <b-button variant="secondary" :pressed="false" aria-disabled="true" style="pointer-events: none"> Ajouter : </b-button>
        <b-button @click="addElement({ type: 'empty', title: '_vide_' })" variant="secondary" v-b-tooltip.hover.noninteractive title="Contenu vide">
          <font-awesome-icon :icon="['fa-regular', 'square']"></font-awesome-icon>
        </b-button>
        <b-button @click="insertEmptyTransition()" v-if="this.playlist.length > 0" variant="secondary" v-b-tooltip.hover.noninteractive title="Intercaler un élément vide entre chaque contenu">
          <font-awesome-icon :icon="['fa-regular', 'clone']"></font-awesome-icon>
        </b-button>
        <b-button @click="addElement({ type: 'text', title: 'Texte à personnaliser' })" variant="secondary" v-b-tooltip.hover.noninteractive title="Texte personnalisé">
          <font-awesome-layers>
            <font-awesome-icon icon="align-left" transform="left-2" />
            <font-awesome-icon icon="pen" transform="right-7" style="stroke: #6c757d; stroke-width: 40" />
          </font-awesome-layers>
        </b-button>
        <b-button @change="addFile($event)" variant="secondary" class="m-0" tag="label" for="input-file" v-b-tooltip.hover.noninteractive title="Importer une image"
          ><font-awesome-icon :icon="'image'"></font-awesome-icon> <input type="file" id="input-file" ref="input-file" hidden accept="image/gif,image/png,image/jpeg,image/bmp,image/webp"
        /></b-button>
        <b-dropdown id="aelf-dropdown">
          <template #button-content><img src="https://www.aelf.org/images/logo-aelf-2016.svg" alt="AELF" height="16px" /></template>
          <b-dropdown-text
            ><strong>Dimanche {{ this.nextSunday.text }}</strong></b-dropdown-text
          >
          <template v-if="this.aelf">
            <b-dropdown-text>{{ this.aelf.informations.jour_liturgique_nom }}</b-dropdown-text>
            <b-dropdown-group v-for="(messe, index) in this.aelf.messes" :key="index">
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-text>
                <strong
                  ><u>{{ messe.nom }}</u></strong
                >
              </b-dropdown-text>
              <b-dropdown-item @click="addElement({ type: 'text', title: messe.nom, text: getAelfMesse() })">
                <b-iconstack variant="success"><b-icon stacked icon="music-note-list" shift-h="-2"></b-icon><b-icon stacked icon="plus" scale="0.75" shift-h="8"></b-icon></b-iconstack> Insérer la
                référence de la messe
              </b-dropdown-item>
              <b-dropdown-group v-for="(lecture, indexx) in messe.lectures" :key="indexx">
                <b-dropdown-header>
                  {{ getAelfType(lecture.type) }}<template v-if="lecture.ref"> ({{ lecture.ref }})</template>
                </b-dropdown-header>
                <b-dropdown-item @click="addElement({ type: 'text', title: getAelfTitle(lecture, ' - Références'), text: getAelfRef(lecture) })">
                  <b-iconstack variant="success"><b-icon stacked icon="music-note-list" shift-h="-2"></b-icon><b-icon stacked icon="plus" scale="0.75" shift-h="8"></b-icon></b-iconstack> Insérer les
                  références
                </b-dropdown-item>
                <b-dropdown-item @click="addElement({ type: 'text', title: getAelfTitle(lecture, ' - Texte'), text: getAelfContenu(lecture) })">
                  <b-iconstack variant="success"><b-icon stacked icon="music-note-list" shift-h="-2"></b-icon><b-icon stacked icon="plus" scale="0.75" shift-h="8"></b-icon></b-iconstack> Insérer le
                  texte
                </b-dropdown-item>
                <b-dropdown-item
                  @click="
                    addElement({ type: 'text', title: getAelfTitle(lecture, ' - Texte + Références'), text: getAelfRef(lecture) + '<hr class=custom-horizontal-line>' + getAelfContenu(lecture) })
                  "
                >
                  <b-iconstack variant="success"><b-icon stacked icon="music-note-list" shift-h="-2"></b-icon><b-icon stacked icon="plus" scale="0.75" shift-h="8"></b-icon></b-iconstack> Insérer le
                  texte avec les références
                </b-dropdown-item>
              </b-dropdown-group>
            </b-dropdown-group>
          </template>
          <template v-else>
            <b-dropdown-divider></b-dropdown-divider>
            <a class="dropdown-item" @click.stop="downloadAelf()" href="#"><font-awesome-icon :icon="'cloud-arrow-down'"></font-awesome-icon> Charger les données depuis aelf.org</a>
          </template>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-text>Données venant de <a href="https://aelf.org" target="_blank">aelf.org</a></b-dropdown-text>
        </b-dropdown>
        <b-tooltip target="aelf-dropdown" noninteractive>Insérer des références et textes de dimanche prochain</b-tooltip>
      </b-button-group>
      <!-- Supprimer -->
      <b-button-group v-if="this.playlist.length > 0" class="mr-3">
        <b-button variant="danger" :pressed="false" aria-disabled="true" style="pointer-events: none"> Supprimer : </b-button>
        <b-button @click="cleanEmpty()" variant="danger" v-b-tooltip.hover.noninteractive title="Supprimer les éléments vides">
          <font-awesome-icon :icon="['fa-regular', 'clone']"></font-awesome-icon>
        </b-button>
        <b-button @click="clean()" variant="danger" v-b-tooltip.hover.noninteractive title="Vider la playlist">
          <font-awesome-icon :icon="'trash-can'"></font-awesome-icon>
        </b-button>
      </b-button-group>
      <!-- Import/Export -->
      <b-button-group class="mr-3">
        <b-button @click="exportPlaylist()" v-if="this.playlist.length > 0" v-b-tooltip.hover.noninteractive title="Exporter et télécharger la playlist">
          <font-awesome-icon :icon="'file-export'"></font-awesome-icon>
        </b-button>
        <b-button @change="importPlaylist($event)" variant="secondary" class="m-0" tag="label" for="import-playlist" v-b-tooltip.hover.noninteractive title="Importer des éléments dans la playlist">
          <font-awesome-icon :icon="'file-import'"></font-awesome-icon> <input type="file" id="import-playlist" ref="import-playlist" hidden accept=".scrolleurchanteur" />
        </b-button>
      </b-button-group>
      <!-- Paramètres -->
      <b-button-group>
        <b-button @click="$emit('toggle-param')" v-b-tooltip.hover.noninteractive title="Ouvrir/fermer les paramètres">
          <font-awesome-icon :icon="'sliders'"></font-awesome-icon>
        </b-button>
      </b-button-group>
    </b-button-toolbar>

    <!-- Editeur -->
    <transition name="edition">
      <b-card border-variant="secondary" class="d-flex mb-3" v-if="isEdited" ref="playlistEditionRef" no-body>
        <b-card-header header-tag="h5">Édition d'un élément</b-card-header>
        <b-card-body>
          <b-card-text>
            <b-form v-if="editedElement.type == 'text'">
              <b-form-group label="Titre">
                <b-form-input @keydown.stop v-model="editedElement.title"></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-form-checkbox v-model="editedElement.isTitleDisplayed" switch>Afficher le titre dans la présentation (<font-awesome-icon :icon="'desktop'"></font-awesome-icon>)</b-form-checkbox>
              </b-form-group>
              <b-form-group label="Corps du texte">
                <editor v-model="editedElement.text" />
              </b-form-group>
            </b-form>
            <b-form v-if="editedElement.type == 'file'">
              <b-form-group label="Largeur du fichier dans la présentation">
                <b-form-input aria-describedby="file-width-help" type="range" v-model="editedElement.width" min="10" max="200" step="1"></b-form-input>
                <b-form-text id="file-width-help">Le fichier prendra {{ editedElement.width }}% de la largeur de la présentation</b-form-text>
              </b-form-group>
            </b-form>
          </b-card-text>
        </b-card-body>
        <b-card-footer>
          <b-button @click="isEdited = false">Fermer</b-button>
        </b-card-footer>
      </b-card>
    </transition>

    <!-- Playlist vide -->
    <b-list-group>
      <b-list-group-item v-if="listLocal.length == 0">
        <strong>La playlist est vide</strong><br />
        Ci-dessus, ajoutez un texte personnalisé (<font-awesome-icon :icon="'align-left'"></font-awesome-icon>), une image (<font-awesome-icon :icon="'image'"></font-awesome-icon>) ou du vide
        (<font-awesome-icon :icon="['fa-regular', 'square']"></font-awesome-icon>).<br />
        Ci-dessous, recherchez et ajoutez un chant du répertoire (
        <b-iconstack variant="success"><b-icon stacked icon="music-note-list" shift-h="-2"></b-icon><b-icon stacked icon="plus" scale="0.75" shift-h="8"></b-icon></b-iconstack> ) pour acceder à plus
        de contrôles.<br />
        Rappel : laissez la souris sur un bouton pour avoir une description de son action.
      </b-list-group-item>
    </b-list-group>

    <!-- Playlist -->
    <draggable v-model="listLocal" handle=".handle" tag="b-list-group" @start="onStart" @end="onEnd" v-bind="dragOptions">
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <b-list-group-item v-for="(element, index) in listLocal" :key="index">
          <div class="d-flex w-100 justify-content-between align-items-center">
            <div v-if="index == currentElementIndex" class="current-element-icon" style="left: -4px" v-b-tooltip.hover.noninteractive title="Elément actuellement dans la présentation"></div>
            <div class="flex-grow-1"><span v-html="element.title"></span> <b-img v-if="element.type == 'file'" :src="element.file" alt="Miniature image" thumbnail rounded class="sc-file" /></div>

            <ElementActions
              :element="element"
              :settings="settings"
              @preview="preview($event)"
              @search-score="
                $emit('search-score', {
                  title: $event.title,
                  query: $event.query,
                })
              "
            >
              <template v-slot:first>
                <b-button variant="light" v-if="canEdit(element)" @click="edit(element)" v-b-tooltip.hover.noninteractive title="Editer l'élément">
                  <font-awesome-icon :icon="['fa-regular', 'edit']"></font-awesome-icon>
                </b-button>
              </template>
              <template v-slot:end>
                <b-button variant="light" @click="display(element, index)" v-b-tooltip.hover.noninteractive title="Afficher dans la fenêtre de présentation">
                  <font-awesome-icon :icon="'desktop'"></font-awesome-icon>
                </b-button>
                <b-button variant="light" class="handle" tag="i" v-b-tooltip.hover.noninteractive title="Déplacer l'élément">
                  <font-awesome-icon :icon="'up-down'"></font-awesome-icon>
                </b-button>
                <b-button variant="outline-danger" @click="removeAt(index)" v-b-tooltip.hover.noninteractive title="Supprimer l'élément de la playlist">
                  <font-awesome-icon :icon="'trash-can'"></font-awesome-icon>
                </b-button>
              </template>
            </ElementActions>
          </div>
          <div v-if="index == currentElementIndex && element.type == 'song'" class="d-flex flex-wrap mt-1">
            <div class="p-2 border d-flex align-items-center lyrics-part-block" v-for="(lyricsBlock, index) in element.lyrics" :key="index">
              <div v-if="lyricsBlock.isActive" class="current-element-icon" style="left: 1px" v-b-tooltip.hover.noninteractive title="Partie visible dans la présentation"></div>
              <div :class="['text-truncate', 'flex-grow-1', lyricsBlock.type == 'chorus' ? 'font-weight-bold' : '']" style="height: 1.5rem" v-html="lyricsBlock.text"></div>
              <b-button-group>
                <b-button
                  v-if="lyricsBlock.type == 'verse' || lyricsBlock.type == 'translation' || lyricsBlock.type == 'chorus'"
                  variant="light"
                  class="no-focus"
                  @click="$emit('display-and-scroll', { pos: index })"
                  v-b-tooltip.hover.noninteractive
                  title="Afficher cet élément et cacher le reste"
                >
                  <font-awesome-layers>
                    <font-awesome-icon :icon="'angles-down'" transform="left-5 up-4 shrink-2"></font-awesome-icon>
                    <font-awesome-icon :icon="['fa-regular', 'eye']" transform="right-4 down-4 shrink-2"></font-awesome-icon>
                  </font-awesome-layers>
                </b-button>
                <b-button variant="light" class="no-focus" @click="$emit('scroll-to-pos', { pos: index })" v-b-tooltip.hover.noninteractive title="Afficher l'élément dans la présentation">
                  <font-awesome-icon :icon="'angles-down'"></font-awesome-icon>
                </b-button>
                <b-button
                  variant="light"
                  class="no-focus"
                  :class="{ active: lyricsBlock.sticky }"
                  v-if="lyricsBlock.type == 'chorus'"
                  @click="lyricsBlock.sticky = !lyricsBlock.sticky"
                  v-b-tooltip.hover.noninteractive
                  title="Accrocher/Décrocher ce refrain en haut de la présentation"
                >
                  <font-awesome-icon :icon="'thumbtack'"></font-awesome-icon>
                </b-button>
                <b-button
                  variant="light"
                  class="no-focus"
                  :class="{ active: !lyricsBlock.show }"
                  v-if="lyricsBlock.type == 'verse' || lyricsBlock.type == 'translation' || lyricsBlock.type == 'chorus'"
                  @click="lyricsBlock.show = !lyricsBlock.show"
                  v-b-tooltip.hover.noninteractive
                  title="Cacher/Afficher ce couplet ou refrain"
                >
                  <font-awesome-icon :icon="['fa-regular', 'eye-slash']"></font-awesome-icon>
                </b-button>
              </b-button-group>
            </div>
          </div>
        </b-list-group-item>
      </transition-group>
    </draggable>

    <!-- Composant pour annuler la suppression d'un élément -->
    <Undo ref="deleteElement" @restoreElement="addElement($event)"></Undo>
  </div>
</template>

<script>
import draggable from "vuedraggable"
import ElementActions from "./ElementActions"
import Undo from "./Undo"
import Editor from "./Editor.vue"
import axios from "axios"

export default {
  name: "Playlist",
  data: function () {
    return {
      editableTypes: ["text", "file"],
      isEdited: false,
      editedElement: null,
      savedCurrentElementIndex: -1,
      drag: false,
      nextSunday: {
        yyyy: "",
        text: "",
        date: null,
      },
      aelf: null,
    }
  },
  props: {
    playlist: Array,
    settings: Object,
    currentElementIndex: Number,
  },
  model: {
    prop: "playlist",
    event: "listChange",
  },
  components: {
    draggable,
    ElementActions,
    Undo,
    Editor,
  },
  computed: {
    listLocal: {
      get: function () {
        return this.playlist
      },
      set: function (value) {
        this.$emit("listChange", value)
      },
    },
    dragOptions: function () {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      }
    },
  },
  methods: {
    updateCurrentElementIndex: function (newIndex) {
      this.$emit("update-current-element-index", newIndex)
    },

    display: function (element, index) {
      this.$emit("display", element, index)
    },
    preview: function (element) {
      this.$emit("preview", element)
    },

    removeAt: function (index) {
      if (index == this.currentElementIndex) {
        //si élément suppr est l'actuel
        this.display({ type: "empty" })
        this.updateCurrentElementIndex(-1)
      } else if (index < this.currentElementIndex) {
        //si élément suppr est avant l'actuel
        this.updateCurrentElementIndex(this.currentElementIndex - 1)
      }

      var element = this.playlist.splice(index, 1)[0]
      if (element.type != "empty") {
        this.$refs.deleteElement.addElement(element, element.title)
      }
    },
    addElement: function (element) {
      this.playlist.push(element)
    },
    insertEmptyTransition: function () {
      //intercaler un élément vide entre les autres éléments pour faire des transitions contenu>vide>contenu>vide etc...
      if (this.playlist.length > 0) {
        for (let index = 0; index < this.playlist.length; index++) {
          if (index % 2 == 0) {
            if (this.playlist[index].type != "empty") {
              this.playlist.splice(index, 0, { type: "empty", title: "_vide_" })
            }
          } else {
            if (this.playlist[index].type == "empty") {
              this.playlist.splice(index, 1)
            }
          }
        }
        if (this.playlist[this.playlist.length - 1].type != "empty") {
          this.addElement({ type: "empty", title: "_vide_" })
        }
      }
    },
    //vider la playlist
    clean: function () {
      for (let index = this.playlist.length - 1; index >= 0; index--) {
        this.removeAt(index)
      }
    },
    //supprimer les éléments vides
    cleanEmpty: function () {
      for (let index = this.playlist.length - 1; index >= 0; index--) {
        if (this.playlist[index].type == "empty") {
          this.removeAt(index)
        }
      }
    },

    //gestion du déplacement d'un élément
    onStart: function () {
      this.drag = true
      this.savedCurrentElementIndex = this.currentElementIndex
      this.updateCurrentElementIndex(-1)
    },
    onEnd: function (evt) {
      this.drag = false
      if (evt.oldIndex == this.savedCurrentElementIndex) {
        this.updateCurrentElementIndex(evt.newIndex)
      } else if (evt.oldIndex < this.savedCurrentElementIndex && evt.newIndex >= this.savedCurrentElementIndex) {
        this.updateCurrentElementIndex(this.savedCurrentElementIndex - 1)
      } else if (evt.oldIndex > this.savedCurrentElementIndex && evt.newIndex <= this.savedCurrentElementIndex) {
        this.updateCurrentElementIndex(this.savedCurrentElementIndex + 1)
      } else {
        this.updateCurrentElementIndex(this.savedCurrentElementIndex)
      }
    },

    canEdit: function (element) {
      if (this.editableTypes.includes(element.type)) {
        element.isEdited = false
        return true
      }
      return false
    },
    edit: function (element) {
      this.editedElement = element
      this.isEdited = true
      setTimeout(() => {
        this.$refs["playlistEditionRef"].scrollIntoView({ behavior: "smooth" })
      }, 100)
    },

    addFile: function (file) {
      if (file.target.files && file.target.files[0]) {
        var fr = new FileReader()
        fr.onload = () => {
          this.addElement({
            type: "file",
            title: "Fichier : " + file.target.files[0].name,
            file: fr.result,
            width: 100,
          })
          this.$refs["input-file"].value = null
        }
        fr.readAsDataURL(file.target.files[0])
      }
    },

    //Import-Export de la playlist pour la partager facilement
    exportPlaylist: function () {
      let blob = new Blob([JSON.stringify(this.playlist)], { type: "application/json" })
      let link = document.createElement("a")
      link.href = window.URL.createObjectURL(blob)
      link.download = "playlist.scrolleurchanteur"
      link.click()
    },
    importPlaylist: function (file) {
      if (file.target.files && file.target.files[0]) {
        var fr = new FileReader()
        fr.onload = () => {
          for (const element of JSON.parse(fr.result)) {
            this.addElement(element)
          }
          this.$refs["import-playlist"].value = null
        }
        fr.readAsText(file.target.files[0])
      }
    },
    //AELF - Téléchargement des textes AELF
    downloadAelf: function () {
      axios.get(`https://api.aelf.org/v1/messes/${this.nextSunday.yyyy}/france`).then((response) => (this.aelf = response.data))
    },
    getAelfMesse: function () {
      return `<h2 class="custom-heading" style="text-align: center">Dimanche ${this.nextSunday.date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}</h2><h1 class="custom-heading" style="text-align: center">${this.aelf.informations.jour_liturgique_nom}</h1>`
    },
    //AELF - Formatage du type
    getAelfType: function (type) {
      switch (type) {
        case "lecture_1":
          return "Première lecture"
        case "lecture_2":
          return "Deuxième lecture"
        case "lecture_3":
          return "Troisième lecture"
        case "lecture_4":
          return "Quatrième lecture"
        case "lecture_5":
          return "Cinquième lecture"
        case "lecture_6":
          return "Sixième lecture"
        case "lecture_7":
          return "Septième lecture"
        case "psaume":
          return "Psaume"
        case "cantique":
          return "Cantique"
        case "epitre":
          return "Épître"
        case "evangile":
          return "Évangile"
        case "sequence":
          return "Séquence"
      }
    },
    //AELF - formatage du titre pour l'élément dans la playlist
    getAelfTitle: function (lecture, custom) {
      var result = this.getAelfType(lecture.type)
      if (lecture.ref) {
        result += ` (${lecture.ref})`
      }
      result += custom
      return result
    },
    //AELF - formatage de l'en-tête de la lecture
    getAelfRef: function (lecture) {
      var result = `<h1 class="custom-heading">${this.getAelfType(lecture.type)}</h1>`
      if (lecture.intro_lue) {
        result += `<strong>${lecture.intro_lue} (${lecture.ref})</strong>`
      } else if (lecture.ref) {
        result += `<strong>${lecture.ref}</strong>`
      }
      if (lecture.titre) {
        result += "<br> " + lecture.titre
      }
      return result
    },
    //AELF - suppression des retours à la ligne en trop et de la fin "ou lecture breve"
    getAelfContenu: function (lecture) {
      var result = ""
      if (lecture.type == "psaume" || lecture.type == "cantique") {
        result += `<h3>${lecture.refrain_psalmique.replaceAll("<br />\n", "<br>").replaceAll("<p><em>OU BIEN</em></p>", "")}</h3>`
      }
      result += lecture.contenu.replaceAll("<br />\n", "<br>").replaceAll("</p>\n\n<p>", "</p><p>").replaceAll("<p>OU LECTURE BREVE</p>", "")
      return result
    },
  },
  mounted() {
    //AELF - Récupération des données de AELF France https://api.aelf.org
    var curr = new Date()
    var sunday = curr.getDay() == 0 ? curr : new Date(curr.setDate(curr.getDate() - curr.getDay() + 7)) //jour du mois - jour de la semaine + 7 ; jour de la semaine de dimanche 0 à samedi 6
    this.nextSunday = {
      yyyy: `${sunday.getFullYear()}-${String(sunday.getMonth() + 1).padStart(2, "0")}-${String(sunday.getDate()).padStart(2, "0")}`,
      text: sunday.toLocaleDateString(),
      date: sunday,
    }
  },
}
</script>

<style scoped src="./Playlist.css"></style>
