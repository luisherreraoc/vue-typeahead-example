<template>
  <div id="app">
    <Typeahead msg="Welcome to Your Vue.js App"/>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
