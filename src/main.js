import Rx from 'rxjs/Rx';
import VueRx from 'vue-rx';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(VueRx, Rx);

new Vue({
  render: h => h(App),
}).$mount('#app');
