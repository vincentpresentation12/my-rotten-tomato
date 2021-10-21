<template>
   <div>
        <h4 class="text-center mt-20">
            <small>
             <nuxt-link to="/movies_crud"> View All movies </nuxt-link>
            </small>
        </h4>
        <div class="col-md-12 form-wrapper">
            <h2> Edit movie </h2>
            <form id="create-post-form" @submit.prevent="editmovie(id)">
                <div class="form-group col-md-12">
                    <label for="title"> Title </label>
                    <input type="text" id="title" v-model="movie.title" name="title" class="form-control" placeholder="Enter title">
                </div>
                <div class="form-group col-md-12">
                    <label for="title"> Description </label>
                    <textarea type="text" id="overview" v-model="movie.overview" name="title" class="form-control" placeholder="Enter description"></textarea>
                </div>
                <div class="form-group col-md-12">
                    <label for="title"> Poster Film </label><br/>
                    <img :src=" 'https://image.tmdb.org/t/p/w500/'+movie.poster_path" width="250" height="250">
                </div>
                <div class="form-group col-md-4 pull-right">
                    <button class="btn btn-success" type="submit"> Edit movie </button>
                </div>           
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: 0,
      movie: {},
    };
  },
  middleware: 'auth',
  created() {
    this.id = this.$route.params.id;
    this.getmovie(this.id);
  },
  methods: {
    editmovie(id) {
      let movieData = {
        id: this.movie.id,
        title: this.movie.title,
        overview: this.movie.overview,
        poster_path: this.movie. poster_path,
      };
      axios
        .put(
          "http://localhost:8080/api/movies/"+ id, movieData
        )
        .then(data => {
          console.log(data)
        },
        this.$router.push('/movies_crud'));
    },
    getmovie(id) {
      axios
        .get("http://localhost:8080/api/movies/"+ id)
        .then(data => (this.movie = data.data));
    },
  }
};
</script>