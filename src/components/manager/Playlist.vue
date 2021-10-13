<template>
  <div>
    <!-- Barre d'actions -->
    <b-button-toolbar class="mb-3">
      <b-button-group class="mr-3">
        <b-button @click="display({ type: 'grid' })" variant="secondary" title="Quadrillage d'aide au cadrage de la projection">
          <font-awesome-icon :icon="'border-all'"></font-awesome-icon>
        </b-button>
      </b-button-group>
      <b-button-group class="mr-3">
        <b-button variant="secondary" :pressed="false" aria-disabled="true" style="pointer-events: none;">
          Ajouter :
        </b-button>
        <b-button @click="addElement({ type: 'empty', title: '_vide_' })" variant="secondary" title="Contenu vide">
          <font-awesome-icon :icon="['far', 'square']"></font-awesome-icon>
        </b-button>
        <b-button @click="insertEmptyTransition()" v-if="this.playlist.length > 0" variant="secondary" title="Intercaler un élément vide entre chaque contenu">
          <font-awesome-icon :icon="['far', 'clone']"></font-awesome-icon>
        </b-button>
        <b-button @click="addElement({ type: 'text', title: 'Texte à personnaliser' })" variant="secondary" title="Texte personnalisé">
          <font-awesome-icon :icon="'align-left'"></font-awesome-icon>
        </b-button>
        <b-button @change="addFile($event)" variant="secondary" class="m-0" tag="label" for="input-file" title="Importer une image"
          ><font-awesome-icon :icon="'image'"></font-awesome-icon> <input type="file" id="input-file" hidden accept="image/gif,image/png,image/jpeg,image/bmp,image/webp"
        /></b-button>
      </b-button-group>
      <b-button-group v-if="this.playlist.length > 0">
        <b-button variant="danger" :pressed="false" aria-disabled="true" style="pointer-events: none;">
          Supprimer :
        </b-button>
        <b-button @click="cleanEmpty()" variant="danger" title="Supprimer les éléments vides">
          <font-awesome-icon :icon="['far', 'clone']"></font-awesome-icon>
        </b-button>
        <b-button @click="clean()" variant="danger" title="Vider la playlist">
          <font-awesome-icon :icon="'trash-alt'"></font-awesome-icon>
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
        (<font-awesome-icon :icon="['far', 'square']"></font-awesome-icon>).<br />
        Ci-dessous, recherchez et ajoutez un chant du répertoire (<font-awesome-icon :icon="'plus'"></font-awesome-icon>) pour acceder à plus de contrôles.<br />
        Rappel : laissez la souris sur un bouton pour avoir une description de son action.
      </b-list-group-item>
    </b-list-group>

    <!-- Playlist -->
    <draggable v-model="listLocal" handle=".handle" tag="b-list-group" @start="onStart" @end="onEnd" v-bind="dragOptions">
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <b-list-group-item v-for="(element, index) in listLocal" :key="index">
          <div class="d-flex w-100 justify-content-between align-items-center">
            <div v-if="index == currentElementIndex" class="current-element-icon" style="left:-4px;" title="Elément actuellement dans la présentation"></div>
            <div class="flex-grow-1">{{ element.title }} <b-img v-if="element.type == 'file'" :src="element.file" alt="Miniature image" thumbnail rounded class="sc-file"/></div>

            <ElementActions
              :element="element"
              :settings="settings"
              @preview="preview($event)"
              @search-score="
                $emit('search-score', {
                  title: $event.title,
                  query: $event.query
                })
              "
            >
              <template v-slot:first>
                <b-button variant="light" v-if="canEdit(element)" @click="edit(element)" title="Editer l'élément">
                  <font-awesome-icon :icon="['far', 'edit']"></font-awesome-icon>
                </b-button>
              </template>
              <template v-slot:end>
                <b-button variant="light" @click="display(element, index)" title="Afficher dans la fenêtre de présentation">
                  <font-awesome-icon :icon="'desktop'"></font-awesome-icon>
                </b-button>
                <b-button variant="light" class="handle" tag="i" title="Déplacer l'élément">
                  <font-awesome-icon :icon="'arrows-alt-v'"></font-awesome-icon>
                </b-button>
                <b-button variant="outline-danger" @click="removeAt(index)" title="Supprimer l'élément de la playlist">
                  <font-awesome-icon :icon="'trash-alt'"></font-awesome-icon>
                </b-button>
              </template>
            </ElementActions>
          </div>
          <div v-if="index == currentElementIndex && element.type == 'song'" class="d-flex flex-wrap mt-1">
            <div class="p-2 border d-flex align-items-center lyrics-part-block" v-for="(lyricsBlock, index) in element.lyrics" :key="index">
              <div v-if="lyricsBlock.isActive" class="current-element-icon" style="left:1px;" title="Partie visible dans la présentation"></div>
              <div :class="['text-truncate', 'flex-grow-1', lyricsBlock.type == 'chorus' ? 'font-weight-bold' : '']" :title="lyricsBlock.text" v-html="lyricsBlock.text">
              </div>
              <b-button-group>
                <b-button variant="light" class="no-focus" @click="$emit('scroll-to-pos', { pos: index })" title="Afficher l'élément dans la présentation">
                  <font-awesome-icon :icon="'angle-double-down'"></font-awesome-icon>
                </b-button>
                <b-button
                  variant="light"
                  class="no-focus"
                  :class="{ active: lyricsBlock.sticky }"
                  v-if="lyricsBlock.type == 'chorus'"
                  @click="lyricsBlock.sticky = !lyricsBlock.sticky"
                  title="Accrocher ce refrain en haut de la présentation"
                >
                  <font-awesome-icon :icon="'thumbtack'"></font-awesome-icon>
                </b-button>
                <b-button
                  variant="light"
                  class="no-focus"
                  :class="{ active: !lyricsBlock.show }"
                  v-if="lyricsBlock.type == 'verse' || lyricsBlock.type == 'translation'"
                  @click="lyricsBlock.show = !lyricsBlock.show"
                  title="Cacher ce couplet"
                >
                  <font-awesome-icon :icon="['far', 'eye-slash']"></font-awesome-icon>
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
import { library } from "@fortawesome/fontawesome-svg-core"
import { faSquare, faEdit, faClone, faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import { faArrowsAltV, faBorderAll, faTrashAlt, faAlignLeft, faImage, faAngleDoubleDown, faThumbtack, faPlus } from "@fortawesome/free-solid-svg-icons"

library.add(faSquare, faEdit, faClone, faEyeSlash, faArrowsAltV, faBorderAll, faTrashAlt, faAlignLeft, faImage, faAngleDoubleDown, faThumbtack, faPlus)

export default {
  name: "Playlist",
  data: function() {
    return {
      editableTypes: ["text", "file"],
      isEdited: false,
      editedElement: null,
      savedCurrentElementIndex: -1,
      drag: false
    }
  },
  props: {
    playlist: Array,
    settings: Object,
    currentElementIndex: Number
  },
  model: {
    prop: "playlist",
    event: "listChange"
  },
  components: {
    draggable,
    ElementActions,
    Undo,
    Editor
  },
  computed: {
    listLocal: {
      get: function() {
        return this.playlist
      },
      set: function(value) {
        this.$emit("listChange", value)
      }
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      }
    }
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
      if (element.type != "empty") {
        this.$refs.deleteElement.addElement(element, element.title)
      }
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
    //vider la playlist
    clean() {
      for (let index = this.playlist.length - 1; index >= 0; index--) {
        this.removeAt(index)
      }
    },
    //supprimer les éléments vides
    cleanEmpty() {
      for (let index = this.playlist.length - 1; index >= 0; index--) {
        if (this.playlist[index].type == "empty") {
          this.removeAt(index)
        }
      }
    },

    //gestion du déplacement d'un élément
    onStart() {
      this.drag = true
      this.savedCurrentElementIndex = this.currentElementIndex
      this.updateCurrentElementIndex(-1)
    },
    onEnd(evt) {
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
            width: 100
          })
        }
        fr.readAsDataURL(file.target.files[0])
      }
    }
  }
}
</script>

<style scoped src="./Playlist.css"></style>
