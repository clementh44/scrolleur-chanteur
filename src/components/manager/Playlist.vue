<template>
<div>
    <draggable v-model="listLocal" handle=".handle" tag="ul" class="list-group">
        <li class="list-group-item d-flex" slot="header">
            <div class="flex-grow-1">Fond uni</div>
            <div class="btn-group">
                <button class="btn btn-light btn-sm" @click="display({type:'empty'})"><font-awesome-icon :icon="'eye'"/></button>
            </div>
        </li>
        <li v-for="(element,index) in listLocal" :key="index" class="list-group-item d-flex">
            <div class="flex-grow-1">{{element.title}}</div>
            <div class="btn-group">
                <button class="btn btn-light btn-sm" @click="display(element)"><font-awesome-icon :icon="'eye'"/></button>
                <button class="btn btn-light btn-sm handle"><font-awesome-icon :icon="'arrows-alt-v'"/></button>
                <button class="btn btn-light btn-sm" @click="removeAt(index)"><font-awesome-icon :icon="'times'"/></button>
            </div>
        </li>
    </draggable>
</div>
</template>

<script>
import draggable from 'vuedraggable'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowsAltV, faTimes, faEye } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowsAltV ,faTimes, faEye)

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
        removeAt(index) {
            this.playlist.splice(index, 1);
        }
    }
}
</script>

<style scoped>
.handle {
    cursor: move;
}
</style>