<template>
<div>
    <div class="btn-toolbar mb-3">
        <div class="btn-group mr-3">
            <button @click="display({type:'grid'})" type="button" class="btn btn-secondary" title="Quadrillage d'aide au cadrage de la projection"><font-awesome-icon :icon="'border-all'"/></button>
        </div>
        <div class="btn-group">
            <div class="btn btn-secondary" aria-disabled="true" style="pointer-events: none;">Ajouter :</div>
            <button @click="addElement({type:'empty',title:'Contenu vide'})" type="button" class="btn btn-secondary" title="Contenu vide"><font-awesome-icon :icon="['far','square']"/></button>
            <button @click="addElement({type:'text',title:'Texte à personnaliser'})" type="button" class="btn btn-secondary" title="Texte personnalisé"><font-awesome-icon :icon="'align-left'"/></button>
            <label @change="addFile($event)" class="btn btn-secondary m-0" for="input-file" title="Importer une image"><font-awesome-icon :icon="'image'"/> <input type="file" id="input-file" hidden accept="image/gif,image/png,image/jpeg,image/bmp,image/webp"></label>
        </div>
    </div>

    <transition name="edition">
    <div class="d-flex card border-secondary mb-3" v-if="isEdited" ref="playlistEditionRef">
        <h5 class="card-header">Édition d'un élément</h5>
        <div class="card-body">
            <div class="card-text">
                <form v-if="editedElement.type == 'text'">
                    <div class="form-group">
                        <label for="custom-text-title">Titre</label>
                        <input class="form-control" id="custom-text-title" type="text" name="title" v-model="editedElement.title">
                    </div>
                    <div class="custom-control custom-switch form-group">
                        <input class="custom-control-input" type="checkbox" name="isTitleDisplayed" id="title-displayed-checkbox" v-model="editedElement.isTitleDisplayed" >
                        <label class="custom-control-label" for="title-displayed-checkbox">Afficher le titre dans la présentation (<font-awesome-icon :icon="'desktop'"/>)</label>
                    </div>
                    <div class="form-group">
                        <label for="custom-text-body">Corps du texte</label>
                        <textarea class="form-control" id="custom-text-body" name="content"  rows="10" v-model="editedElement.text"></textarea>
                    </div>
                </form>
            </div>
        </div>
        <div class="card-footer">
            <button type="button" class="btn btn-primary" @click="isEdited = false">Fermer</button>
        </div>
    </div>
    </transition>

    <draggable v-model="listLocal" handle=".handle" tag="ul" class="list-group">
        <li v-for="(element,index) in listLocal" :key="index" class="list-group-item">
            <div class="d-flex">
                <div class="flex-grow-1">{{element.title}}</div>
                <ElementActions :element="element" :settings="settings" @preview="preview($event)" @display="display($event)" @search-score="$emit('search-score',{title: $event.title, query: $event.query})">
                    <template v-slot:first>
                        <button class="btn btn-light btn-sm" v-if="canEdit(element)" @click="edit(element)" title="Editer l'élément"><font-awesome-icon :icon="['far','edit']"/></button>
                    </template>
                    <template v-slot:end>
                        <button class="btn btn-light btn-sm handle" title="Déplacer l'élément"><font-awesome-icon :icon="'arrows-alt-v'"/></button>
                        <button class="btn btn-light btn-sm" @click="removeAt(index)" title="Supprimer l'élément de la playlist"><font-awesome-icon :icon="'trash-alt'"/></button>
                    </template>
                </ElementActions>
            </div>
        </li>
    </draggable>
</div>
</template>

<script>
import draggable from 'vuedraggable'
import ElementActions from './ElementActions'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSquare, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faArrowsAltV, faBorderAll, faTrashAlt, faAlignLeft, faImage } from '@fortawesome/free-solid-svg-icons'

library.add(faSquare, faEdit, faArrowsAltV, faBorderAll, faTrashAlt, faAlignLeft, faImage)

export default {
    name: "Playlist",
    data: function() {
        return {
            editableTypes: ['text'],
            isEdited: false,
            editedElement: null
        }
    },
    props: {
        playlist: Array,
        settings: Object
    },
    model: {
        prop: 'playlist',
        event: 'listChange'
    },
    components: {
        draggable,
        ElementActions
    },
    computed: {
        listLocal: {
            get: function() {
                return this.playlist
            },
            set: function(value) {
                this.$emit('listChange', value)
            }
        }
    },
    methods: {
        display(element) {
            this.$emit("display", element)
        },
        preview(element) {
            this.$emit("preview", element)
        },
        removeAt(index) {
            this.playlist.splice(index, 1);
        },
        addElement: function(element) {
            this.playlist.push(element)
        },
        canEdit: function(element) {
            if (this.editableTypes.includes(element.type)) {
                element.isEdited = false
                return true
            }
            return false
        },
        edit: function(element) {
            this.editedElement = element
            this.isEdited = true
            setTimeout(() => {this.$refs['playlistEditionRef'].scrollIntoView({behavior: 'smooth'})}, 100)
        },
        addFile: function(file) {
            if (file.target.files && file.target.files[0]) {
                var fr = new FileReader()
                fr.onload = () => {
                    this.addElement({
                        type: "file",
                        title: "Fichier : " + file.target.files[0].name,
                        file: fr.result
                    })
                }
                fr.readAsDataURL(file.target.files[0])
            }
        }
    }
}
</script>

<style scoped>
.handle {
    cursor: move;
}
.edition-enter-active, .edition-leave-active {
    transition: opacity .2s ease-out, max-height .2s ease-out;
}
.edition-enter, .edition-leave-to {
    opacity: 0%;
    max-height: 0px;
}
.edition-enter-to, .edition-leave {
    opacity: 100%;
    max-height: 500px;
}
</style>