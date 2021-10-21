<template>
   <div>
     <div class="text-center">
        <nuxt-link to="/users_crud">Back</nuxt-link>
      </div><br/>
        <div class="col-md-12 form-wrapper">
            <h2> Create User </h2>
            <form id="create-post-form" @submit.prevent="createCustomer()">
                <div class="form-group col-md-12">
                    <label for="title"> Username </label>
                    <input type="text" id="username" v-model="username" name="title" class="form-control" placeholder="Enter username">
                </div>
                <div class="form-group col-md-12">
                    <label for="title"> Email </label>
                    <input type="text" id="email" v-model="email" name="title" class="form-control" placeholder="Enter email">
                </div>
                <div class="form-group col-md-12">
                    <label for="title"> Password </label>
                    <input type="password" id="password" v-model="password" name="title" class="form-control" placeholder="Enter password">
                </div>
                <div class="form-group col-md-4 pull-right">
                    <button class="btn btn-success" type="submit"> Create User </button>
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
      username: "",
      email: "",
      password: "",
    };
  },
  middleware: 'auth',
  methods: {
    createCustomer() {
      let customerData = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      this.__submitToServer(customerData);
    },
    
    __submitToServer(data) {
      axios.post("http://localhost:8080/api/auth/signup", data).then(data => {
        return data
      },
      this.$router.push('/users_crud')
      );
    }
  }
};
</script>