<template>
  <div class="hello">
    <div class="navigation-btns">
      <button id="editButton" v-on:click="isEdit = !isEdit">Editar</button>
      <button v-on:click="deleteDisc">Excluir</button>
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
    <div class="form-update" v-if="isEdit">
      <h5>Nome do disco:</h5>
      <input id="name" type="text" maxlength="100"/>
      <h5>Faixas do disco:</h5>
      <input id="tracks" type="text" maxlength="100"/>
      <h5>Detalhes:</h5>
      <input id="info" type="text" maxlength="100"/>
      <h5>Link de imagem da capa:</h5>
      <input id="imgUrl" type="text" maxlength="300"/>
      <select id="collectionId">
        <option disabled selected></option>
        <option v-for="col in collections" v-bind:key="col.id" v-bind:value="col.id">{{col.name}}</option>
      </select>
      <button v-on:click="updateDisc">Salvar</button>
    </div>
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
      collections: [],
      isEdit: false,
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
      });
      axios.get('http://localhost:3000/api/collection').then(result=>{
        this.collections = JSON.parse(JSON.stringify(result.data.results));
      }).catch(error=>{
        alert("Não foi possível obter as coleções!");
        console.log(error);
      });
    },
    updateDisc: function(){
      const name = document.getElementById("name").value;
      const tracks = document.getElementById("tracks").value;
      const info = document.getElementById("info".value);
      const imgUrl = document.getElementById("imgUrl").value;
      const collectionId = document.getElementById('collectionId').options[document.getElementById('collectionId').selectedIndex].value;

      let obj = {};
      if(name) obj.name = name;
      if(tracks) obj.tracks = tracks;
      if(info) obj.info = info;
      if(imgUrl) obj.imgUrl = imgUrl;
      if(collectionId) obj.fk_collection_Id = collectionId;

      axios.put('http://localhost:3000/api/disc/'+this.id,obj).then(result=>{
        alert(result.data.message);
        this.getDiscInfo();
      }).catch(error=>{
        console.log(error);
        alert("Edição não realizada!");
      });
    },
    deleteDisc(){
      axios.delete('http://localhost:3000/api/disc/'+this.id).then(result=>{
        alert(result.data.message);
        this.$router.push('/');
      }).catch(error=>{
        console.log(error);

      });
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
