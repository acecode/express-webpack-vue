/**
 * Created by acecode on 16/9/22.
 */
import Vue from 'vue';
import Page2 from './page2';

Vue.config.debug = true;
Vue.config.devtools = true;

/* eslint-disable no-new */
new Vue({
  el: 'body',
  template: '<Page2/>',
  replace: false,
  components: {
    Page2,
  },
});
