<template>
  <div class="app">
    <h1 class="app__title">Pick-A-Rick!</h1>
    <h3 class="app__subtitle">(or even a Morty)</h3>
    <!-- <img src="@/assets/rick-morty.png"> -->

    <Typeahead filter-key="name"
               source="https://rickandmortyapi.com/api/character/"
               placeholder="Let's get Schwifty"/>
  </div>
</template>

<script>
import Typeahead from './components/Typeahead.vue';

export default {
  name: 'app',
  components: {
    Typeahead,
  },
};
</script>

<style lang="scss">
body {
  margin: 0; padding: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background: linear-gradient(to top right, rgb(92,184,191), darken(rgb(92,184,191), 25));
  min-height: 100vh;
}

.app {
  text-align: center;
  img {
    height: 49vmin;
  }
  .app__title {
    font-family: Marker Felt, fantasy, 'Avenir', Helvetica, Arial, sans-serif;
    margin: 0px;
    font-size: 7.5vmin;
    background: -webkit-linear-gradient(rgb(255, 254, 235), darken(rgb(255, 254, 235), 25));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .app__subtitle {
    margin: 0px;
    font-size: 2vmin;
    background: -webkit-linear-gradient(rgb(255, 254, 235), darken(rgb(255, 254, 235), 25));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
