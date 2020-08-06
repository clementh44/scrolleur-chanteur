import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './Routes'
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

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
