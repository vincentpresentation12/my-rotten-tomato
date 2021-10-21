<template>
  <div class="container-fluid">
    <div class="text-center">
      <nuxt-link to="/create_movies">Create new movies</nuxt-link> ||
      <nuxt-link to="/addmovie">Add movie</nuxt-link> ||
      <nuxt-link to="/adminBoard">Back</nuxt-link>
    </div><br/>
    <h1>Movies On the App</h1>
    <div v-if="movies.length === 0">
      <h2> No movies found at the moment </h2>
    </div>
    <div class="">
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Title Movies</th>
            <th scope="col">Description</th>
            <th scope="col">Poster Film</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movies" :key="movie.id">
            <td>{{ movie.title }}</td>
            <td>{{ movie.overview }}</td>
            <td><img :src=" 'https://image.tmdb.org/t/p/w500/'+movie.poster_path" width="250" height="250"></td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px;">
                  <nuxt-link :to="{name: 'edit_movies', params: {id: movie.id}}" class="btn btn-sm btn-outline-secondary">Edit movie</nuxt-link>
                  <button class="btn btn-sm btn-outline-secondary" v-on:click="deletemovie(movie.id)">Delete movie</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      movies: {},
    };
  },
  middleware: 'auth',
  created() {
    this.fetchmovies();
  },
  methods: {
    fetchmovies() {
      axios
        .get("http://localhost:8080/api/movies")
        .then(data => (this.movies = data.data));
    },
    deletemovie(id) {
      if(confirm("Are you sure to delete this movie ?")){
        axios.delete("http://localhost:8080/api/movies/"+ id,)
        .then(data => {
          console.log(data);
          window.location.reload();
        });
      }
    }
  }
};
</script>
