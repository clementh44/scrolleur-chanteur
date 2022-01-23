<template>
  <div class="col-12 col-lg-6">
    <b-card class="sticky-top mb-3" no-body>
      <b-card-header class="d-flex justify-content-between" header-tag="h3">
        {{ header }}
        <a href="#" class="pull-right" @click="close"><font-awesome-icon :icon="'times'"></font-awesome-icon></a>
      </b-card-header>
      <b-card-body class="overflow-auto" style="height: 90vh">
        <slot name="content"></slot>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

library.add(faTimes)

export default {
  name: "SideBox",
  props: {
    header: String,
  },
  methods: {
    close: function () {
      this.$emit("close")
    },
  },
  created() {
    window.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        this.close()
      }
    })
  },
}
</script>
