<template>
   <div>
        <h4 class="text-center mt-20">
            <small>
             <nuxt-link to="/users_crud"> View All users </nuxt-link>
            </small>
        </h4>
        <div class="col-md-12 form-wrapper">
            <h2> Edit user </h2>
            <form id="create-post-form" @submit.prevent="edituser(id)">
                <div class="form-group col-md-12">
                    <label for="title"> Username </label>
                    <input type="text" id="username" v-model="user.username" name="title" class="form-control" placeholder="Enter username">
                </div>
                <div class="form-group col-md-12">
                    <label for="title"> Email </label>
                    <input type="text" id="email" v-model="user.email" name="title" class="form-control" placeholder="Enter email">
                </div>
                <div class="form-group col-md-4 pull-right">
                    <button class="btn btn-success" type="submit"> Edit user </button>
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
      user: {},
    };
  },
  middleware: 'auth',
  created() {
    this.id = this.$route.params.id;
    this.getuser(this.id);
  },
  methods: {
    edituser(id) {
      let userData = {
        id: this.user.id,
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
      };
      axios
        .put(
          "http://localhost:8080/api/users/"+ id, userData
        )
        .then(data => {
          console.log(data)
        },
        this.$router.push('/users_crud'));
    },
    getuser(id) {
      axios
        .get("http://localhost:8080/api/users/"+ id)
        .then(data => (this.user = data.data));
    },
  }
};
</script>