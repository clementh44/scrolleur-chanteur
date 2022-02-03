import Vue from "vue"
import App from "./App.vue"
import VueRouter from "vue-router"
import Routes from "./Routes"
import VueBodyClass from "vue-body-class"
import { BootstrapVue, BIcon, BIconstack, BIconMusicNoteList, BIconPlus } from "bootstrap-vue"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "./fa.config"
import "vue-cookies"
import vueDebounce from "vue-debounce"
import VueGtag from "vue-gtag"

Vue.use(VueRouter)

Vue.use(BootstrapVue)
Vue.component("BIcon", BIcon)
Vue.component("BIconstack", BIconstack)
Vue.component("BIconMusicNoteList", BIconMusicNoteList)
Vue.component("BIconPlus", BIconPlus)

Vue.use(require("vue-cookies"))

Vue.use(vueDebounce)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: Routes,
  mode: "history",
})

Vue.use(VueGtag, { config: { id: "G-JCLGZK4V9Y" } }, router)

const DEFAULT_TITLE = "Scrolleur Chanteur"
const vueBodyClass = new VueBodyClass(Routes)
router.beforeEach((to, from, next) => {
  vueBodyClass.guard(to, next)
  document.title = to.meta.title || DEFAULT_TITLE
})

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app")
