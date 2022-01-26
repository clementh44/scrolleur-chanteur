<template>
  <div>
    <form>
      <h4>Fenêtre de présentation</h4>
      <b-form-group
        label-cols-sm="2"
        label="Taille"
        content-cols-sm="10"
        description="Dimensions en pixel de la présentation à son ouverture (largeur x hauteur). Fermer/ouvrir la présentation pour appliquer"
      >
        <b-input-group>
          <b-form-input @keydown.stop type="number" v-model.number="settings.liveView.window.width"></b-form-input>
          <b-input-group-prepend is-text style="margin-left: -1px">x</b-input-group-prepend>
          <b-form-input @keydown.stop type="number" v-model.number="settings.liveView.window.height"></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label-cols-sm="2" label="Thème" content-cols-sm="10" description="Choisir un thème pédéfini ou personnaliser les couleurs ci-dessous.">
        <b-form-select v-model="settings.liveView.colors">
          <b-form-select-option
            v-for="(theme, index) in defaultSettings.liveView.viewThemes"
            :key="index"
            :value="{
              background: theme.value.background,
              text: theme.value.text,
              empty: theme.value.empty,
            }"
            :style="{ color: theme.value.text, backgroundColor: theme.value.background }"
            >{{ theme.text }}</b-form-select-option
          >
        </b-form-select>
      </b-form-group>
      <b-form-group label-cols-sm="2" label="Fond" content-cols-sm="3">
        <b-form-input type="color" v-model="settings.liveView.colors.background"></b-form-input>
      </b-form-group>
      <b-form-group label-cols-sm="2" label="Texte" content-cols-sm="3">
        <b-form-input type="color" v-model="settings.liveView.colors.text"></b-form-input>
      </b-form-group>
      <b-form-group label-cols-sm="2" label="Vide" content-cols-sm="3">
        <b-form-input type="color" v-model="settings.liveView.colors.empty"></b-form-input>
      </b-form-group>

      <hr />

      <h5 v-b-toggle.collapse-borders class="d-flex justify-content-between"
        >Bordures personnalisées
        <font-awesome-icon class="pull-right when-open" :icon="'chevron-up'"></font-awesome-icon>
        <font-awesome-icon class="pull-right when-closed" :icon="'chevron-down'"></font-awesome-icon
      ></h5>
      <b-collapse id="collapse-borders">
        <b-form-group>
          <b-form-checkbox v-model="settings.liveView.borders.empty" switch>Afficher avec le contenu vide</b-form-checkbox>
          <b-form-checkbox v-model="settings.liveView.borders.song" switch>Afficher avec les chants</b-form-checkbox>
          <b-form-checkbox v-model="settings.liveView.borders.text" switch>Afficher avec les textes personnalisés</b-form-checkbox>
          <b-form-checkbox v-model="settings.liveView.borders.file" switch>Afficher avec les fichiers</b-form-checkbox>
        </b-form-group>

        <h6>Haut</h6>
        <b-form-group>
          <b-form-checkbox v-model="settings.liveView.borders.top.displayed" switch>Visible</b-form-checkbox>
        </b-form-group>
        <template v-if="settings.liveView.borders.top.displayed">
          <b-form-group>
            <b-form-checkbox v-model="allBorders" switch>Modifier les 4 côtés en même temps</b-form-checkbox>
          </b-form-group>
          <b-form-group label-cols-sm="3" label="Couleur" content-cols-sm="3">
            <b-form-input type="color" v-model="settings.liveView.borders.top.color"></b-form-input>
          </b-form-group>
          <b-row>
            <b-col sm="3">
              <label for="param-border-top-width">Épaisseur {{ settings.liveView.borders.top.width }}px</label>
            </b-col>
            <b-col sm="9">
              <b-form-input type="range" v-model="settings.liveView.borders.top.width" id="param-border-top-width" min="1" max="100" step="1"></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3">
              <label for="param-border-top-style">Style</label>
            </b-col>
            <b-col sm="9">
              <b-form-select v-model="settings.liveView.borders.top.style" :options="settings.liveView.borders.styles" id="param-border-top-style"></b-form-select>
            </b-col>
          </b-row>
        </template>

        <template v-if="!allBorders">
          <h6>Droite</h6>
          <b-form-group>
            <b-form-checkbox v-model="settings.liveView.borders.right.displayed" switch>Visible</b-form-checkbox>
          </b-form-group>
          <template v-if="settings.liveView.borders.right.displayed">
            <b-form-group label-cols-sm="3" label="Couleur" content-cols-sm="3">
              <b-form-input type="color" v-model="settings.liveView.borders.right.color"></b-form-input>
            </b-form-group>
            <b-row>
              <b-col sm="3">
                <label for="param-border-right-width">Épaisseur {{ settings.liveView.borders.right.width }}px</label>
              </b-col>
              <b-col sm="9">
                <b-form-input type="range" v-model="settings.liveView.borders.right.width" id="param-border-right-width" min="1" max="100" step="1"></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="3">
                <label for="param-border-right-style">Style</label>
              </b-col>
              <b-col sm="9">
                <b-form-select v-model="settings.liveView.borders.right.style" :options="settings.liveView.borders.styles" id="param-border-right-style"></b-form-select>
              </b-col>
            </b-row>
          </template>

          <h6>Bas</h6>
          <b-form-group>
            <b-form-checkbox v-model="settings.liveView.borders.bottom.displayed" switch>Visible</b-form-checkbox>
          </b-form-group>
          <template v-if="settings.liveView.borders.bottom.displayed">
            <b-form-group label-cols-sm="3" label="Couleur" content-cols-sm="3">
              <b-form-input type="color" v-model="settings.liveView.borders.bottom.color"></b-form-input>
            </b-form-group>
            <b-row>
              <b-col sm="3">
                <label for="param-border-bottom-width">Épaisseur {{ settings.liveView.borders.bottom.width }}px</label>
              </b-col>
              <b-col sm="9">
                <b-form-input type="range" v-model="settings.liveView.borders.bottom.width" id="param-border-bottom-width" min="1" max="100" step="1"></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="3">
                <label for="param-border-bottom-style">Style</label>
              </b-col>
              <b-col sm="9">
                <b-form-select v-model="settings.liveView.borders.bottom.style" :options="settings.liveView.borders.styles" id="param-border-bottom-style"></b-form-select>
              </b-col>
            </b-row>
          </template>

          <h6>Gauche</h6>
          <b-form-group>
            <b-form-checkbox v-model="settings.liveView.borders.left.displayed" switch>Visible</b-form-checkbox>
          </b-form-group>
          <template v-if="settings.liveView.borders.left.displayed">
            <b-form-group label-cols-sm="3" label="Couleur" content-cols-sm="3">
              <b-form-input type="color" v-model="settings.liveView.borders.left.color"></b-form-input>
            </b-form-group>
            <b-row>
              <b-col sm="3">
                <label for="param-border-left-width">Épaisseur {{ settings.liveView.borders.left.width }}px</label>
              </b-col>
              <b-col sm="9">
                <b-form-input type="range" v-model="settings.liveView.borders.left.width" id="param-border-left-width" min="1" max="100" step="1"></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="3">
                <label for="param-border-left-style">Style</label>
              </b-col>
              <b-col sm="9">
                <b-form-select v-model="settings.liveView.borders.left.style" :options="settings.liveView.borders.styles" id="param-border-left-style"></b-form-select>
              </b-col>
            </b-row>
          </template>
        </template>
      </b-collapse>

      <hr />

      <h5>Chant et texte personnalisé</h5>
      <b-form-group label-cols-sm="2" label="Marges" content-cols-sm="10" description="Marges à gauche et droite du contenu">
        <b-form-input type="range" v-model="settings.liveView.padding.view" min="0" max="5" step="1"></b-form-input>
      </b-form-group>
      <b-form-group label-cols-sm="2" label="Taille" content-cols-sm="10">
        <b-form-input type="range" v-model="settings.liveView.fontSize" min="0.2" max="8" step="0.2"></b-form-input>
        <template #description>Taille de la police d'écriture multipliée par {{ settings.liveView.fontSize }}</template>
      </b-form-group>

      <hr />

      <h5>Chant</h5>
      <b-form-group>
        <b-form-checkbox v-model="settings.song.showTitle" switch>Afficher le titre</b-form-checkbox>
        <b-form-checkbox v-model="settings.song.showRating" switch>Afficher la cote</b-form-checkbox>
        <b-form-checkbox v-model="settings.song.showWriter" switch>Afficher l'auteur</b-form-checkbox>
        <b-form-checkbox v-model="settings.song.showComposer" switch>Afficher le compositeur</b-form-checkbox>
        <b-form-checkbox v-model="settings.song.showPublisher" switch>Afficher l'éditeur</b-form-checkbox>
      </b-form-group>
      <b-form-group label-cols-sm="2" label="Caché" content-cols-sm="10" description="Marges à gauche et droite">
        <b-form-input type="range" v-model="settings.song.verseOpacity" min="0" max="0.9" step="0.01"></b-form-input>
        <template #description>Change la transparence des couplets, traductions et refrains quand ils sont cachés à {{ settings.song.verseOpacity }} sur 1 (0 = totalement invisible)</template>
      </b-form-group>
      <b-form-group label-cols-sm="2" label="Aligner" content-cols-sm="10" description="Alignement du chant affiché dans la présentation">
        <b-form-select v-model="settings.song.textAlign">
          <b-form-select-option value="left">à gauche (par défaut)</b-form-select-option>
          <b-form-select-option value="center">au milieu</b-form-select-option>
        </b-form-select>
      </b-form-group>
      <h6>Couplet uniquement</h6>
      <b-form-group label-cols-sm="2" label="Marge gauche" content-cols-sm="10">
        <b-form-input type="range" v-model="settings.liveView.padding.verse.left" min="0" max="5" step="0.5"></b-form-input>
        <template #description>Espace de {{ settings.liveView.padding.verse.left }} à gauche des couplets</template>
      </b-form-group>
      <b-form-group label-cols-sm="2" label="Marge bas" content-cols-sm="10">
        <b-form-input type="range" v-model="settings.liveView.padding.verse.bottom" min="0" max="5" step="0.5"></b-form-input>
        <template #description>Espace de {{ settings.liveView.padding.verse.bottom }} en bas des couplets</template>
      </b-form-group>
      <h6>Refrain uniquement</h6>
      <b-form-group label-cols-sm="2" label="Marge gauche" content-cols-sm="10">
        <b-form-input type="range" v-model="settings.liveView.padding.chorus.left" min="0" max="5" step="0.5"></b-form-input>
        <template #description>Espace de {{ settings.liveView.padding.chorus.left }} à gauche des refrains</template>
      </b-form-group>
      <b-form-group label-cols-sm="2" label="Marge bas" content-cols-sm="10">
        <b-form-input type="range" v-model="settings.liveView.padding.chorus.bottom" min="0" max="5" step="0.5"></b-form-input>
        <template #description>Espace de {{ settings.liveView.padding.chorus.bottom }} en bas des refrains</template>
      </b-form-group>
      <h6>Traduction uniquement</h6>
      <b-form-group label-cols-sm="2" label="Marge gauche" content-cols-sm="10">
        <b-form-input type="range" v-model="settings.liveView.padding.translation.left" min="0" max="5" step="0.5"></b-form-input>
        <template #description>Espace de {{ settings.liveView.padding.translation.left }} à gauche des traductions</template>
      </b-form-group>
      <b-form-group label-cols-sm="2" label="Marge bas" content-cols-sm="10">
        <b-form-input type="range" v-model="settings.liveView.padding.translation.bottom" min="0" max="5" step="0.5"></b-form-input>
        <template #description>Espace de {{ settings.liveView.padding.translation.bottom }} en bas des traductions</template>
      </b-form-group>

      <hr />

      <h4>Recherche de partition</h4>
      <b-form-group>
        <b-form-checkbox v-model="settings.score.enabled" switch
          >Afficher les boutons :
          <b-button-group>
            <b-button variant="info" size="sm" aria-disabled="true" style="pointer-events: none">
              <font-awesome-icon :icon="'file-pdf'"></font-awesome-icon>
            </b-button>
            <b-button variant="info" size="sm" aria-disabled="true" style="pointer-events: none">
              <font-awesome-icon :icon="['fab', 'google']"></font-awesome-icon>
            </b-button>
            <b-button variant="info" size="sm" aria-disabled="true" style="pointer-events: none">
              <font-awesome-icon :icon="['fab', 'youtube']"></font-awesome-icon>
            </b-button>
          </b-button-group>
        </b-form-checkbox>
      </b-form-group>
      <b-form-group label-cols-sm="2" label="Lien" content-cols-sm="10">
        <b-form-input @keydown.stop type="text" v-model="settings.score.query"></b-form-input>
        <template #description>Insérer <em>&lt;TITRE&gt;</em> où doit être ajouté le nom du chant recherché</template>
      </b-form-group>

      <hr />

      <h4>Raccourcis clavier</h4>
      <b-form-group label-cols-sm="4" label="Suivant" content-cols-sm="8" description="Affiche l'élément suivant de la playlist">
        <b-form-input @keydown="manageKey" v-model="settings.shortcuts.playlistNext"></b-form-input>
      </b-form-group>
      <b-form-group label-cols-sm="4" label="Précédent" content-cols-sm="8" description="Affiche l'élément précédent de la playlist">
        <b-form-input @keydown="manageKey" v-model="settings.shortcuts.playlistPrevious"></b-form-input>
      </b-form-group>
      <b-form-group label-cols-sm="4" label="Descendre" content-cols-sm="8" description="Descendre légèrement dans la présentation">
        <b-form-input @keydown="manageKey" v-model="settings.shortcuts.scrollDown"></b-form-input>
      </b-form-group>
      <b-form-group label-cols-sm="4" label="Monter" content-cols-sm="8" description="Monter légèrement dans la présentation">
        <b-form-input @keydown="manageKey" v-model="settings.shortcuts.scrollUp"></b-form-input>
      </b-form-group>
      <b-form-group label-cols-sm="4" label="Bloc suivant" content-cols-sm="8" description="Passer à la partie suivante dans le chant">
        <b-form-input @keydown="manageKey" v-model="settings.shortcuts.partNext"></b-form-input>
      </b-form-group>
      <b-form-group label-cols-sm="4" label="Bloc précédent" content-cols-sm="8" description="Passer à la partie précédente dans le chant">
        <b-form-input @keydown="manageKey" v-model="settings.shortcuts.partPrevious"></b-form-input>
      </b-form-group>
      <b-form-group label-cols-sm="4" label="Fermer" content-cols-sm="8" description="Ferme la fenêtre latérale (Paramètres ou Aperçu)">
        <b-form-input disabled value="Echap"></b-form-input>
      </b-form-group>
    </form>

    <hr />

    <p class="text-muted"> Scrolleur-Chanteur version {{ version }} (<a href="https://github.com/clementh44/scrolleur-chanteur#dernière-version" target="_blank" rel="noopener">GitHub</a>)</p>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      version: process.env.VUE_APP_VERSION,
      allBorders: false,
    }
  },
  props: {
    settings: Object,
    defaultSettings: Object,
  },
  methods: {
    manageKey: function (event) {
      if (event.key != "Escape") {
        switch (event.target.id) {
          case "short-next":
            this.$set(this.settings.shortcuts, "playlistNext", event.key)
            break
          case "short-previous":
            this.$set(this.settings.shortcuts, "playlistPrevious", event.key)
            break
          case "short-scroll-down":
            this.$set(this.settings.shortcuts, "scrollDown", event.key)
            break
          case "short-scroll-up":
            this.$set(this.settings.shortcuts, "scrollUp", event.key)
            break
          case "short-part-next":
            this.$set(this.settings.shortcuts, "partNext", event.key)
            break
          case "short-part-previous":
            this.$set(this.settings.shortcuts, "partPrevious", event.key)
            break

          default:
            break
        }
        event.preventDefault()
      }
    },
  },
  watch: {
    // Pour lier ou délier les paramètres de style des bordures par rapport à celles du haut
    allBorders: function (linked) {
      if (linked) {
        this.settings.liveView.borders.right = this.settings.liveView.borders.top
        this.settings.liveView.borders.bottom = this.settings.liveView.borders.top
        this.settings.liveView.borders.left = this.settings.liveView.borders.top
      } else {
        this.settings.liveView.borders.right = JSON.parse(JSON.stringify(this.settings.liveView.borders.top))
        this.settings.liveView.borders.bottom = JSON.parse(JSON.stringify(this.settings.liveView.borders.top))
        this.settings.liveView.borders.left = JSON.parse(JSON.stringify(this.settings.liveView.borders.top))
      }
    },
  },
}
</script>

<style>
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
</style>
