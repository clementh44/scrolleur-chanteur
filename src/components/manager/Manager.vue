<template>
<div class="container">
    <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
        <strong>Bienvenue dans cette version {{ version }} du <a href="https://github.com/clementh44/scrolleur-chanteur" target="_blank">Scrolleur-Chanteur</a></strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <p>Cette version permet de ne rien installer, il suffit de charger cette page quand on a internet et de ne pas la fermer ou l'actualiser pour s'en servir.</p>
        <hr>
        <p>Ici, c'est la page de gestion de la projection. Cliquez sur <em><font-awesome-icon :icon="'desktop'"/> Ouvrir/Fermer la fenêtre de présentation</em> pour afficher la fenêtre de présentation (à mettre sur le vidéo-projecteur).</p>
        <p>Pour afficher un chant, il suffit d'appuyer sur <font-awesome-icon :icon="'desktop'"/>.</p>
        <p>La <strong>Playlist</strong> permet de préparer une liste avec : des chants (ajouter avec <font-awesome-icon :icon="'plus'"/> depuis le <strong>Répertoire</strong>) ; un contenu vide (avec <font-awesome-icon :icon="['far','square']"/>) ; un contenu personnalisé (texte personnalisé avec <font-awesome-icon :icon="'file-alt'"/>).</p>
    </div>

    <div class="card my-3">
        <div class="card-body">
            <p><button @click=toggleView class="btn btn-primary"><font-awesome-icon :icon="'desktop'"/> Ouvrir/Fermer la fenêtre de présentation</button></p>
            <p><button @click=togglePreview class="btn btn-primary"><font-awesome-icon :icon="'eye'"/> Aperçu</button></p>
            <p class="mb-0"><button @click=toggleParam class="btn btn-primary"><font-awesome-icon :icon="'sliders-h'"/> Paramètres</button></p>
        </div>
    </div>

    <div class="card mb-3">
        <a id="playlist-header" class="text-decoration-none" data-toggle="collapse" href="#collapse-playlist" aria-expanded="true" aria-controls="collapse-playlist">
            <h3 class="card-header d-flex justify-content-between">
                Playlist <font-awesome-icon class="pull-right" :icon="'chevron-down'"/>
            </h3>
        </a>
        <div id="collapse-playlist" class="card-body collapse show" aria-labelledby="playlist-header">
            <Playlist v-model="playlist" v-on:display="displayElement" v-on:preview="previewElement" :settings="settings" v-on:search-score="searchScore($event.title, $event.query)" />
        </div>
    </div>

    <div class="card mb-3">
        <a id="repertory-header" class="text-decoration-none" data-toggle="collapse" href="#collapse-repertory" aria-expanded="true" aria-controls="collapse-repertory">
            <h3 class="card-header d-flex justify-content-between">
                Répertoire <font-awesome-icon class="pull-right" :icon="'chevron-down'"/>
            </h3>
        </a>
        <div id="collapse-repertory" class="card-body collapse show" aria-labelledby="repertory-header">
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
                    <ElementActions :element="Object.assign({type: 'song'},song)" :settings="settings" @preview="previewElement($event)" @display="displayElement($event)" @search-score="searchScore($event.title, $event.query)" >
                        <template v-slot:end>
                            <button class="btn btn-light btn-sm" @click="addElement(Object.assign({type: 'song'},song))" title="Ajouter dans la playlist"><font-awesome-icon :icon="'plus'"/></button>
                        </template>
                    </ElementActions>
                </li>
            </ul>
        </div>
    </div>

    <WindowPortal v-model="viewOpened">
      <ViewWindow :element="viewBody" :settings="settings" :live=true />
    </WindowPortal>
    <SideBox v-show="previewOpened" header="Aperçu" @close="previewOpened = false">
        <template v-slot:content>
            <ViewWindow :element="previewBody" :settings="settings" :live=false />
        </template>
    </SideBox>
    <SideBox v-show="paramOpened" header="Paramètres" @close="paramOpened = false">
        <template v-slot:content>
            <Settings :settings="settings" />
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
import Settings from './Settings'
import ElementActions from './ElementActions'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faPlus, faTimes, faDesktop, faSlidersH, faChevronDown, faFileAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faSquare, faPlus, faTimes, faDesktop, faSlidersH, faChevronDown, faFileAlt)

export default {
    name: 'Manager',
    data() {
        return {
            version: process.env.VUE_APP_VERSION,
            songs: Chants,
            viewBody: {type: 'empty'},
            viewOpened: false,
            playlist: [],
            search: "",
            paramOpened: false,
            settings: {
                defaulTheme: 'custom-light',
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
                viewTitle: true,
                score: {
                    enabled: false,
                    query: "",
                    google: "http://www.google.com/search?q=<TITRE>+filetype:pdf",
                    youtube: "https://www.youtube.com/results?search_query=<TITRE>"
                }
            },
            previewOpened: false,
            previewBody: {type: 'empty'}
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
            this.viewOpened = !this.viewOpened
        },
        displayElement: function(element) {
            this.viewBody = element
            if (!this.viewOpened) {
                this.toggleView()
            }
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
        addElement: function(element) {
            this.playlist.push(element)
        },
        // PARTITION
        searchScore: function(title, query) {
            if (query && query.includes("<TITRE>")) {
                window.open(query.replace("<TITRE>", title.replace(' ', '+')))
            }
        },

        // AUTRE
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
    },
    mounted() {
        if (localStorage.getItem('settings')) {
            this.settings = JSON.parse(localStorage.getItem('settings'))
        }
        if (localStorage.getItem('playlist')) {
            this.playlist = JSON.parse(localStorage.getItem('playlist'))
        }
    },
    watch: {
        settings: {
            handler: function(newSettings) {
                localStorage.setItem('settings', JSON.stringify(newSettings))
            },
            deep: true
        },
        playlist: function(newPlaylist) {
            localStorage.setItem('playlist', JSON.stringify(newPlaylist))
        }
    }
}
</script>

<style scoped src="./Manager.css">

</style>

<!--
Available elements :
{
    type: empty | grid | song | text
    title: ""
}

{
    type: song
    title: ""
    lyrics: [
        {
            type: verse | chorus | translation
            text: ""
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
