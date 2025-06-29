<template>
  <div v-if="open">
    <slot></slot>
  </div>
</template>

<script>
function copyStyles(sourceDoc, targetDoc) {
  Array.from(sourceDoc.styleSheets, (styleSheet) => {
    if (styleSheet.cssRules) {
      // for <style> elements
      const newStyleEl = sourceDoc.createElement("style")

      Array.from(styleSheet.cssRules, (cssRule) => {
        // write the text of each rule into the body of the style element
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText))
      })

      targetDoc.head.appendChild(newStyleEl)
    } else if (styleSheet.href) {
      // for <link> elements loading CSS from a URL
      const newLinkEl = sourceDoc.createElement("link")

      newLinkEl.rel = "stylesheet"
      newLinkEl.href = styleSheet.href
      targetDoc.head.appendChild(newLinkEl)
    }
  })
}

export default {
  name: "window-portal",
  model: {
    prop: "open",
    event: "close",
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 600,
    },
    height: {
      type: Number,
      default: 400,
    },
  },
  data() {
    return {
      windowRef: null,
    }
  },
  watch: {
    open: function (newOpen) {
      if (newOpen) {
        this.openPortal()
      } else {
        this.closePortal()
      }
    },
  },
  methods: {
    openPortal: function () {
      this.windowRef = window.open("", "scrolleur-chanteur-live", `width=${this.width},height=${this.height},left=200,top=200`)
      this.windowRef.document.body.innerHTML = ""
      this.windowRef.document.body.appendChild(this.$el)
      copyStyles(window.document, this.windowRef.document)
      this.windowRef.addEventListener("beforeunload", this.closePortal)
      this.windowRef.addEventListener("keydown", (event) => this.$emit("shortcuts", event))
    },
    closePortal: function () {
      if (this.windowRef) {
        this.windowRef.close()
        this.windowRef = null
        this.$emit("close")
      }
    },
  },
  mounted() {
    if (this.open) {
      this.openPortal()
    }
  },
  beforeDestroy() {
    if (this.windowRef) {
      this.closePortal()
    }
  },
}
</script>

<style>
/* SCROLLBAR */
::-webkit-scrollbar {
  width: 3px;
}
::-webkit-scrollbar-thumb {
  background-color: rgb(100 100 100);
}
::-webkit-scrollbar-track {
  background-color: rgb(127 127 127 / 50%);
}
html,
body,
div {
  scrollbar-width: thin;
  scrollbar-color: rgb(127 127 127 / 50%) rgb(100 100 100);
}
</style>
