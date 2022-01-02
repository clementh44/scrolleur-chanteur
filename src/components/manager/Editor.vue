<template>
  <div class="editor-bloc">
    <div v-if="editor" class="editor-toolbar">
      <b-button-toolbar>
        <!-- Annuler/rétablir -->
        <b-button-group class="mr-1 mb-1">
          <b-button @click="editor.chain().focus().undo().run()" v-b-tooltip.hover title="Annuler" variant="light">
            <font-awesome-icon icon="reply"></font-awesome-icon>
          </b-button>
          <b-button @click="editor.chain().focus().redo().run()" v-b-tooltip.hover title="Rétablir" variant="light">
            <font-awesome-icon icon="share"></font-awesome-icon>
          </b-button>
        </b-button-group>
        <!-- Style de base -->
        <b-button-group class="mr-1 mb-1">
          <b-button @click="editor.chain().focus().toggleBold().run()" :pressed="editor.isActive('bold')" v-b-tooltip.hover title="Gras" variant="light">
            <font-awesome-icon icon="bold"></font-awesome-icon>
          </b-button>
          <b-button @click="editor.chain().focus().toggleItalic().run()" :pressed="editor.isActive('italic')" v-b-tooltip.hover title="Italique" variant="light">
            <font-awesome-icon icon="italic"></font-awesome-icon>
          </b-button>
          <b-button @click="editor.chain().focus().toggleUnderline().run()" :pressed="editor.isActive('underline')" v-b-tooltip.hover title="Souligner" variant="light">
            <font-awesome-icon icon="underline"></font-awesome-icon>
          </b-button>
          <b-button @click="editor.chain().focus().toggleStrike().run()" :pressed="editor.isActive('strike')" v-b-tooltip.hover title="Barrer" variant="light">
            <font-awesome-icon icon="strikethrough"></font-awesome-icon>
          </b-button>
          <b-button @click="editor.chain().focus().unsetAllMarks().run()" v-b-tooltip.hover title="Supprimer les styles (gras, italique, souligné, barré, couleur)" variant="light">
            <font-awesome-icon icon="remove-format"></font-awesome-icon>
          </b-button>
          <b-dropdown v-b-tooltip.hover title="Taille" variant="light">
            <template #button-content><font-awesome-icon icon="text-height"></font-awesome-icon></template>
            <b-dropdown-item @click="editor.chain().focus().setParagraph().run()" :active="editor.isActive('paragraph')">Normal</b-dropdown-item>
            <b-dropdown-item @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :active="editor.isActive('heading', { level: 1 })"> Titre 1 </b-dropdown-item>
            <b-dropdown-item @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :active="editor.isActive('heading', { level: 2 })"> Titre 2 </b-dropdown-item>
            <b-dropdown-item @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :active="editor.isActive('heading', { level: 3 })"> Titre 3 </b-dropdown-item>
          </b-dropdown>
        </b-button-group>
        <!-- Alignement -->
        <b-button-group class="mr-1 mb-1">
          <b-button @click="editor.chain().focus().setTextAlign('left').run()" :pressed="editor.isActive({ textAlign: 'left' })" v-b-tooltip.hover title="Aligner à gauche" variant="light">
            <font-awesome-icon icon="align-left"></font-awesome-icon>
          </b-button>
          <b-button @click="editor.chain().focus().setTextAlign('center').run()" :pressed="editor.isActive({ textAlign: 'center' })" v-b-tooltip.hover title="Centrer" variant="light">
            <font-awesome-icon icon="align-center"></font-awesome-icon>
          </b-button>
          <b-button @click="editor.chain().focus().setTextAlign('right').run()" :pressed="editor.isActive({ textAlign: 'right' })" v-b-tooltip.hover title="Aligner à droite" variant="light">
            <font-awesome-icon icon="align-right"></font-awesome-icon>
          </b-button>
          <b-button @click="editor.chain().focus().setTextAlign('justify').run()" :pressed="editor.isActive({ textAlign: 'justify' })" v-b-tooltip.hover title="Justifier" variant="light">
            <font-awesome-icon icon="align-justify"></font-awesome-icon>
          </b-button>
        </b-button-group>
        <!-- Couleur -->
        <b-button-group class="mr-1 mb-1">
          <b-button v-b-tooltip.hover title="Changer la couleur de la sélection" variant="light">
            <font-awesome-icon icon="tint" :style="{ color: editor.getAttributes('textStyle').color }"></font-awesome-icon>
            <input type="color" class="hidden-input-color" @input="editor.chain().focus().setColor($event.target.value).run()" v-model="editor.getAttributes('textStyle').color" />
          </b-button>
          <b-button @click="editor.chain().focus().unsetColor().run()" v-b-tooltip.hover title="Supprimer la couleur de la sélection" variant="light">
            <font-awesome-icon icon="tint-slash"></font-awesome-icon>
          </b-button>
        </b-button-group>
        <!-- Style block -->
        <b-button-group class="mr-1 mb-1">
          <b-button @click="editor.chain().focus().toggleBulletList().run()" :pressed="editor.isActive('bulletList')" v-b-tooltip.hover title="Liste" variant="light">
            <font-awesome-icon icon="list-ul"></font-awesome-icon>
          </b-button>
          <b-button @click="editor.chain().focus().toggleOrderedList().run()" :pressed="editor.isActive('orderedList')" v-b-tooltip.hover title="Liste ordonnée" variant="light">
            <font-awesome-icon icon="list-ol"></font-awesome-icon>
          </b-button>
          <b-button @click="editor.chain().focus().toggleBlockquote().run()" :pressed="editor.isActive('blockquote')" v-b-tooltip.hover title="Citation" variant="light">
            <font-awesome-icon icon="quote-right"></font-awesome-icon>
          </b-button>
          <b-button @click="editor.chain().focus().clearNodes().run()" v-b-tooltip.hover title="Supprimer le style du bloc (liste, citation, titre...)" variant="light">
            <font-awesome-icon icon="remove-format"></font-awesome-icon>
          </b-button>
        </b-button-group>
        <!-- Ligne horizontale et retour à la ligne -->
        <b-button-group class="mr-1 mb-1">
          <b-button @click="editor.chain().focus().setHorizontalRule().run()" v-b-tooltip.hover title="Ligne horizontale" variant="light"> — </b-button>
          <b-button @click="editor.chain().focus().setHardBreak().run()" v-b-tooltip.hover title="Retour à la ligne (sans nouveau paragraphe) Shift+Entrée ou Maj+Entrée" variant="light">
            <font-awesome-icon icon="level-down-alt" rotation="90"></font-awesome-icon>
          </b-button>
        </b-button-group>
        <!-- Aide -->
        <b-button-group class="mr-1 mb-1">
          <b-button v-b-tooltip.hover.html="helpTip" title="Aide" variant="light">
            <font-awesome-icon icon="info"></font-awesome-icon>
          </b-button>
        </b-button-group>
      </b-button-toolbar>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2"
