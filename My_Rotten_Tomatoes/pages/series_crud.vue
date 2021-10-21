<template>
  <div class="container-fluid">
    <div class="text-center">
      <nuxt-link to="/create_series">Create new series</nuxt-link> ||
      <nuxt-link to="/addserie">Add serie</nuxt-link> ||
      <nuxt-link to="/adminBoard">Back</nuxt-link>
    </div><br/>
    <h1>Series On the App</h1>
    <div v-if="series.length === 0">
      <h2> No series found at the moment </h2>
    </div>
    <div class="">
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Title series</th>
            <th scope="col">Description</th>
            <th scope="col">Poster Film</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="serie in series" :key="serie.id">
            <td>{{ serie.title }}</td>
            <td>{{ serie.overview }}</td>
            <td><img :src=" 'https://image.tmdb.org/t/p/w500/'+serie.poster_path" width="250" height="250"></td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px;">
                  <nuxt-link :to="{name: 'edit_series', params: {id: serie.id}}" class="btn btn-sm btn-outline-secondary">Edit serie</nuxt-link>
                  <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteserie(serie.id)">Delete serie</button>
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
      series: {},
    };
  },
  middleware: 'auth',
  created() {
    this.fetchseries();
  },
  methods: {
    fetchseries() {
      axios
        .get("http://localhost:8080/api/series")
        .then(data => (this.series = data.data));
    },
    deleteserie(id) {
      if(confirm("Are you sure to delete this serie ?")){
        axios.delete("http://localhost:8080/api/series/"+ id,)
        .then(data => {
          console.log(data);
          window.location.reload();
        });
      }
    }
  }
};
</script>
