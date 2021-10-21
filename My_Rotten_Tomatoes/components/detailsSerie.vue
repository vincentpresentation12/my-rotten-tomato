<template>
    <div class="bloc-modale" v-if="revele">

        <div class="overlay" v-on:click="toggleModale"></div>

        <div class="modale card">
            <div class="btn-modale btn btn-danger" v-on:click="toggleModale">X</div>
            <h1>{{serie.title}}</h1>
            <img :src="'https://image.tmdb.org/t/p/w500/'+serie.poster_path" width="150px" height="150px" />
            <br />
            <h2>Résumer</h2>
            {{ serie.overview}}
            <br/>
            <h3>Date de création</h3>
            {{serie.release_date}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'detailSerie',
        props: ['revele', 'toggleModale', 'serie']
    }
</script>
<style scoped>
.bloc-modale{
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.overlay {
    background: rgba(0,0,0,0.7);
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
}
.modale {
    background: #f1f1f1;
    color:#333;
    padding: 50px;
    position: fixed;
}
.btn-modale {
    position: absolute;
    top: 10px;
    left: 10px;
}
</style>