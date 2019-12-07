import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Disc from './components/Disc'

Vue.config.productionTip = false

//rotas para telas de detalhamento de coleção e de discos, e para a tela inicial
const routes = [
  { path: '/disc/:id', component: Disc },
  { path: '/collection/discs/:id', component: Disc },
  { path: '/', component: App }
]

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
