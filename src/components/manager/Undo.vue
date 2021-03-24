<template>
  <div>
    <b-toast v-for="(deletedElement, index) in deletedElements" :key="index" :visible="true" @hidden="deleteElement(deletedElement)" title="Élément supprimé">
      <div class="d-flex align-items-center">
        <div class="flex-grow-1">"{{ deletedElement.title }}"</div>
        <b-button @click="restore(deletedElement)" size="sm" variant="primary">Restaurer</b-button>
      </div>
    </b-toast>
  </div>
</template>

<script>
export default {
  name: "Undo",
  data: function() {
    return {
      deletedElements: []
    }
  },
  methods: {
    addElement(element, title) {
      var deletedElement = {
        element: element,
        title: title
      }
      this.deletedElements.push(deletedElement)
    },
    deleteElement(deletedElement) {
      this.deletedElements.splice(this.deletedElements.indexOf(deletedElement), 1)
    },
    restore(deletedElement) {
      this.deleteElement(deletedElement)
      this.$emit("restoreElement", deletedElement.element)
    }
  }
}
</script>

<style></style>
