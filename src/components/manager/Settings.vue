<template>
<div>
    <form>
        <template v-if="!settings.help">
            <a @click="settings.help = true" href="#">Afficher l'aide</a>
            <hr>
        </template>

        <h5>Fenêtre de présentation</h5>
        <div class="form-group row">
            <label for="param-size" class="col-sm-2 col-form-label">Taille</label>
            <div class="input-group col-sm-10">
                <input @keyup.stop type="number" id="param-width" v-model.number="settings.liveView.window.width" class="form-control">
                <div class="input-group-prepend" style="margin-left: -1px;"><span class="input-group-text">x</span></div>
                <input @keyup.stop type="number" id="param-height" v-model.number="settings.liveView.window.height" class="form-control">
            </div>
            <small id="param-size-help" class="form-text text-muted col-12">Dimensions en pixel de la présentation (largeur x hauteur). Fermer/ouvrir la présentation pour appliquer</small>
        </div>
        <div class="form-group row">
            <label for="param-theme" class="col-sm-2 col-form-label">Thème</label>
            <div class="col-sm-10">
                <select v-model="settings.liveView.colors" id="param-theme" class="form-control">
                    <option v-for="(theme, index) in settings.liveView.viewThemes" :key="index" :value="{background: theme.value.background, text: theme.value.text, empty: theme.value.empty}">{{ theme.text }}</option>
                </select>
            </div>
            <small id="param-theme-help" class="form-text text-muted col-12">Choisir un thème pédéfini ou personnaliser les couleurs ci-dessous.</small>
        </div>
        <div class="form-group row">
            <label for="param-color-background" class="col-sm-2 col-form-label">Fond</label>
            <div class="col-sm-3 d-flex">
            <input type="color" class="form-control" id="param-color-background" v-model="settings.liveView.colors.background">
            </div>
        </div>
        <div class="form-group row">
            <label for="param-color-text" class="col-sm-2 col-form-label">Texte</label>
            <div class="col-sm-3 d-flex">
            <input type="color" class="form-control" id="param-color-text" v-model="settings.liveView.colors.text">
            </div>
        </div>
        <div class="form-group row">
            <label for="param-color-empty" class="col-sm-2 col-form-label">Vide</label>
            <div class="col-sm-3 d-flex">
            <input type="color" class="form-control" id="param-color-empty" v-model="settings.liveView.colors.empty">
            </div>
        </div>

        <hr>

        <h6>Chant et texte personnalisé</h6>
        <div class="form-group row">
            <label for="param-padding" class="col-sm-2 col-form-label">Marges</label>
            <div class="col-sm-10 d-flex"><input aria-describedby="param-padding-help" type="range" v-model="settings.liveView.padding" id="param-padding" class="form-control-range" min="0" max="5" step="1"></div>
            <small id="param-padding-help" class="form-text text-muted col-12">Marges à gauche et droite</small>
        </div>
        <div class="form-group row">
            <label for="param-font-size" class="col-sm-2 col-form-label">Taille</label>
            <div class="col-sm-10 d-flex"><input aria-describedby="param-font-size-help" type="range" v-model="settings.liveView.fontSize" id="param-font-size" class="form-control-range" min="0.5" max="4" step="0.1"></div>
            <small id="param-font-size-help" class="form-text text-muted col-12">Taille de la police d'écriture multipliée par {{ settings.liveView.fontSize }}</small>
        </div>

        <hr>

        <h6>Chant</h6>
        <div class="custom-control custom-switch form-group">
            <input class="custom-control-input" type="checkbox" id="param-title" v-model="settings.song.showTitle">
            <label class="custom-control-label" for="param-title" >Afficher le titre</label>
        </div>
        <div class="custom-control custom-switch form-group">
            <input class="custom-control-input" type="checkbox" id="param-rating" v-model="settings.song.showRating">
            <label class="custom-control-label" for="param-rating" >Afficher la cote</label>
        </div>
        <div class="custom-control custom-switch form-group">
            <input class="custom-control-input" type="checkbox" id="param-writer" v-model="settings.song.showWriter">
            <label class="custom-control-label" for="param-writer" >Afficher l'auteur</label>
        </div>
        <div class="custom-control custom-switch form-group">
            <input class="custom-control-input" type="checkbox" id="param-composer" v-model="settings.song.showComposer">
            <label class="custom-control-label" for="param-composer" >Afficher le compositeur</label>
        </div>
        <div class="custom-control custom-switch form-group">
            <input class="custom-control-input" type="checkbox" id="param-publisher" v-model="settings.song.showPublisher">
            <label class="custom-control-label" for="param-publisher" >Afficher l'éditeur</label>
        </div>
        <div class="form-group row">
            <label for="param-verse-opacity" class="col-sm-2 col-form-label">Couplet caché</label>
            <div class="col-sm-10 d-flex"><input aria-describedby="param-verse-opacity-help" type="range" v-model="settings.song.verseOpacity" id="param-verse-opacity" class="form-control-range" min="0" max="0.9" step="0.01"></div>
            <small id="param-verse-opacity-help" class="form-text text-muted col-12">Change la transparence des couplets et traductions quand ils sont cachés à {{ settings.song.verseOpacity }} sur 1 (0 = totalement invisible)</small>
        </div>

        <hr>

        <h5>Recherche de partition</h5>
        <div class="custom-control custom-switch form-group">
            <input class="custom-control-input" type="checkbox" id="search-score-enabled" v-model="settings.score.enabled" >
            <label class="custom-control-label" for="search-score-enabled">Afficher les boutons : <div class="btn-group"><button class="btn btn-info btn-sm" aria-disabled="true" style="pointer-events: none;"><font-awesome-icon :icon="'file-pdf'"></font-awesome-icon></button> <button class="btn btn-info btn-sm" aria-disabled="true" style="pointer-events: none;"><font-awesome-icon :icon="['fab','google']"></font-awesome-icon></button> <button class="btn btn-info btn-sm" aria-disabled="true" style="pointer-events: none;"><font-awesome-icon :icon="['fab','youtube']"></font-awesome-icon></button></div></label>
        </div>
        <div class="form-group row">
            <label for="search-score-query" class="col-sm-2 col-form-label">Lien</label>
            <div class="col-sm-10">
                <input @keyup.stop type="text" name="search-score-query" aria-describedby="search-score-query-help" id="search-score-query" class="form-control" v-model="settings.score.query">
            </div>
            <small id="search-score-query-help" class="form-text text-muted col-12">Insérer <em>&lt;TITRE&gt;</em> où doit être ajouté le nom du chant recherché</small>
        </div>

        <hr>

        <h5>Raccourcis clavier</h5>
        <div class="form-group row">
            <label for="short-next" class="col-sm-3 col-form-label">Suivant</label>
            <div class="col-sm-9 d-flex"><input aria-describedby="short-next-help" type="text" @keyup="manageKey" v-model="settings.shortcuts.playlistNext" id="short-next" class="form-control"></div>
            <small id="short-next-help" class="form-text text-muted col-12">Affiche l'élément suivant de la playlist</small>
        </div>
        <div class="form-group row">
            <label for="short-previous" class="col-sm-3 col-form-label">Précédent</label>
            <div class="col-sm-9 d-flex"><input aria-describedby="short-previous-help" type="text" @keyup="manageKey" v-model="settings.shortcuts.playlistPrevious" id="short-previous" class="form-control"></div>
            <small id="short-previous-help" class="form-text text-muted col-12">Affiche l'élément précédent de la playlist</small>
        </div>
        <div class="form-group row">
            <label for="short-close-sidebox" class="col-sm-3 col-form-label">Fermer</label>
            <div class="col-sm-9 d-flex"><input aria-describedby="short-close-sidebox-help" type="text" id="short-close-sidebox" class="form-control" disabled value="Echap"></div>
            <small id="short-close-sidebox-help" class="form-text text-muted col-12">Ferme la fenêtre latérale (Paramètres ou Aperçu)</small>
        </div>
    </form>

    <hr>

    <p class="text-muted">Scrolleur-Chanteur version {{version}} (<a href="https://github.com/clementh44/scrolleur-chanteur" target="_blank">GitHub</a>)</p>
</div>
</template>

<script>
export default {
    name: "Settings",
    data() {
        return {
            version : process.env.VUE_APP_VERSION
        }
    },
    props: {
        settings: Object
    },
    methods: {
        manageKey(event) {
            if (event.key != "Escape") {
                switch (event.target.id) {
                    case "short-next":
                        this.settings.shortcuts.playlistNext = event.key
                        break;
                    case "short-previous":
                        this.settings.shortcuts.playlistPrevious = event.key
                        break;
                
                    default:
                        break;
                }
                event.preventDefault()
            }
        }
    }
}
</script>

<style>

</style>