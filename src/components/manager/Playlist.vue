<template>
<div>
    <div class="btn-toolbar mb-3">
        <div class="btn-group mr-3">
            <button @click="display({type:'grid'})" type="button" class="btn btn-secondary" title="Quadrillage d'aide au cadrage de la projection"><font-awesome-icon :icon="'border-all'"/></button>
        </div>
        <div class="btn-group">
            <div class="btn btn-secondary" aria-disabled="true" style="pointer-events: none;">Ajouter :</div>
            <button @click="addElement({type:'empty',title:'Contenu vide'})" type="button" class="btn btn-secondary" title="Contenu vide"><font-awesome-icon :icon="['far','square']"/></button>
        </div>
    </div>

    <draggable v-model="listLocal" handle=".handle" tag="ul" class="list-group">
        <li v-for="(element,index) in listLocal" :key="index" class="list-group-item d-flex">
            <div class="flex-grow-1">{{element.title}}</div>
            <div class="btn-group">
                <button class="btn btn-light btn-sm" @click="preview(element)" title="Afficher dans la fenêtre d'aperçu"><font-awesome-icon :icon="'eye'"/></button>
                <button class="btn btn-light btn-sm" @click="display(element)" title="Afficher dans la fenêtre de présentation"><font-awesome-icon :icon="'desktop'"/></button>
                <button class="btn btn-light btn-sm handle" title="Déplacer l'élément"><font-awesome-icon :icon="'arrows-alt-v'"/></button>
                <button class="btn btn-light btn-sm" @click="removeAt(index)" title="Supprimer l'élément de la playlist"><font-awesome-icon :icon="'times'"/></button>
            </div>
        </li>
    </draggable>
</div>
</template>

<script>
import draggable from 'vuedraggable'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faArrowsAltV, faTimes, faEye, faDesktop, faBorderAll } from '@fortawesome/free-solid-svg-icons'

library.add(faSquare, faArrowsAltV ,faTimes, faEye, faDesktop, faBorderAll)

export default {
    name: "Playlist",
    data: function() {
        return {
            
        }
    },
    props: {
        playlist: Array
    },
    model: {
        prop: 'playlist',
        event: 'listChange'
    },
    components: {
        draggable
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
        display(data) {
            this.$emit("display", data)
        },
        preview(data) {
            this.$emit("preview", data)
        },
        removeAt(index) {
            this.playlist.splice(index, 1);
        },
        addElement: function(element) {
            this.playlist.push(element)
        }
    }
}
</script>

<style scoped>
.handle {
    cursor: move;
}
</style>