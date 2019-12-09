<template>
  <div class="hello">
    <table>
      <thead>
        <tr>
          <th>Nome do disco</th>
          <th>Faixas</th>
          <th>Sobre o disco</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{disc.name}}</td>
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
      disc: {}
    }
  },
  async mounted(){
    await this.getDiscInfo();
  },
  methods:{
    getDiscInfo: async function(){
      axios.get('http://localhost:3000/api/disc/'+this.id).then(result=>{
        this.disc = JSON.parse(JSON.stringify(result.data.results[0]));
        console.log(this.disc);
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
