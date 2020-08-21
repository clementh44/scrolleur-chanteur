<template>
<transition name="side-box-fade">
    <div class="side-box p-4">
        <div class="pb-3 d-flex justify-content-between side-box-header">
            <h3 class="m-0">{{ header }}</h3>
            <button class="btn btn-sm btn-light" @click="close">
                <font-awesome-icon :icon="'times'"/>
            </button>
        </div>
        <div class="side-box-content">
            <slot name="content"></slot>
        </div>
    </div>
<!-- <div class="side-box-overlay" @click="close"></div> -->
</transition>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faTimes)

export default {
    name: "SideBox",
    props: {
        header: String
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
}
</script>

<style scoped src="./SideBox.css">

</style>