<template>
<div>
<nuxt-link to="/series_crud"> Back </nuxt-link><br/>
<button @click='previouspages()'>previous</button>
<button @click='nextpages()'>next</button>
<nuxt-link to='/addmovie'>film</nuxt-link><br/><br/>
  <input type='text' v-model='query' @keyup='getResult(query)'>
    <div v-for='result in results' :key='result.id'>
      <p>{{result.name}}</p>
      <p><img :src=" 'https://image.tmdb.org/t/p/w500/'+result.poster_path" width="250" height="250"></p>
      <button class="btn btn-success" type="submit" @click='createSerie(result)'> Add series </button>           
    </div>
  <div id ='serie'>
    <div v-for="tv in data.results" v-bind:key="tv.id">
      {{tv.name}}
      <p><img :src=" 'https://image.tmdb.org/t/p/w500/'+tv.poster_path" width="250" height="250"/></p> 
      <p>{{tv.overview}}</p><br>
    </div>
    <button @click='previouspages()'>previous</button>
    <button @click='nextpages()'>next</button>
  </div>
</div>
</template>

<script>
import axios from 'axios'
let pages_num=1
export default {
name: 'movie',
    data() {
      return {
        results:[],
        data:[],
        pages_num:1
      }
    },
    middleware: 'auth',
    created() {
      this.fetchData()
     //window.location.reload(true)
    },
    methods: 
{
      fetchData() 
      {
        axios.get('https://api.themoviedb.org/3/discover/tv?language=fr&api_key=802804a261226c9aae420671ae01f521&page='+pages_num)
        .then((resp) => {
          this.data = resp.data
          console.log(this.data)
                        })
      },
      nextpages()
      {
        pages_num = pages_num +=1
         axios.get('https://api.themoviedb.org/3/discover/tv?language=fr&api_key=802804a261226c9aae420671ae01f521&page='+pages_num)
        .then((resp) => {
          this.data = resp.data})  
      },
      previouspages()
      {
        pages_num = pages_num -=1
         axios.get('https://api.themoviedb.org/3/discover/tv?language=fr&api_key=802804a261226c9aae420671ae01f521&page='+pages_num)
        .then((resp) => {
          this.data = resp.data})  
      },
      getResult(query) 
      {
        axios.get('https://api.themoviedb.org/3/search/tv?include_adult=false&language=fr&api_key=802804a261226c9aae420671ae01f521&query='+query).then(response => { this.results = response.data.results })
        console.log(this.results)
      },

       createSerie(serie) {
      this.__submitToServer({title: serie.name, overview: serie.overview, poster_path: serie.poster_path, release_date: serie.first_air_date});
    },
    
    __submitToServer(serie) {
      axios.post("http://localhost:8080/api/series", serie).then(serie => {
        return serie
      });
    }
}
}
</script>

<style>
</style>