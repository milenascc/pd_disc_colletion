import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: {
    results: []
  },
  mounted(){
    this.getCollections();
  },
  methods:{
    getCollections(){
      axios.get('http://localhost:3000/api/collection').then((result) =>{
        //alert(result.data.message);  
        this.results = result.data.results;
        console.log(this.results);
      }).catch((error)=>{
        console.log(error);
      });
    }
  }
}).$mount('#app')
