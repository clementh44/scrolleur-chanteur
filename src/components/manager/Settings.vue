<template>
<div>
    <form>
        <div class="form-group row">
            <label for="param-theme" class="col-sm-2 col-form-label">Thème</label>
            <div class="col-sm-10"><select v-model="settings.viewTheme" id="param-theme" class="form-control"><option v-for="(theme, index) in settings.viewThemes" :key="index" :value="theme.value">{{ theme.text }}</option></select></div>
        </div>
        <hr>
        <h5>Chants</h5>
        <div class="form-group row">
            <label for="param-padding" class="col-sm-2 col-form-label">Marges</label>
            <div class="col-sm-10"><select aria-describedby="param-padding-help" v-model="settings.padding" id="param-padding" class="form-control"><option v-for="(padding, index) in settings.paddings" :key="index" :value="padding.value">{{ padding.text }}</option></select></div>
            <small id="param-padding-help" class="form-text text-muted col-12">Marge à gauche et droite du chant</small>
        </div>
        <div class="form-group row">
            <label for="param-font-size" class="col-sm-2 col-form-label">Taille</label>
            <div class="col-sm-10 d-flex"><input aria-describedby="param-font-size-help" type="range" v-model="settings.fontSize" id="param-font-size" class="form-control-range" min="0.5" max="2" step="0.1"/></div>
            <small id="param-font-size-help" class="form-text text-muted col-12">Taille de la police d'écriture multipliée par {{ settings.fontSize }}</small>
        </div>
        <div class="custom-control custom-switch form-group">
            <input class="custom-control-input" type="checkbox" id="param-title" v-model="settings.viewTitle">
            <label class="custom-control-label" for="param-title" >Afficher le titre</label>
        </div>

        <hr>

        <h5>Recherche de partition</h5>
        <div class="custom-control custom-switch form-group">
            <input class="custom-control-input" type="checkbox" id="search-score-enabled" v-model="settings.score.enabled" >
            <label class="custom-control-label" for="search-score-enabled">Afficher le bouton</label>
        </div>
        <div class="form-group row">
            <label for="search-score-query" class="col-sm-2 col-form-label">Lien</label>
            <div class="col-sm-10">
                <input type="text" name="search-score-query" aria-describedby="search-score-query-help" id="search-score-query" class="form-control" v-model="settings.score.query">
            </div>
            <small id="search-score-query-help" class="form-text text-muted col-12">Insérer &lt;TITRE&gt; où doit être ajouté le nom du chant recherché</small>
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
    }
}
</script>

<style>

</style>