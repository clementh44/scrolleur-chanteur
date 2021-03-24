<template>
  <div>
    <b-navbar toggleable="sm" type="light" class="bg-light mb-3">
      <b-navbar-brand :to="{ name: 'home' }">Scrolleur-chanteur</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'home' }">Retourner sur la page d'accueil</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

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
