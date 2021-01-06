<template>
  <div class="col-12 col-lg-6">
    <div class="card sticky-top mb-3">
      <h3 class="card-header d-flex justify-content-between">
        {{ header }}
        <a href="#" class="pull-right" @click="close"
          ><font-awesome-icon :icon="'times'"></font-awesome-icon
        ></a>
      </h3>
      <div class="card-body overflow-auto" style="height: 90vh;">
        <slot name="content"></slot>
      </div>
    </div>
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
    close() {
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
