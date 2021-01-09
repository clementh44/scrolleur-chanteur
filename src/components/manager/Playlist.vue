<template>
  <div>
    <div class="btn-toolbar mb-3">
      <div class="btn-group mr-3">
        <button
          @click="display({ type: 'grid' })"
          type="button"
          class="btn btn-secondary"
          title="Quadrillage d'aide au cadrage de la projection"
        >
          <font-awesome-icon :icon="'border-all'"></font-awesome-icon>
        </button>
      </div>
      <div class="btn-group mr-3">
        <div
          class="btn btn-secondary"
          aria-disabled="true"
          style="pointer-events: none;"
        >
          Ajouter :
        </div>
        <button
          @click="addElement({ type: 'empty', title: '_vide_' })"
          type="button"
          class="btn btn-secondary"
          title="Contenu vide"
        >
          <font-awesome-icon :icon="['far', 'square']"></font-awesome-icon>
        </button>
        <button
          @click="insertEmptyTransition()"
          v-if="this.playlist.length > 0"
          type="button"
          class="btn btn-secondary"
          title="Intercaler un élément vide entre chaque contenu"
        >
          <font-awesome-icon :icon="['far', 'clone']"></font-awesome-icon>
        </button>
        <button
          @click="addElement({ type: 'text', title: 'Texte à personnaliser' })"
          type="button"
          class="btn btn-secondary"
          title="Texte personnalisé"
        >
          <font-awesome-icon :icon="'align-left'"></font-awesome-icon>
        </button>
        <label
          @change="addFile($event)"
          class="btn btn-secondary m-0"
          for="input-file"
          title="Importer une image"
          ><font-awesome-icon :icon="'image'"></font-awesome-icon>
          <input
            type="file"
            id="input-file"
            hidden
            accept="image/gif,image/png,image/jpeg,image/bmp,image/webp"
        /></label>
      </div>
      <div class="btn-group" v-if="this.playlist.length > 0">
        <button
          @click="clean()"
          type="button"
          class="btn btn-danger"
          title="Vider la playlist"
        >
          <font-awesome-icon :icon="'trash-alt'"></font-awesome-icon>
        </button>
      </div>
    </div>

    <transition name="edition">
      <div
        class="d-flex card border-secondary mb-3"
        v-if="isEdited"
        ref="playlistEditionRef"
      >
        <h5 class="card-header">Édition d'un élément</h5>
        <div class="card-body">
          <div class="card-text">
            <form v-if="editedElement.type == 'text'">
              <div class="form-group">
                <label for="custom-text-title">Titre</label>
                <input
                  @keydown.stop
                  class="form-control"
                  id="custom-text-title"
                  type="text"
                  name="title"
                  v-model="editedElement.title"
                />
              </div>
              <div class="custom-control custom-switch form-group">
                <input
                  class="custom-control-input"
                  type="checkbox"
                  name="isTitleDisplayed"
                  id="title-displayed-checkbox"
                  v-model="editedElement.isTitleDisplayed"
                />
                <label
                  class="custom-control-label"
                  for="title-displayed-checkbox"
                  >Afficher le titre dans la présentation (<font-awesome-icon
                    :icon="'desktop'"
                  ></font-awesome-icon
                  >)</label
                >
              </div>
              <div class="form-group">
                <label for="custom-text-body">Corps du texte</label>
                <textarea
                  @keydown.stop
                  class="form-control"
                  id="custom-text-body"
                  name="content"
                  rows="10"
                  v-model="editedElement.text"
                ></textarea>
              </div>
            </form>
            <form v-if="editedElement.type == 'file'">
              <div class="form-group">
                <label for="file-width"
                  >Largeur du fichier dans la présentation</label
                >
                <input
                  aria-describedby="file-width-help"
                  type="range"
                  v-model="editedElement.width"
                  id="file-width"
                  class="form-control-range"
                  min="10"
                  max="200"
                  step="1"
                />
                <small id="file-width-help" class="form-text text-muted"
                  >Le fichier prendra {{ editedElement.width }}% de la largeur
                  de la présentation</small
                >
              </div>
            </form>
          </div>
        </div>
        <div class="card-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="isEdited = false"
          >
            Fermer
          </button>
        </div>
      </div>
    </transition>

    <ul class="list-group">
      <li class="list-group-item" v-if="listLocal.length == 0">
        <strong>La playlist est vide</strong><br />
        Ci-dessus, ajoutez un texte personnalisé (<font-awesome-icon
          :icon="'align-left'"
        ></font-awesome-icon
        >), une image (<font-awesome-icon :icon="'image'"></font-awesome-icon>) ou
        du vide (<font-awesome-icon :icon="['far', 'square']"></font-awesome-icon
        >).<br />
        Ci-dessous, recherchez et ajoutez un chant du répertoire
        (<font-awesome-icon :icon="'plus'"></font-awesome-icon>) pour acceder à
        plus de contrôles.<br />
        Rappel : laissez la souris sur un bouton pour avoir une description de son
        action.
      </li>
    </ul>

    <draggable
      v-model="listLocal"
      handle=".handle"
      tag="ul"
      @start="onStart"
      @end="onEnd"
      class="list-group"
    >
      <li
        v-for="(element, index) in listLocal"
        :key="index"
        class="list-group-item"
      >
        <div class="d-flex align-items-center">
          <div
            v-if="index == currentElementIndex"
            class="current-element-icon"
            style="left:-4px;"
            title="Elément actuellement dans la présentation"
          ></div>
          <div class="flex-grow-1">{{ element.title }}</div>

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
              <button
                class="btn btn-light"
                v-if="canEdit(element)"
                @click="edit(element)"
                title="Editer l'élément"
              >
                <font-awesome-icon :icon="['far', 'edit']"></font-awesome-icon>
              </button>
            </template>
            <template v-slot:end>
              <button
                class="btn btn-light"
                @click="display(element, index)"
                title="Afficher dans la fenêtre de présentation"
              >
                <font-awesome-icon :icon="'desktop'"></font-awesome-icon>
              </button>
              <button
                class="btn btn-light handle"
                title="Déplacer l'élément"
              >
                <font-awesome-icon :icon="'arrows-alt-v'"></font-awesome-icon>
              </button>
              <button
                class="btn btn-light"
                @click="removeAt(index)"
                title="Supprimer l'élément de la playlist"
              >
                <font-awesome-icon :icon="'trash-alt'"></font-awesome-icon>
              </button>
            </template>
          </ElementActions>
        </div>
        <ul
          v-if="index == currentElementIndex && element.type == 'song'"
          class="d-flex flex-wrap mt-1"
        >
          <div
            class="p-2 border d-flex align-items-center lyrics-part-block"
            v-for="(lyricsBlock, index) in element.lyrics"
            :key="index"
          >
            <div
              v-if="lyricsBlock.isActive"
              class="current-element-icon"
              style="left:1px;"
              title="Partie visible dans la présentation"
            ></div>
            <div
              :class="[
                'text-truncate',
                'flex-grow-1',
                lyricsBlock.type == 'chorus' ? 'font-weight-bold' : '',
              ]"
              :title="lyricsBlock.text"
            >
              {{ lyricsBlock.text }}
            </div>
            <div class="btn-group">
              <button
                class="btn btn-light no-focus"
                @click="$emit('scroll-to-pos', { pos: index })"
                title="Afficher l'élément dans la présentation"
              >
                <font-awesome-icon
                  :icon="'angle-double-down'"
                ></font-awesome-icon>
              </button>
              <button
                class="btn btn-light no-focus"
                :class="{ active: lyricsBlock.sticky }"
                v-if="lyricsBlock.type == 'chorus'"
                @click="lyricsBlock.sticky = !lyricsBlock.sticky"
                title="Accrocher ce refrain en haut de la présentation"
              >
                <font-awesome-icon :icon="'thumbtack'"></font-awesome-icon>
              </button>
              <button
                class="btn btn-light no-focus"
                :class="{ active: !lyricsBlock.show }"
                v-if="
                  lyricsBlock.type == 'verse' ||
                    lyricsBlock.type == 'translation'
                "
                @click="lyricsBlock.show = !lyricsBlock.show"
                title="Cacher ce couplet"
              >
                <font-awesome-icon
                  :icon="['far', 'eye-slash']"
                ></font-awesome-icon>
              </button>
            </div>
          </div>
        </ul>
      </li>
    </draggable>

    <Undo ref="deleteElement" @restoreElement="addElement($event)"></Undo>
  </div>
