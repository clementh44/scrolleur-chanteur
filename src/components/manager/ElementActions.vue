<template>
  <div class="btn-group">
    <slot name="first"></slot>

    <template v-if="settings.score.enabled && element.type == 'song'">
      <button
        class="btn btn-info btn-sm"
        @click="
          $emit('search-score', {
            title: element.title,
            query: settings.score.query,
          })
        "
        title="Rechercher la partition via le lien personnalisé"
      >
        <font-awesome-icon :icon="'file-pdf'"></font-awesome-icon>
      </button>
      <button
        class="btn btn-info btn-sm"
        @click="
          $emit('search-score', {
            title: element.title,
            query: settings.score.googlePdf,
          })
        "
        title="Rechercher en pdf sur google"
      >
        <font-awesome-icon :icon="['fab', 'google']"></font-awesome-icon>
      </button>
      <button
        class="btn btn-info btn-sm"
        @click="
          $emit('search-score', {
            title: element.title,
            query: settings.score.youtube,
          })
        "
        title="Rechercher sur youtube"
      >
        <font-awesome-icon :icon="['fab', 'youtube']"></font-awesome-icon>
      </button>
    </template>
    <button
      class="btn btn-light btn-sm"
      @click="$emit('preview', element)"
      title="Afficher dans la fenêtre d'aperçu"
    >
      <font-awesome-icon :icon="'eye'"></font-awesome-icon>
    </button>

    <slot name="end"></slot>
  </div>
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
    element: Object,
  },
}
</script>

<style></style>
