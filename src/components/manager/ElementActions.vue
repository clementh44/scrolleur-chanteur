<template>
  <b-button-group>
    <slot name="first"></slot>

    <template v-if="settings.score.enabled && element.type == 'song'">
      <b-button
        variant="info"
        @click="
          $emit('search-score', {
            title: element.title,
            query: settings.score.query
          })
        "
        title="Rechercher la partition via le lien personnalisé"
      >
        <font-awesome-icon :icon="'file-pdf'"></font-awesome-icon>
      </b-button>
      <b-button
        variant="info"
        @click="
          $emit('search-score', {
            title: element.title,
            query: settings.score.googlePdf
          })
        "
        title="Rechercher en pdf sur google"
      >
        <font-awesome-icon :icon="['fab', 'google']"></font-awesome-icon>
      </b-button>
      <b-button
        variant="info"
        @click="
          $emit('search-score', {
            title: element.title,
            query: settings.score.youtube
          })
        "
        title="Rechercher sur youtube"
      >
        <font-awesome-icon :icon="['fab', 'youtube']"></font-awesome-icon>
      </b-button>
    </template>
    <b-button variant="light" @click="$emit('preview', element)" title="Afficher dans la fenêtre d'aperçu">
      <font-awesome-icon :icon="'eye'"></font-awesome-icon>
    </b-button>

    <slot name="end"></slot>
  </b-button-group>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core"
import { faEye, faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { faGoogle, faYoutube } from "@fortawesome/free-brands-svg-icons"

library.add(faEye, faFilePdf, faGoogle, faYoutube)

export default {
  name: "ElementActions",
  props: {
    settings: Object,
    element: Object
  }
}
</script>

<style></style>
