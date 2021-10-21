<template>
<div>
<nuxt-link to="/movies_crud"> Back </nuxt-link><br/>
<button @click='previouspages()'>previous</button>
<button @click='nextpages()'>next</button>
<nuxt-link to='/addserie'>series</nuxt-link><br/><br/>
    <input type='text' v-model='query' @keyup='getResult(query)'>
      <div v-for='result in results' :key='result'>
        {{result.title}}
        <img :src=" 'https://image.tmdb.org/t/p/w500/'+result.poster_path" width="250" height="250">
        <button class="btn btn-success" type="submit" @click='createMovie(result)'> Add movie </button>           
      </div>
      <div v-for="movie in data.results" v-bind:key="movie.id">
        {{movie.title}}
        <p><img :src="'https://image.tmdb.org/t/p/w500/'+movie.poster_path" width="250" height="250"></p> 
        <p>{{movie.overview}}</p><br>
      </div>
<button @click='previouspages()'>previous</button>
<button @click='nextpages()'>next</button>
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
        pages_num:1,
        title:'',
        overview:'',
        poster_path:'',
        release_date:'',
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
        axios.get('https://api.themoviedb.org/3/discover/movie?include_adult=false&language=fr&api_key=802804a261226c9aae420671ae01f521&page='+pages_num)
        .then((resp) => {
          this.data = resp.data
          console.log(this.data)
                        })
      },
      nextpages()
      {
        pages_num = pages_num +=1
         axios.get('https://api.themoviedb.org/3/discover/movie?language=fr&api_key=802804a261226c9aae420671ae01f521&page='+pages_num)
        .then((resp) => {
          this.data = resp.data})  
      },
      previouspages()
      {
        pages_num = pages_num -=1
         axios.get('https://api.themoviedb.org/3/discover/movie?language=fr&api_key=802804a261226c9aae420671ae01f521&page='+pages_num)
        .then((resp) => {
          this.data = resp.data})  
      },
      getResult(query) 
      {
        axios.get('https://api.themoviedb.org/3/search/movie?include_adult=false&language=fr&api_key=802804a261226c9aae420671ae01f521&query='+query).then(response => { this.results = response.data.results })
      },
      
      createMovie(movie) {
      this.__submitToServer({title: movie.title, overview: movie.overview, poster_path: movie.poster_path, release_date: movie.release_date});
    },
    
    __submitToServer(movie) {
      axios.post("http://localhost:8080/api/movies", movie).then(movie => {
        return movie
      });
    }
  }
}
</script>

<style>
</style>