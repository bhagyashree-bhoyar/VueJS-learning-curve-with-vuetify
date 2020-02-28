import Vue from 'vue'
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import { store } from './store/store';

import './assets/style.css';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  store: store,
  /**
    * 'initialiseStore' action will call
    */
  beforeCreate() {
		this.$store.dispatch('initialiseStore');
	},
  template: '<App/>',
  components: { App }
});