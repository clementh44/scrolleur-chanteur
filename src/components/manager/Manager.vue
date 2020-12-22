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
                    <a class="nav-link" href="#" @click=toggleView title="Ouvrir/fermer la fenêtre de présentation"><font-awesome-icon :icon="'desktop'"></font-awesome-icon> Présentation</a>
                </li>
                <li :class="['nav-item', previewOpened ? 'active' : '']">
                    <a class="nav-link" href="#" @click=togglePreview title="Ouvrir/fermer l'aperçu d'un élément"><font-awesome-icon :icon="'eye'"></font-awesome-icon> Aperçu</a>
                </li>
                <li :class="['nav-item', paramOpened ? 'active' : '']">
                    <a class="nav-link" href="#" @click=toggleParam title="Ouvrir/fermer les paramètres"><font-awesome-icon :icon="'sliders-h'"></font-awesome-icon> Paramètres</a>
                </li>
            </ul>
        </div>
    </nav>

    <!-- Termes à accepter -->
    <template v-if="!secliAccepted">
        <div class="modal fade show" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style="display: block;">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Protection des œuvres</h5>
                </div>
                <div class="modal-body">
                    <p>Les textes (faisant partie d'une œuvre au même titre que sa musique) présents sur cet outil sont à l'usage exclusif des cotisants au SECLI.</p>
                    <p>En continuant à utiliser l'outil, vous déclarez cotiser par ailleurs au SECLI (<a href="https://secli.cef.fr/" target="_blank">Secrétariat des Editeurs de Chants pour la LIturgie</a>) directement ou via votre paroisse ou groupe.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="acceptSecli">Je comprends et accepte ces termes</button>
                </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop fade show"></div>
    </template>

    <div class="row">
        <!-- Fenêtre de présentation -->
        <WindowPortal v-model="viewOpened" ref="liveWindow" v-on:shortcuts="manageShortCuts" :width="settings.liveView.window.width" :height="settings.liveView.window.height">
            <ViewWindow :element="viewBody" :settings="settings" :live=true :duration=500></ViewWindow>
        </WindowPortal>

        <!-- Fenêtre d'aperçu -->
        <SideBox v-show="previewOpened" header="Aperçu" @close="previewOpened = false">
            <template v-slot:content>
                <ViewWindow :element="previewBody" :settings="settings" :live=false></ViewWindow>
            </template>
        </SideBox>

        <!-- Fenêtre des paramètres -->
        <SideBox v-show="paramOpened" header="Paramètres" @close="paramOpened = false">
            <template v-slot:content>
                <Settings :settings="settings"></Settings>
            </template>
        </SideBox>

        <div class="col">
            <!-- Aide -->
            <div class="alert alert-success alert-dismissible fade show mt-3" role="alert" v-if="settings.help">
                <strong>Bienvenue dans cette version {{ version }} du <a href="https://github.com/clementh44/scrolleur-chanteur" target="_blank">Scrolleur-Chanteur</a></strong>
                <button type="button" class="close" aria-label="Close" @click="settings.help = false">
                    <span aria-hidden="true">&times;</span>
                </button>
                <p>Cette version permet de ne rien installer, il suffit de charger cette page quand on a internet et de ne pas la fermer ou l'actualiser pour s'en servir.</p>
                <hr>
                <p>Ici, c'est la page de gestion de la projection. Cliquez sur <em><font-awesome-icon :icon="'desktop'"></font-awesome-icon> Présentation</em> pour afficher la fenêtre de présentation (à mettre sur le vidéo-projecteur. Appuyer sur F11 pour mettre en plein écran).</p>
                <p>Pour afficher un chant, il suffit d'appuyer sur <font-awesome-icon :icon="'desktop'"></font-awesome-icon>.</p>
                <p>La <strong>Playlist</strong> permet de préparer une liste avec : des chants (ajouter avec <font-awesome-icon :icon="'plus'"></font-awesome-icon> depuis le <strong>Répertoire</strong>) ; un contenu vide (avec <font-awesome-icon :icon="['far','square']"></font-awesome-icon>) ; un texte personnalisé (avec <font-awesome-icon :icon="'align-left'"></font-awesome-icon>) ; une image (avec <font-awesome-icon :icon="'image'"></font-awesome-icon>).</p>
                <p>Les paramètres et la playlist (sauf les images) sont automatiquement sauvegardés dans le navigateur.</p>
                <p>Faire une demande d'ajout de chant via <a href="https://forms.gle/NtKpdCazNs9N4NY88" target="_blank">ce formulaire</a>. Sinon, utiliser le texte personnalisé (<font-awesome-icon :icon="'align-left'"></font-awesome-icon>)</p>
                <p><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=8C9QSKX238UGU&item_name=Soutenir+le+d%C3%A9veloppement+du+projet&currency_code=EUR" target="_blank">Soutenir le projet</a>.</p>
            </div>

            <!-- Playlist -->
            <div class="card mb-3">
                <a id="playlist-header" class="text-decoration-none" data-toggle="collapse" href="#collapse-playlist" aria-expanded="true" aria-controls="collapse-playlist">
                    <h3 class="card-header d-flex justify-content-between">
                        Playlist <font-awesome-icon class="pull-right" :icon="'chevron-down'"></font-awesome-icon>
                    </h3>
                </a>
                <div id="collapse-playlist" class="card-body collapse show" aria-labelledby="playlist-header">
                    <Playlist v-model="playlist" v-on:display="displayElement" v-on:preview="previewElement" :settings="settings" :current-element-index="currentElementIndex" v-on:update-current-element-index="currentElementIndex = $event" v-on:search-score="searchScore($event.title, $event.query)"></Playlist>
                </div>
            </div>

            <!-- Répertoire -->
            <div class="card mb-3">
                <a id="repertory-header" class="text-decoration-none" data-toggle="collapse" href="#collapse-repertory" aria-expanded="true" aria-controls="collapse-repertory">
                    <h3 class="card-header d-flex justify-content-between">
                        Répertoire <font-awesome-icon class="pull-right" :icon="'chevron-down'"></font-awesome-icon>
                    </h3>
                </a>
                <div id="collapse-repertory" class="card-body collapse show" aria-labelledby="repertory-header">
                    <div class="form-group">
                        <label for="searchInput">Rechercher parmis les {{ songs.length }} chants</label>
                        <div class="input-group">
                            <input @keyup.stop type="text" id="searchInput" class="form-control" placeholder="Rechercher un titre..." v-debounce="searchSong" @click="$event.target.select()">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" @click="searchScore(search, settings.score.google)" title="Rechercher le titre sur google"><font-awesome-icon :icon="['fab','google']"></font-awesome-icon></button>
                            </div>
                        </div>
                    </div>
                    <ul class="list-group">
                        <li :key=index v-for="(song, index) in filteredSongs" class="list-group-item d-flex">
                            <div class="flex-grow-1">{{ song.title }}</div>
                            <ElementActions :element="Object.assign({type: 'song'},song)" :settings="settings" @preview="previewElement($event)" @display="displayElement($event)" @search-score="searchScore($event.title, $event.query)" >
                                <template v-slot:end>
                                    <button class="btn btn-light btn-sm" @click="addElement(Object.assign({type: 'song'},song))" title="Ajouter dans la playlist"><font-awesome-icon :icon="'plus'"></font-awesome-icon></button>
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
import Chants from '../../chants.json'
import WindowPortal from '../WindowPortal'
import ViewWindow from '../view/ViewWindow'
import SideBox from '../sideBox/SideBox'
import Playlist from './Playlist'
import Settings from './Settings'
import ElementActions from './ElementActions'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { faPlus, faDesktop, faSlidersH, faChevronDown, faFileAlt, faImage } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

library.add(faSquare, faPlus, faDesktop, faSlidersH, faChevronDown, faFileAlt, faImage, faGoogle)

export default {
    name: 'Manager',
    data() {
        return {
            version: process.env.VUE_APP_VERSION,
            songs: Chants,
            secliAccepted: false,
            currentElementIndex: -1,
            viewBody: {type: 'empty'},
            viewOpened: false,
            playlist: [],
            search: "",
            paramOpened: false,
            settings: {
                version: 20200928, // à incrémenter s'il y a des changements dans la structure des paramètres et forcer la ràz des paramètres sauvegardés dans le navigateur
                liveView: {
                    defaulTheme: 'custom-light',
                    viewTheme: 'custom-light',
                    viewThemes: [
                        {text: 'clair', value: 'custom-light'},
                        {text: 'foncé', value: 'custom-dark'}
                    ],
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
                    playlistPrevious: "ArrowLeft"
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
        displayElement: function(element, index) {
            if (index != undefined) {
                this.currentElementIndex = index
            }

            this.viewBody = {type: "empty"}
            setTimeout(() => {
                this.$refs.liveWindow.scrollTop()
                this.viewBody = element
            }, 500)
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
                window.open(query.replace("<TITRE>", title.replace(/ /g, '+')))
            }
        },
        searchSong: function(title) {
            this.search = title
        },

        // AUTRE
        beforeClose: function(event) {
            event.returnValue =  "Fermez ou rafraichissez la page si vous avez une connection internet. Les paramètres et la playlist sont enregistrés (sauf les images)"
        },
        manageShortCuts: function(event) {
            if (event.key == this.settings.shortcuts.playlistNext) {
                if (this.currentElementIndex + 1 < this.playlist.length) {
                    this.currentElementIndex++
                    this.displayElement(this.playlist[this.currentElementIndex])
                }
            }
            else if (event.key == this.settings.shortcuts.playlistPrevious) {
                if (this.currentElementIndex > 0) {
                    this.currentElementIndex--
                    this.displayElement(this.playlist[this.currentElementIndex])
                }
            }
        },
        acceptSecli: function() {
            this.secliAccepted = true
            this.$cookies.set('secliAccepted', true, '30d')
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
                return this.search.normalize("NFD").replace(/[\u0300-\u036f,']/g, "").toLowerCase().split(' ').every(s => song.id.includes(s))
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
            var localSettings = JSON.parse(localStorage.getItem('settings'))
            // pour forcer la mise à zéro des paramètres s'il y a des changements dans la structure
            if (localSettings.version && localSettings.version >= this.settings.version) {
                this.settings = localSettings
            }
            else {
                localStorage.setItem('settings', JSON.stringify(this.settings))
            }
        }
        if (localStorage.getItem('playlist')) {
            this.playlist = JSON.parse(localStorage.getItem('playlist'))
        }
        if (this.$cookies.isKey('secliAccepted')) {
            this.secliAccepted = this.$cookies.get('secliAccepted')
        }
    },
    created() {
        window.addEventListener('keyup', this.manageShortCuts)
    },
    watch: {
        settings: {
            handler: function(newSettings) {
                localStorage.setItem('settings', JSON.stringify(newSettings))
            },
            deep: true
        },
        playlist: function(newPlaylist) {
            localStorage.setItem('playlist', JSON.stringify(newPlaylist.filter(element => element.type != 'file')))
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
    rating: ""
    newrating: ""
    writer: ""
    publisher: ""
    composer: ""
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
