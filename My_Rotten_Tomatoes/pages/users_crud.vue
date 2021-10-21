<template>
  <div class="container-fluid">
    <div class="text-center">
      <nuxt-link to="/create_users">Create new user</nuxt-link> ||
      <nuxt-link to="/adminBoard">Back</nuxt-link>
    </div><br/>
    <h1>Users On the App</h1>
    <div v-if="users.length === 0">
      <h2> No user found at the moment </h2>
    </div>
    <div class="">
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Created at</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.createdAt }}</td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px;">
                  <nuxt-link :to="{name: 'edit_users', params: {id: user.id}}" class="btn btn-sm btn-outline-secondary">Edit user</nuxt-link>
                  <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteuser(user.id)">Delete user</button>
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
      users: {},
    };
  },
  middleware: 'auth',
  created() {
    this.fetchusers();
  },
  methods: {
    fetchusers() {
      axios
        .get("http://localhost:8080/api/users")
        .then(data => (this.users = data.data));
    },
    deleteuser(id) {
      if(confirm("Are you sure to delete this user ?")){
        axios.delete("http://localhost:8080/api/users/"+ id,)
        .then(data => {
          console.log(data);
          window.location.reload();
        });
      }
    }
  }
};
</script>
