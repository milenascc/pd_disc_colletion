import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Disc from './components/Disc'
import Collection from './components/Collection'
import CollectionList from './components/CollectionList'

Vue.config.productionTip = false
Vue.use(VueRouter);

//rotas para telas de detalhamento de coleção e de discos, e para a tela inicial
const routes = [
  { path: '/disc/:id',name: 'disc', component: Disc, props: true },
  { path: '/collection/:id', name: 'collection', component: Collection, props: true },
  { path: '/', component: CollectionList },
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
