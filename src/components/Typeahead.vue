<template>
  <div class="container">
    <div class="search">
      <input type="text" class="search__input"
             ref="search"
             :placeholder="placeholder">
    </div>

    <div class="results">
      <li class="results__item"
          v-for="item in filteredItems"
          :key="item.id">
        <span>{{ item.name }}</span>
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
      query: '',
    };
  },
  mounted() {
    this.inputChange = Observable.fromEvent(this.$refs.search, 'keyup')
      .map(e => e.target.value)
      .distinctUntilChanged()
      .debounceTime(this.delayTime)
      .subscribe((obs) => {
        this.query = obs;
      });
    this.getData();
  },
  beforeDestroy() {
    this.inputChange.unsubscribe();
  },
  computed: {
    filteredItems() {
      const query = this.query;
      const key = this.filterKey;

      if (query.length >= this.numChars) {
        return this.items.filter(item => item[key].toLowerCase()
          .indexOf(query.toLowerCase()) > -1);
      }
    },
  },
  methods: {
    getData() {
      if (typeof this.source === 'string') {
        fetch(this.source)
          .then(stream => stream.json())
          .then((data) => {
            this.items = data.results;
          })
          .catch(error => console.error(error));
      } else {
        this.items = this.source;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  text-align: center;
}
</style>
