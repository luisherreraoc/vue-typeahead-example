<template>
  <div id="app">
    <Typeahead />
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
