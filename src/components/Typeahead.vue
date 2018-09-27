<template>
  <div class="container">
    <div class="search">
      <input type="text" class="search__input"
             ref="search"
             :placeholder="placeholder"
             @focus="showResults = true"
             @blur="toggle">
    </div>

    <div class="results"
         v-if="showResults">
      <li class="results__item"
          v-for="item in showItems"
          :key="item.id">
        <span>{{ item.name }}</span>
      </li>

      <div class="results__nav"
           v-if="filteredItems !== undefined && filteredItems.length > perPage">
        <div class="results__nav__button"></div>
        <p class="results__nav__text"></p>
        <div class="results__nav__button"></div>
      </div>

      <div class="results__control"
           :class="{ 'results__control_error' : searchLength,
                     'results__control_empty' : noSearch || noMatch }">
        <p class="results__control__mes_empty"
           v-if="noSearch">
          You have to turn the shoes on Morty!
        </p>
        <p class="results__control__mes_short"
           v-if="searchLength">
          You need {{ numChars }} characters to begin!
        </p>
        <p class="results__control__mes_not"
           v-if="noMatch">
          This must be someone from another universe
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Observable } from 'rxjs';
import store from '@/store/store';

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
      default: 2,
    },
    perPage: {
      type: Number,
      default: 4,
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
      showResults: false,
      noSearch: false,
      searchLength: false,
      noMatch: false,
      page: 1,
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
        this.hideMessages();
        return this.items.filter(item => item[key].toLowerCase()
          .indexOf(query.toLowerCase()) > -1);
      } else if (query === '') {
        this.showEmpty();
      } else if (query.length < this.numChars) {
        this.showShort();
      }
    },
    showItems() {
      const itemsToSort = this.filteredItems;

      if (itemsToSort !== undefined) {
        this.checkSearch();
        return store.methods.getArraySection(itemsToSort, this.page, this.perPage);
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
    showEmpty() {
      this.noSearch = true;
      this.searchLength = false;
      this.noMatch = false;
    },
    showShort() {
      this.noSearch = false;
      this.searchLength = true;
      this.noMatch = false;
    },
    hideMessages() {
      this.noSearch = false;
      this.searchLength = false;
      this.noMatch = false;
      this.page = 1;
    },
    checkSearch() {
      if (this.query !== '' && this.filteredItems.length === 0) {
        this.noMatch = true;
      }
    },
    toggle() {
      if (this.query === '') {
        this.showResults = false;
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
.search__input {
  width: 400px;
  padding: 15px;
  border-radius: 36px;
  font-size: 18px;
  text-align: center;
}
.results {
  list-style-type: none;
  margin: 2px auto;
  width: 48vh;
  box-shadow: 0px 2px 7px darken(rgb(204, 204, 204), 50);
  border-radius: 5px;
  .results__item {
    width: 41vh;
    padding: 20px;
    margin: auto;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid rgb(204, 204, 204);
    &:hover {
      background: linear-gradient(to bottom right, #D8D8D8, #F5F5F5);
    };
  }
  .results__nav {
    display: flex;
    justify-content: space-around;
    width: 170px;
    margin: auto;
    padding-top: 15px;
    padding-bottom: 10px;
    i {
      font-size: 20px;
    }
    .results__nav__text {
        margin: 0px;
        font-size: 12px;
    }
    .results__nav__button_disabled {
      color: #799099;
    }
  }
  .results__control {
    display: flex;
    justify-content: center;
    font-size: 18px;
    .results__control__mes_short {
      color: #BB0000;
      font-weight: 500;
    }
  }
  .results__control_error {
    background: #FFBABA;
  }
  .results__control_empty {
    background: #F5F5F5;
  }
}
</style>
