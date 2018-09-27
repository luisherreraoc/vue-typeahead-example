<template>
  <div class="container">
    <div class="search">
      <input type="text" class="search__input"
             ref="search"
             :placeholder="placeholder">
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
    source: {
      type: [Array, String],
      required: true,
    },
    filterKey: {
      type: String,
      required: true,
    },
    numChars: {
      type: Number,
      default: 4,
    },
    perPage: {
      type: Number,
      default: 5,
    },
    placeholder: {
      type: String,
      default: '',
    },
    delayTime: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      inputChange: null,
      items: [],
    };
  },
  mounted() {
    this.inputChange = Observable.fromEvent(this.$refs.search, 'keyup')
      .map(e => e.target.value)
      .distinctUntilChanged()
      .debounceTime(this.delayTime)
      .subscribe(obs => console.log('I trigger on event keyup'));
  },
  beforeDestroy() {
    this.inputChange.unsubscribe();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  text-align: center;
}
</style>
