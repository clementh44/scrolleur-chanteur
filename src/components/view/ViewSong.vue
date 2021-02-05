<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-light bg-light mb-3">
      <router-link :to="{ name: 'home' }" class="navbar-brand">
        Scrolleur-chanteur
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link">
              Retourner sur la page d'accueil
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <ViewWindow :element="element" :settings="settings" :live="false"></ViewWindow>
  </div>
</template>

<script>
import Chants from "../../chants.json"
import ViewWindow from "./ViewWindow"

export default {
  name: "ViewSong",
  data() {
    return {
      songs: Chants,
      songId: this.$route.params.id,
      element: {},
      settings: {
        liveView: {
          colors: {
            background: "#FFFFFF",
            text: "#000000",
            empty: "#FFFFFF"
          },
          padding: 0,
          fontSize: 1
        },
        song: {
          showTitle: true,
          showRating: true,
          showWriter: true,
          showComposer: true,
          showPublisher: true,
          verseOpacity: 1
        }
      }
    }
  },
  components: {
    ViewWindow
  },
  methods: {},
  created() {
    if (this.songId) {
      this.element = this.songs.find(function(element) {
        return element.id == this
      }, this.songId)
      if (this.element) {
        this.element.type = "song"
      } else {
        this.element = {
          type: "error",
          text: "Pas de chant trouvé avec comme identifiant '" + this.songId + "'"
        }
      }
    }
  }
}
</script>

<style></style>
