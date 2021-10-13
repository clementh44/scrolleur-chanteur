import Vue from "vue"
import App from "./App.vue"
import VueRouter from "vue-router"
import Routes from "./Routes"
import VueBodyClass from "vue-body-class"
import { BootstrapVue, BootstrapVueIcons, BIconMusicNoteList, BIconPlus } from "bootstrap-vue"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import "vue-cookies"
import vueDebounce from "vue-debounce"

Vue.use(VueRouter)

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.component("BIconMusicNoteList", BIconMusicNoteList)
Vue.component("BIconPlus", BIconPlus)

Vue.use(require("vue-cookies"))

Vue.component("font-awesome-icon", FontAwesomeIcon)

Vue.use(vueDebounce)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: Routes,
  mode: "history"
})

const DEFAULT_TITLE = "Scrolleur Chanteur"
const vueBodyClass = new VueBodyClass(Routes)
router.beforeEach((to, from, next) => {
  vueBodyClass.guard(to, next)
  document.title = to.meta.title || DEFAULT_TITLE
})

new Vue({
  render: (h) => h(App),
  router
}).$mount("#app")
