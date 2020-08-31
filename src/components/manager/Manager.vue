<template>
<div class="container">
    <p><button @click=openView class="btn btn-primary"><font-awesome-icon :icon="viewWindowIcon()" /> Ouvrir/Fermer la fenêtre de présentation</button></p>
    <p><button @click="paramOpened = !paramOpened" class="btn btn-primary">Paramètres</button></p>
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
    <WindowPortal v-model="viewOpened">
      <ViewWindow :element="viewBody" :parameters="parameters" />
    </WindowPortal>
    <SideBox v-show="paramOpened" header="Paramètres" @close="paramOpened = false">
        <template v-slot:content>
            <form>
                <div class="form-group row">
                    <label for="param-theme" class="col-sm-2 col-form-label">Thème</label>
                    <div class="col-sm-10"><select v-model="parameters.viewTheme" id="param-theme" class="form-control"><option v-for="(theme, index) in parameters.viewThemes" :key="index" :value="theme.value">{{ theme.text }}</option></select></div>
                </div>
                <hr>
                <h5>Chants</h5>
                <div class="form-group row">
                    <label for="param-padding" class="col-sm-2 col-form-label">Marges</label>
                    <div class="col-sm-10"><select aria-describedby="param-padding-help" v-model="parameters.padding" id="param-padding" class="form-control"><option v-for="(padding, index) in parameters.paddings" :key="index" :value="padding.value">{{ padding.text }}</option></select></div>
                    <small id="param-padding-help" class="form-text text-muted col-12">Marge à gauche et droite du chant</small>
                </div>
                <div class="form-group row">
                    <label for="param-font-size" class="col-sm-2 col-form-label">Taille</label>
                    <div class="col-sm-10 d-flex"><input aria-describedby="param-font-size-help" type="range" v-model="parameters.fontSize" id="param-font-size" class="form-control-range" min="0.5" max="2" step="0.1"/></div>
                    <small id="param-font-size-help" class="form-text text-muted col-12">Taille de la police d'écriture multipliée par {{ parameters.fontSize }}</small>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="param-title" v-model="parameters.viewTitle">
                    <label class="form-check-label" for="param-title" >Afficher le titre {{parameters.viewTitle}}</label>
                </div>
                <p>Police d'écriture</p>
            </form>
        </template>
    </SideBox>
</div>
</template>

<script>
import Chants from '../../chants.json'
import WindowPortal from '../WindowPortal'
import ViewWindow from '../view/ViewWindow'
import SideBox from '../sideBox/SideBox'
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
            viewOpened: false,
            viewWindowIcon: function() {
                return this.viewOpened ? ['far','check-square'] : ['far','square']
            },
            playlist: [
                {
                    type: "grid",
                    title: "Quadrillage d'aide au cadrage de la projection"
                }
            ],
            search: "",
            paramOpened: false,
            parameters: {
                viewTheme: 'custom-light',
                viewThemes: [
                    {text: 'clair', value: 'custom-light'},
                    {text: 'foncé', value: 'custom-dark'}
                ],
                padding: 'px-0',
                paddings: [
                    {text: 'marges taille 0', value: 'px-0'},
                    {text: 'marges taille 1', value: 'px-1'},
                    {text: 'marges taille 2', value: 'px-2'},
                    {text: 'marges taille 3', value: 'px-3'},
                    {text: 'marges taille 4', value: 'px-4'},
                    {text: 'marges taille 5', value: 'px-5'}
                ],
                fontSize: 1,
                viewTitle: true
            }
        }
    },
    components: {
        WindowPortal,
        ViewWindow,
        Playlist,
        SideBox
    },
    methods: {
        openView: function() {
            this.viewOpened = !this.viewOpened
        },
        displayElement: function(element) {
            this.viewBody = element
        },
        addElement: function(element) {
            this.playlist.push(element)
        },
        beforeClose: function(event) {
            event.returnValue =  "Fermez ou rafraichissez la page si vous avez une connection internet. (cela réinitialise les paramètres et la playlist des chants)"
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
    },
    beforeMount() {
        window.addEventListener("beforeunload", this.beforeClose)
        this.$once("hook:beforeDestroy", () => {
            window.removeEventListener("beforeunload", this.beforeClose);
        })
    }
}
</script>

<style>

</style>