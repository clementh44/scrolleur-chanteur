<template>
<div class="btn-group">
    <slot name="first"/>

    <template v-if="settings.score.enabled && element.type == 'song'">
        <button class="btn btn-info btn-sm" @click="$emit('search-score', {title: element.title, query: settings.score.query})" title="Rechercher la partition via le lien personnalisé"><font-awesome-icon :icon="'file-pdf'"/></button>
        <button class="btn btn-info btn-sm" @click="$emit('search-score', {title: element.title, query: settings.score.google})" title="Rechercher en pdf sur google"><font-awesome-icon :icon="['fab','google']"/></button>
        <button class="btn btn-info btn-sm" @click="$emit('search-score', {title: element.title, query: settings.score.youtube})" title="Rechercher sur youtube"><font-awesome-icon :icon="['fab','youtube']"/></button>
    </template>
    <button class="btn btn-light btn-sm" @click="$emit('preview', element)" title="Afficher dans la fenêtre d'aperçu"><font-awesome-icon :icon="'eye'"/></button>
    <button class="btn btn-light btn-sm" @click="$emit('display', element)" title="Afficher dans la fenêtre de présentation"><font-awesome-icon :icon="'desktop'"/></button>

    <slot name="end"/>
</div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faDesktop, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faYoutube } from '@fortawesome/free-brands-svg-icons'

library.add(faEye, faDesktop, faFilePdf, faGoogle, faYoutube)

export default {
    name: "ElementActions",
    props: {
        settings: Object,
        element: Object
    }
}
</script>

<style>

</style>