<template>
   <div>
        <h4 class="text-center mt-20">
            <small>
             <nuxt-link to="/series_crud"> View All series </nuxt-link>
            </small>
        </h4>
        <div class="col-md-12 form-wrapper">
            <h2> Edit serie </h2>
            <form id="create-post-form" @submit.prevent="editserie(id)">
                <div class="form-group col-md-12">
                    <label for="title"> Title </label>
                    <input type="text" id="title" v-model="serie.title" name="title" class="form-control" placeholder="Enter title">
                </div>
                <div class="form-group col-md-12">
                    <label for="title"> Description </label>
                    <textarea type="text" id="overview" v-model="serie.overview" name="title" class="form-control" placeholder="Enter description"></textarea>
                </div>
                <div class="form-group col-md-12">
                    <label for="title"> Poster Film </label><br/>
                    <img :src=" 'https://image.tmdb.org/t/p/w500/'+ serie.poster_path" width="250" height="250">
                </div>
                <div class="form-group col-md-4 pull-right">
                    <button class="btn btn-success" type="submit"> Edit serie </button>
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
      serie: {},
    };
  },
  middleware: 'auth',
  created() {
    this.id = this.$route.params.id;
    this.getserie(this.id);
  },
  methods: {
    editserie(id) {
      let serieData = {
        id: this.serie.id,
        title: this.serie.title,
        overview: this.serie.overview,
        poster_path: this.serie. poster_path,
      };
      axios
        .put(
          "http://localhost:8080/api/series/"+ id, serieData
        )
        .then(data => {
          console.log(data)
        },
        this.$router.push('/series_crud'));
    },
    getserie(id) {
      axios
        .get("http://localhost:8080/api/series/"+ id)
        .then(data => (this.serie = data.data));
    },
  }
};
</script>