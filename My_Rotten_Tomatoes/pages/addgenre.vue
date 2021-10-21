<template>
<div>
    <p>FILMS</p>
    <div v-for="genre in data.genres" :key='genre.id'>
        {{genre.name}}
    <button class="btn btn-success" type="submit" @click='createGenre(genre)'> Add movie </button>   
    </div><br/>
    <p>SERIES</p>
    <div v-for="genre in result.genres" :key='genre.id'>
        {{genre.name}}
    <button class="btn btn-success" type="submit" @click='createGenretv(genre)'> Add movie </button>   
    </div>       
</div>
</template>

<script>
import axios from 'axios'

export default {
name: 'movie',
    data() {
      return {
        data:[],
        result:[],
        genres:'',
        genre:'',
      }
    },
    middleware: 'auth',
    created() {
      this.fetchData()
     this.fetchData2()
    },
    methods: 
  {
      fetchData() 
      {
        axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=802804a261226c9aae420671ae01f521&language=fr')
        .then((resp) => {
          this.data = resp.data
          console.log(this.data)
                        })
      },
      
      createGenre(genre) {
      this.__submitToServer({name: genre.name});
    },
    
    __submitToServer(genre) {
      axios.post("http://localhost:8080/api/genres", genre).then(genre => {
        return genre
      });
    },

      fetchData2() 
      {
        axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=802804a261226c9aae420671ae01f521&language=fr')
        .then((resp) => {
          this.result = resp.data
          console.log(this.result)
                        })
      },
      
      createGenretv(genre) {
      this.__submitToServer({name: genre.name});
    },
    
    __submitToServer2(genre) {
      axios.post("http://localhost:8080/api/genres", genre).then(genre => {
        return genre
      });
    }
  }
}
</script>

<style>
</style>