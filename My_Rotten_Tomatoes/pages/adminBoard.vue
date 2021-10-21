<template>
    <div>
        <nuxt-link class="navbar-item" to="/users_crud">Crud users</nuxt-link>
        <nuxt-link class="navbar-item" to="/series_crud">Crud series</nuxt-link>
        <nuxt-link class="navbar-item" to="/movies_crud">Crud movies</nuxt-link> 
    </div>
</template>

<script>
export default {
  middleware: 'auth',
};
</script>