import StarterKit from "@tiptap/starter-kit"
import TextStyle from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Typography from "@tiptap/extension-typography"
import Blockquote from "@tiptap/extension-blockquote"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import Heading from "@tiptap/extension-heading"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faReply,
  faShare,
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faRemoveFormat,
  faTint,
  faTintSlash,
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faTextHeight,
  faListUl,
  faListOl,
  faQuoteRight,
  faLevelDownAlt,
  faInfo,
} from "@fortawesome/free-solid-svg-icons"

library.add(
  faReply,
  faShare,
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faRemoveFormat,
  faTint,
  faTintSlash,
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faTextHeight,
  faListUl,
  faListOl,
  faQuoteRight,
  faLevelDownAlt,
  faInfo
)

export default {
  components: {
    EditorContent,
  },

  props: {
    value: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      editor: null,
      helpTip: { title: "<strong>Remplacements automatiques</strong><br/><<&nbsp;&nbsp;«<br/>>>&nbsp;&nbsp;»<br/>^2&nbsp;&nbsp;²" },
    }
  },

  watch: {
    value(value) {
      const isSame = this.editor.getHTML() === value
      if (isSame) {
        return
      }
      this.editor.commands.setContent(this.value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        TextStyle,
        Color,
        Underline,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Typography,
        Blockquote.configure({
          HTMLAttributes: {
            class: "custom-blockquote",
          },
        }),
        HorizontalRule.configure({
          HTMLAttributes: {
            class: "custom-horizontal-line",
          },
        }),
        Heading.configure({
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: "custom-heading",
          },
        }),
        BulletList.configure({
          HTMLAttributes: {
            class: "custom-list",
          },
        }),
        OrderedList.configure({
          HTMLAttributes: {
            class: "custom-list",
          },
        }),
        ListItem,
      ],
      content: this.value,
      editorProps: {
        attributes: {
          class: "editor-area",
        },
        handleKeyDown(view, event) {
          event.stopPropagation()
          return
        },
      },
      onUpdate: () => {
        this.$emit("input", this.editor.getHTML())
      },
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style src="./Editor.css"></style>
