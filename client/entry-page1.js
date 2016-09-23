/**
 * Created by acecode on 16/9/22.
 */
import Vue from 'vue';
import Page1 from './page1';

Vue.config.debug = true;
Vue.config.devtools = true;

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {
    Page1,
  },
});
