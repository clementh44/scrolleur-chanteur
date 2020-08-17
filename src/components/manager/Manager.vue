<template>
<div class="container">
    <p><button @click=openView class="btn btn-primary"><font-awesome-icon :icon="viewWindowIcon()" /> Ouvrir/Fermer la fenêtre de visualisation</button></p>
    <Playlist v-model="playlist" v-on:display="displayElement" />
    <div class="form-group">
        <label for="searchInput">Rechercher</label>
        <div class="input-group">
            <input type="text" id="searchInput" class="form-control" placeholder="Rechercher un titre..." v-model="search" @focus="$event.target.select()">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="search = ''" ><font-awesome-icon :icon="'times'"/></button>
            </div>
        </div>
    </div>
    <ul class="list-group">
        <li :key=index v-for="(song, index) in filteredSongs" class="list-group-item d-flex">
            <div class="flex-grow-1">{{ song.title }}</div>
            <div class="btn-group">
                <button class="btn btn-light btn-sm" @click="addElement(Object.assign({type: 'song'},song))"><font-awesome-icon :icon="'plus'"/></button>
                <button class="btn btn-light btn-sm" @click="displayElement(Object.assign({type: 'song'},song))"><font-awesome-icon :icon="'eye'"/></button>
            </div>
        </li>
    </ul>
    <WindowPortal v-model="open">
      <ViewWindow :element="viewBody" />
    </WindowPortal>
</div>
</template>

<script>
import Chants from '../../chants.json'
import WindowPortal from '../WindowPortal'
import ViewWindow from '../view/ViewWindow'
import Playlist from './Playlist'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faSquare, faCheckSquare, faPlus, faTimes)

export default {
    name: 'Manager',
    data() {
        return {
            songs: Chants,
            viewBody: {type: 'empty'},
            open: false,
            viewWindowIcon: function() {
                return this.open ? ['far','check-square'] : ['far','square']
            },
            playlist: [
                {
                    type: "grid",
                    title: "Quadrillage d'aide au cadrage de la projection"
                }
            ],
            search: ""
        }
    },
    components: {
        WindowPortal,
        ViewWindow,
        Playlist
    },
    methods: {
        openView: function() {
            this.open = !this.open
        },
        displayElement: function(element) {
            this.viewBody = element
        },
        addElement: function(element) {
            this.playlist.push(element)
        }
    },
    computed: {
        sortedSongs: function() {
            let copy = this.songs
            copy.forEach((song) => {
                song.lyrics.forEach(lyrics => {
                    if (lyrics.type == "chorus") {
                        lyrics.sticky = true
                    } else if (lyrics.type == "verse") {
                        lyrics.show = true
                    }
                });
            })
            return copy.sort(function (a, b) {
                return a.id.localeCompare(b.id)
            })
        },
        filteredSongs: function() {
            return this.sortedSongs.filter((song) => {
                // normalise le terme recherché (sans accents, minuscule)
                return this.search.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split(' ').every(s => song.id.includes(s))
            })
        }
    }
}
</script>

<style>

</style>