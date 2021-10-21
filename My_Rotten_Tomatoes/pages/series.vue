<template>
  <section class="section">
    <div class="container">
      <h1 class="title">My Rotten Tomatoes</h1>
    </div>
    <detailsSovie :revele="revele" :serie="serie" :toggleModale="toggleModale" ></detailsSovie>
    <nuxt-link to='/'>Home</nuxt-link>
    <div v-for='serie in data' :key="serie.id">
      <p>{{serie.title}}</p>
        <div v-on:click="toggleModale" >
          <img :src=" 'https://image.tmdb.org/t/p/w500/'+serie.poster_path" width="250" height="250" v-on:click="dataSerie(serie)"  >
        </div>
    </div>
  </section>
</template>



<script>
import axios from 'axios'
import detailsSerie from "../components/detailsSerie"
export default {
components: 
  {
    'detailsSovie': detailsSerie
  },
props: ['serie'],
name: 'movie',
    data() {
      return {
        results:[],
        data:[],
        pages_num:1,
        title:'',
        overview:'',
        poster_path:'',
        revele :false,
      }
    },
    created() {
      this.fetchData()
     //window.location.reload(true)
    },
    methods:{
      fetchData() 
      {
        axios.get('http://localhost:8080/api/series')
        .then((resp) => {
          this.data = resp.data
          console.log(this.data)
                        })
      },
      toggleModale: function() 
      {
      this.revele=!this.revele
      },
      dataSerie: function(serie) 
      {
      this.serie=serie,
      console.log(this.serie)
      }
    },
}


</script>

