<template>
  <div
    id="scrollable-content"
    class="h-100 overflow-auto"
    :style="[
      live
        ? {
            cursor: smallCursor,
            background: settings.liveView.colors.background,
            color: settings.liveView.colors.text
          }
        : '',
      live ? bordersStyle() : ''
    ]"
    @scroll.passive="handleScroll()"
  >
    <div :class="[live ? 'user-select-none' : '']">
      <transition name="fade" :duration="duration">
        <div
          key="{{element.title}}"
          v-if="element.type == 'song'"
          :class="['song', live ? 'px-' + settings.liveView.padding : '']"
          :style="[live ? { fontSize: settings.liveView.fontSize + 'em' } : '']"
        >
          <div class="title mb-1" v-show="!live || settings.song.showTitle">{{ element.title }}</div>
          <div class="secli" v-show="haveSecliToShow()">{{ getSecliString() }}</div>

          <div
            v-for="(lyrics, index) in element.lyrics"
            :key="index"
            :class="['song-part', lyrics.type, { show: lyrics.show, sticky: lyrics.sticky }]"
            :style="[
              lyrics.type == 'chorus' || lyrics.show ? '' : { opacity: settings.song.verseOpacity },
              lyrics.sticky ? (live ? { background: settings.liveView.colors.background } : { background: '#FFFFFF' }) : ''
            ]"
            @click="toggleLyrics(lyrics)"
            >{{ lyrics.text }}</div
          >
          <div id="invisible-part" v-if="live">&#8205;</div>
        </div>

        <div
          key="text"
          v-else-if="element.type == 'text'"
          :class="['custom-text', live ? 'px-' + settings.liveView.padding : '']"
          :style="[live ? { fontSize: settings.liveView.fontSize + 'em' } : '']"
        >
          <div class="title" v-if="element.isTitleDisplayed">{{ element.title }}</div>
          <div class="custom-text-body">{{ element.text }}</div>
          <div id="invisible-part" class="custom-text-body" v-if="live">&#8205;</div>
        </div>

        <div key="file" v-else-if="element.type == 'file'" class="file">
          <img :src="element.file" :style="{ width: element.width + '%' }" />
        </div>

        <table v-else-if="element.type == 'grid'" id="screenTable">
          <tbody>
            <tr v-for="(line, index) in 10" :key="index">
              <td v-for="(column, index) in 10" :key="index">&nbsp;</td>
            </tr>
          </tbody>
        </table>

        <div v-else-if="element.type == 'error'" class="alert alert-danger m-5" role="alert">
          <h4 class="alert-heading">Aucune donnée à afficher</h4>
          <hr />
          <p>{{ element.text }}</p>
        </div>
      </transition>

      <div class="empty" :style="[{ background: settings.liveView.colors.empty }]" v-if="live"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewWindow",
  props: {
    element: Object,
    settings: Object,
    live: Boolean,
    duration: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      smallCursor: `url("data:image/svg+xml, %3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='32px' height='32px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E  %3Ctext stroke='%23ffffff' transform='matrix(12.617019653320312,0,0,12.617019653320312,-2852.15984082222,-2618.911868095398) ' xml:space='preserve' text-anchor='start' font-family='Helvetica, Arial, sans-serif' font-size='40' y='247.63125' x='229.70045' stroke-width='2' fill='%23000000'%3E•%3C/text%3EE %3C/svg%3E") 8 20, pointer`
    }
  },
  components: {},
  methods: {
    toggleLyrics: function(lyrics) {
      switch (lyrics.type) {
        case "chorus":
          lyrics.sticky = !lyrics.sticky
          break
        case "verse":
        case "translation":
          lyrics.show = !lyrics.show
          break
        default:
          break
      }
    },
    getSecliArray: function() {
      let array = []
      if ((!this.live || this.settings.song.showRating) && this.element.rating) {
        array.push(this.element.rating)
      }
      if (this.settings.song.showRating && this.element.newrating) {
        if (array.length > 0) {
          array.push("/")
        }
        array.push(this.element.newrating)
      }

      if ((!this.live || this.settings.song.showWriter) && this.element.writer) {
        if (array.length > 0) {
          array.push(" | ")
        }
        array.push("Paroles : " + this.element.writer)
      }

      if ((!this.live || this.settings.song.showComposer) && this.element.composer) {
        if (array.length > 0) {
          array.push(" | ")
        }
        array.push("Musique : " + this.element.composer)
      }

      if ((!this.live || this.settings.song.showPublisher) && this.element.publisher) {
        if (array.length > 0) {
          array.push(" | ")
        }
        array.push("Éditeur : " + this.element.publisher)
      }
      return array
    },
    haveSecliToShow: function() {
      return this.getSecliArray().length > 0
    },
    getSecliString: function() {
      return this.getSecliArray().join("")
    },
    bordersStyle: function() {
      var hasBorder = false
      switch (this.element.type) {
        case "empty":
          hasBorder = this.settings.liveView.borders.empty
          break
        case "song":
          hasBorder = this.settings.liveView.borders.song
          break
        case "file":
          hasBorder = this.settings.liveView.borders.file
          break
        case "text":
          hasBorder = this.settings.liveView.borders.text
          break
      }
      if (hasBorder) {
        var styles = {}
        if (this.settings.liveView.borders.top.displayed) {
          styles.borderTop = this.settings.liveView.borders.top.width + "px " + this.settings.liveView.borders.top.style + " " + this.settings.liveView.borders.top.color
        }
        if (this.settings.liveView.borders.right.displayed) {
          styles.borderRight = this.settings.liveView.borders.right.width + "px " + this.settings.liveView.borders.right.style + " " + this.settings.liveView.borders.right.color
        }
        if (this.settings.liveView.borders.bottom.displayed) {
          styles.borderBottom = this.settings.liveView.borders.bottom.width + "px " + this.settings.liveView.borders.bottom.style + " " + this.settings.liveView.borders.bottom.color
        }
        if (this.settings.liveView.borders.left.displayed) {
          styles.borderLeft = this.settings.liveView.borders.left.width + "px " + this.settings.liveView.borders.left.style + " " + this.settings.liveView.borders.left.color
        }
        return styles
      } else {
        return ""
      }
    },
    //actualise les éléments visibles ou non d'un chant
    handleScroll() {
      if (this.element.type == "song") {
        let windowLyrics = this.$el.ownerDocument.getElementsByClassName("song-part") //liste des blocs dans le DOM (verse, chorus, translation)
        let lyrics = this.element.lyrics //liste des blocs dans les données
        if (windowLyrics.length != lyrics.length) {
          return
        }
        let windowHeight = this.$el.ownerDocument.getElementById("scrollable-content").clientHeight //hauteur de la fenêtre
        let lastStickyHeight = 0
        let unique = false
        let lineHeight = this.$el.ownerDocument.getElementById("invisible-part").clientHeight
        let activeIndex = -1
        let lastStickyIndex = -1
        lyrics.forEach((part, i) => {
          if (part.type != "chorus" || (part.type == "chorus" && !part.sticky)) {
            if (unique) {
              part.isActive = false
            } else {
              let DOMrect = windowLyrics[i].getBoundingClientRect() //récupération de la taille et de la position de l'élément dans la fenêtre
              part.isActive = DOMrect.top < windowHeight - lineHeight && DOMrect.bottom > lastStickyHeight + lineHeight //un couplet, une traduction ou un refrain non statique est actif si c'est le premier (unique) élément an partant du haut de la fenêtre (ou juste en dessous d'un refrain statique) et que l'on voit encore 1 ligne
              if (part.isActive) {
                unique = true
                activeIndex = i
              }
            }
          } else {
            part.isActive = false
            if (part.sticky) {
              lastStickyHeight = windowLyrics[i].offsetHeight
              lastStickyIndex = i
            }
          }
        })

        //parcours des refrains avant le dernier élément actif pour le rendre actif s'il est statique
        for (let index = activeIndex - 1; index >= 0; index--) {
          const part = lyrics[index]
          if (part.type == "chorus" && part.sticky) {
            part.isActive = true
            index = -1
          }
        }

        if (activeIndex < 0 && lastStickyIndex >= 0) {
          //s'il n'y a aucun élément actif, on vérifie si un refrain statique est affiché
          let DOMrect = windowLyrics[lastStickyIndex].getBoundingClientRect() //récupération de la taille et de la position de l'élément dans la fenêtre
          lyrics[lastStickyIndex].isActive = DOMrect.top < windowHeight - lineHeight && DOMrect.bottom > lineHeight
        }
      }
    },
    getlastActivePartIndex() {
      //Retourne l'index de la dernière partie (verse, chorus, translation) du chant qui est active (visible dans la présentation)
      if (this.element.type == "song") {
        let stickyIndex = -1
        let i = this.element.lyrics.length - 1
        while (i >= 0) {
          let part = this.element.lyrics[i]
          if (part.sticky && stickyIndex < 0) {
            stickyIndex = i
          } else if (part.isActive) {
            return i
          }
          i--
        }
        return stickyIndex
      }
      return -1
    },
    getNextPartIndex() {
      return this.getlastActivePartIndex() + 1
    },
    getPreviousPartIndex() {
      let previousPartIndex = this.getlastActivePartIndex()
      if (previousPartIndex == -1) {
        return this.element.lyrics.length - 1
      }

      do {
        previousPartIndex--
      } while (previousPartIndex > 0 && this.element.lyrics[previousPartIndex].isActive)
      return previousPartIndex
    },
    scrollNextPart() {
      this.scrollViewToPos(this.getNextPartIndex())
    },
    scrollPreviousPart() {
      this.scrollViewToPos(this.getPreviousPartIndex())
    },
    scrollTop() {
      this.scroll(-99999, 0, false)
    },
    getLineHeight() {
      if (this.$el.ownerDocument.getElementById("invisible-part")) {
        return this.$el.ownerDocument.getElementById("invisible-part").clientHeight
      } else {
        return 16
      }
    },
    scrollDown() {
      if (["song", "text", "file"].includes(this.element.type)) {
        this.scroll(this.getLineHeight(), 0, true)
      }
    },
    scrollUp() {
      if (["song", "text", "file"].includes(this.element.type)) {
        this.scroll(-this.getLineHeight(), 0, true)
      }
    },
    scroll(top, left, smooth) {
      this.$el.scrollBy({
        top: top,
        left: left,
        behavior: smooth ? "smooth" : "auto"
      })
    },
    /* Scroll to the position in the song */
    scrollViewToPos(pos) {
      if (this.element.type == "song") {
        let DOMelements = this.$el.getElementsByClassName("song-part") //liste des blocs (verse, chorus, translation)
        if (pos < 0 || pos > DOMelements.length) {
          console.warn("I'm not suppose to be here...")
          return
        }

        //hauteur de l'élément sticky (chorus) qui est plus haut
        let getLastStickyHeight = (pos, DOMelements) => {
          let stickyHeight = 0
          let searchSticky = pos
          while (searchSticky >= 0) {
            let lyrics = this.element.lyrics[searchSticky]
            if (lyrics.type == "chorus" && lyrics.sticky) {
              let stickyElement = DOMelements[searchSticky]
              if (stickyElement.offsetHeight + this.getLineHeight() * 2 > this.$el.ownerDocument.getElementById("scrollable-content").clientHeight) {
                this.element.lyrics[searchSticky].sticky = false //on détache le chorus (sticky=false) si sa hauteur dépasse la hauteur de la fenêtre
              } else {
                stickyHeight = stickyElement.offsetHeight
              }
              searchSticky = 0 //pour sortir de la boucle
            }
            searchSticky--
          }
          return stickyHeight
        }

        let stickyHeight = 0 //hauteur de l'élément sticky (chorus) qui est plus haut
        let scrollHeight = 0 //hauteur du scroll

        if (pos == DOMelements.length) {
          //si on est au bout du contenu -> afficher uniquement le dernier élément sticky ou afficher le vide
          if (DOMelements[pos - 1].classList.contains("chorus")) {
            //si le dernier élément est un chorus -> vide
            scrollHeight = DOMelements[pos - 1].offsetTop + DOMelements[pos - 1].offsetHeight
          } else {
            //sinon, on récupère le dernier sticky
            scrollHeight = DOMelements[pos - 1].offsetTop + DOMelements[pos - 1].offsetHeight - getLastStickyHeight(pos - 1, DOMelements)
          }
        } else {
          if (!DOMelements[pos].classList.contains("chorus")) {
            //récupération de l'hauteur de l'element sticky plus haut
            stickyHeight = getLastStickyHeight(pos - 1, DOMelements)
          }
          scrollHeight = DOMelements[pos].offsetTop - stickyHeight - DOMelements[pos].parentElement.parentElement.parentElement.scrollTop
          if (this.settings.liveView.borders.song && this.settings.liveView.borders.top.displayed) {
            scrollHeight -= this.settings.liveView.borders.top.width
          }
        }
        this.scroll(scrollHeight, 0, true)
      } else {
        console.warn("scrollViewToPos function : the element has to be a song")
      }
    }
  }
}
</script>

<style scoped src="./ViewWindow.css"></style>
