<template>
  <div id="app">
    <Typeahead filter-key="subject"
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
  // box-sizing: border-box;
  background: linear-gradient(to top right, rgb(92,184,191), darken(rgb(92,184,191), 20));
  // background-size: cover;
  min-height: 100vh;
}
</style>
