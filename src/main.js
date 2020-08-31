import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './Routes'
import VueBodyClass from 'vue-body-class'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(VueRouter)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

const vueBodyClass = new VueBodyClass(Routes);
router.beforeEach((to, from, next) => { vueBodyClass.guard(to, next) });

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
