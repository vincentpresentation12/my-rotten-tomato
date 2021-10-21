<template>
  <section class="section">
    <div class="container">
      <h1 class="title">My Rotten Tomatoes</h1>
    </div>
    <detailsMovie :revele="revele" :movie="movie" :toggleModale="toggleModale" ></detailsMovie>
    <nuxt-link to='/series'>Séries</nuxt-link>
    <div v-for='movie in data' :key="movie.id">
      <p>{{movie.title}}</p>
        <div v-on:click="toggleModale" >
          <img :src=" 'https://image.tmdb.org/t/p/w500/'+movie.poster_path" width="250" height="250" v-on:click="dataMovie(movie)" >
          </div>
        <form method="post" @submit.prevent="createCommentaire">
          <input type='text' v-model='commentaire' >
          <button>ecrire un commentaire</button>
        </form>
    </div>
  </section>
</template>



<script>
import axios from 'axios'
import detailsMovie from "../components/detailsMovie"
export default {
  //parametres pour le pop-up
  components: 
  {
      'detailsMovie': detailsMovie
  },
  props: ['movie',],
  name: 'movie',
    //les données utiles
    data() {
      return {
        results:[],
        data:[],
        pages_num:1,
        title:'',
        overview:'',
        poster_path:'',
        revele :false,
        comms:'',
        commentaire:'',
      }
    },
    created() {
      this.fetchData()
    },
    methods:
    {
      fetchData() 
      {
        axios.all([
        axios.get('http://localhost:8080/api/movies'),
        axios.get('http://localhost:8080/api/commentaires')
        ])
        .then(axios.spread((object1,object2) => 
        {
          this.data = object1.data;
          this.comms = object2.data;
        }));
      },
      //les fonctions pop-up
      toggleModale: function() 
      {
      this.revele=!this.revele
      },
      dataMovie: function(movie) 
      {
      this.movie=movie,
      console.log(this.movie)
      },
      createCommentaire(commentaire)
      {
        axios.post('http://localhost:8080/api/commentaires',{title: this.commentaire})
        .then(commentaire => {return commentaire})
      },
      
    },

}


</script>
<style scoped>

</style>
