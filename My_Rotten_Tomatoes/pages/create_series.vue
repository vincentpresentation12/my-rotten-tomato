<template>
   <div>
      <div class="text-center">
        <nuxt-link to="/series_crud">Back</nuxt-link>
      </div><br/>
      <div class="col-md-12 form-wrapper">
          <h2> Create Serie </h2>
          <form id="create-post-form" @submit.prevent="createserie()">
              <div class="form-group col-md-12">
                  <label for="title"> Title </label>
                  <input type="text" id="title" v-model="title" name="title" class="form-control" placeholder="Enter title">
              </div>
              <div class="form-group col-md-12">
                  <label for="title"> Description </label>
                  <input type="text" id="overview" v-model="overview" name="title" class="form-control" placeholder="Enter description">
              </div>
              <div class="form-group col-md-12">
                  <label for="title"> Poster Serie </label>
                  <input type="text" id="poster_path" v-model="poster_path" name="title" class="form-control" placeholder="Enter poster url">
              </div>
              <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-success" type="submit"> Create Serie </button>
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
      title: "",
      overview: "",
      poster_path: "",
    };
  },
  middleware: 'auth',
  methods: {
    createserie() {
      let serieData = {
        title: this.title,
        overview: this.overview,
        poster_path: this.poster_path,
      };
      this.__submitToServer(serieData);
    },
    
    __submitToServer(data) {
      axios.post("http://localhost:8080/api/series", data).then(data => {
        return data
      },
      this.$router.push('/series_crud')
      );
    }
  }
};
</script>