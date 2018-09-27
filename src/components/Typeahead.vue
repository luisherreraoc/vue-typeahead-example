<template>
  <div class="container">
    <div class="search">
      <input type="text" class="search__input"
            ref="search">
    </div>

    <div class="results">
      <li class="results__item">
        <span></span>
      </li>

      <div class="results__nav">
        <div class="results__nav__button"></div>
        <p class="results__nav__text"></p>
        <div class="results__nav__button"></div>
      </div>

      <div class="results__control">
        <p class="results__control__mes_empty"></p>
        <p class="results__control__mes_short"></p>
        <p class="results__control__mes_not"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { Observable } from 'rxjs';

export default {
  name: 'Typeahead',
  props: {

  },
  data() {
    return {
      inputChange: null,
    };
  },
  mounted() {
    this.inputChange = Observable.fromEvent(this.$refs.search, 'keyup')
      .map(e => e.target.value)
      .distinctUntilChanged()
      .debounceTime(1000)
      .subscribe(obs => console.log('I trigger on event keyup'));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  text-align: center;
}
</style>
