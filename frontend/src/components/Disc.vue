<template>
  <div class="hello">
    <div class="navigation-btns">
      <button id="editButton">Editar</button>
      <button>Excluir</button>
    </div>
    <h3>{{disc.name}}</h3>
    <div v-if="disc.imgUrl">
      <img v-bind:src="disc.imgUrl" />
    </div>
    <table>
      <thead>
        <tr>
          <th>Faixas</th>
          <th>Sobre o disco</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{disc.tracks}}</td>
          <td>{{disc.info}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Disc',
  props: {
    id: String
  },
  data: function(){
    return {
      disc: {},
      name: '',
      tracks: '' 
    }
  },
  async mounted(){
    await this.getDiscInfo();
  },
  methods:{
    getDiscInfo: async function(){
      axios.get('http://localhost:3000/api/disc/'+this.id).then(result=>{
        this.disc = JSON.parse(JSON.stringify(result.data.results[0]));
      }).catch(error=>{
        console.log(error);
        alert("Não foi possível obter os dados do disco!");
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
