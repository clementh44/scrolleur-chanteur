<template>
  <div class="undo-list">
    <div v-for="(deletedElement, index) in deletedElements" :key="index" class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="progress d-flex" style="height: 4px">
        <div
          class="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          :aria-valuenow="deletedElement.width"
          :style="{ width: deletedElement.width + '%', transition: 'none' }"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div class="toast-header">
        <strong class="mr-auto">Élément supprimé</strong>
        <button @click="deleteElement(deletedElement)" type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body d-flex align-items-center">
        <div class="flex-grow-1">"{{ deletedElement.title }}"</div>
        <div>
          <button @click="restore(deletedElement)" type="button" class="btn btn-primary btn-sm">
            Restaurer
          </button>
        </div>
      </div>
    </div>
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
        title: title,
        width: 100
      }
      deletedElement.timeout = setTimeout(() => {
        this.deleteElement(deletedElement)
      }, 5000)
      deletedElement.interval = setInterval(() => {
        deletedElement.width = deletedElement.width - 0.2
      }, 10)
      this.deletedElements.push(deletedElement)
    },
    deleteElement(deletedElement) {
      clearTimeout(deletedElement.timeout)
      clearInterval(deletedElement.interval)
      this.deletedElements.splice(this.deletedElements.indexOf(deletedElement), 1)
    },
    restore(deletedElement) {
      this.deleteElement(deletedElement)
      this.$emit("restoreElement", deletedElement.element)
    }
  }
}
</script>

<style scoped>
.undo-list {
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 300px;
  z-index: 1100;
}
</style>