</template>

<script>
import draggable from "vuedraggable"
import ElementActions from "./ElementActions"
import Undo from "./Undo"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faSquare,
  faEdit,
  faClone,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons"
import {
  faArrowsAltV,
  faBorderAll,
  faTrashAlt,
  faAlignLeft,
  faImage,
  faAngleDoubleDown,
  faThumbtack,
  faPlus,
} from "@fortawesome/free-solid-svg-icons"

library.add(
  faSquare,
  faEdit,
  faClone,
  faEyeSlash,
  faArrowsAltV,
  faBorderAll,
  faTrashAlt,
  faAlignLeft,
  faImage,
  faAngleDoubleDown,
  faThumbtack,
  faPlus
)

export default {
  name: "Playlist",
  data: function() {
    return {
      editableTypes: ["text", "file"],
      isEdited: false,
      editedElement: null,
      savedCurrentElementIndex: -1,
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
  },
  computed: {
    listLocal: {
      get: function() {
        return this.playlist
      },
      set: function(value) {
        this.$emit("listChange", value)
      },
    },
  },
  methods: {
    updateCurrentElementIndex(newIndex) {
      this.$emit("update-current-element-index", newIndex)
    },

    display(element, index) {
      this.$emit("display", element, index)
    },
    preview(element) {
      this.$emit("preview", element)
    },

    removeAt(index) {
      if (index == this.currentElementIndex) {
        //si élément suppr est l'actuel
        this.display({ type: "empty" })
        this.updateCurrentElementIndex(-1)
      } else if (index < this.currentElementIndex) {
        //si élément suppr est avant l'actuel
        this.updateCurrentElementIndex(this.currentElementIndex - 1)
      }

      var element = this.playlist.splice(index, 1)[0]
      this.$refs.deleteElement.addElement(element, element.title)
    },
    addElement(element) {
      this.playlist.push(element)
    },
    insertEmptyTransition() {
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
    clean() {
      //vider la playlist
      for (let index = this.playlist.length - 1; index >= 0; index--) {
        this.removeAt(index)
      }
    },

    //gestion du déplacement d'un élément
    onStart() {
      this.savedCurrentElementIndex = this.currentElementIndex
      this.updateCurrentElementIndex(-1)
    },
    onEnd(evt) {
      if (evt.oldIndex == this.savedCurrentElementIndex) {
        this.updateCurrentElementIndex(evt.newIndex)
      } else if (
        evt.oldIndex < this.savedCurrentElementIndex &&
        evt.newIndex >= this.savedCurrentElementIndex
      ) {
        this.updateCurrentElementIndex(this.savedCurrentElementIndex - 1)
      } else if (
        evt.oldIndex > this.savedCurrentElementIndex &&
        evt.newIndex <= this.savedCurrentElementIndex
      ) {
        this.updateCurrentElementIndex(this.savedCurrentElementIndex + 1)
      } else {
        this.updateCurrentElementIndex(this.savedCurrentElementIndex)
      }
    },

    canEdit(element) {
      if (this.editableTypes.includes(element.type)) {
        element.isEdited = false
        return true
      }
      return false
    },
    edit(element) {
      this.editedElement = element
      this.isEdited = true
      setTimeout(() => {
        this.$refs["playlistEditionRef"].scrollIntoView({ behavior: "smooth" })
      }, 100)
    },

    addFile(file) {
      if (file.target.files && file.target.files[0]) {
        var fr = new FileReader()
        fr.onload = () => {
          this.addElement({
            type: "file",
            title: "Fichier : " + file.target.files[0].name,
            file: fr.result,
            width: 100,
          })
        }
        fr.readAsDataURL(file.target.files[0])
      }
    },
    //actualise les éléments visibles ou non d'un chant
    handleScroll(window) {
      if (
        this.currentElementIndex >= 0 &&
        this.playlist[this.currentElementIndex].type == "song"
      ) {
        let windowLyrics = window.document.getElementsByClassName("song-part") //liste des blocs dans le DOM (verse, chorus, translation)
        let windowHeight = window.innerHeight //hauteur de la fenêtre
        let lyrics = this.playlist[this.currentElementIndex].lyrics //liste des blocs dans les données
        if (windowLyrics.length != lyrics.length) {
          return
        }
        let lastStickyHeight = 0
        let unique = false
        let lineHeight = 16 * this.settings.liveView.fontSize * 1.3
        let activeIndex = -1
        let lastStickyIndex = -1
        lyrics.forEach((part, i) => {
          if (
            part.type != "chorus" ||
            (part.type == "chorus" && !part.sticky)
          ) {
            if (unique) {
              part.isActive = false
            } else {
              let DOMrect = windowLyrics[i].getBoundingClientRect() //récupération de la taille et de la position de l'élément dans la fenêtre
              part.isActive =
                DOMrect.top < windowHeight - lineHeight &&
                DOMrect.bottom > lastStickyHeight + lineHeight //un couplet, une traduction ou un refrain non statique est actif si c'est le premier (unique) élément an partant du haut de la fenêtre (ou juste en dessous d'un refrain statique) et que l'on voit encore 1 ligne
              if (part.isActive) {
                unique = true
                activeIndex = i
              }
            }
          } else {
            part.isActive = false
            if (part.sticky) {
              lastStickyHeight = windowLyrics[i].offsetHeight
              lastStickyIndex = i
            }
          }
        })

        //parcours des refrains avant le dernier élément actif pour le rendre actif s'il est statique
        for (let index = activeIndex - 1; index >= 0; index--) {
          const part = lyrics[index]
          if (part.type == "chorus" && part.sticky) {
            part.isActive = true
            index = -1
          }
        }

        if (activeIndex < 0 && lastStickyIndex >= 0) {
          //s'il n'y a aucun élément actif, on vérifie si un refrain statique est affiché
          let DOMrect = windowLyrics[lastStickyIndex].getBoundingClientRect() //récupération de la taille et de la position de l'élément dans la fenêtre
          lyrics[lastStickyIndex].isActive =
            DOMrect.top < windowHeight - lineHeight &&
            DOMrect.bottom > lineHeight
        }
      }
    },
    getlastActivePartIndex() {
      //Retourne l'index de la dernière partie (verse, chorus, translation) du chant qui est active (visible dans la présentation)
      if (this.playlist[this.currentElementIndex].type == "song") {
        let stickyIndex = -1
        let song = this.playlist[this.currentElementIndex]
        let i = song.lyrics.length - 1
        while (i >= 0) {
          let part = song.lyrics[i]
          if (part.sticky && stickyIndex < 0) {
            stickyIndex = i
          } else if (part.isActive) {
            return i
          }
          i--
        }
        return stickyIndex
      }
      return -1
    },
    getNextPartIndex() {
      return this.getlastActivePartIndex() + 1
    },
    getPreviousPartIndex() {
      let previousPartIndex = this.getlastActivePartIndex()
      do {
        previousPartIndex--
      } while (
        previousPartIndex > 0 &&
        this.playlist[this.currentElementIndex].lyrics[previousPartIndex]
          .isActive
      )
      return previousPartIndex
    },
  },
}
</script>

<style scoped src="./Playlist.css"></style>
