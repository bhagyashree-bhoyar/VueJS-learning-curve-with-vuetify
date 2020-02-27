import Vue from 'vue'
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import { store } from './store/store';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  store: store,
  beforeCreate() {
		this.$store.commit('initialiseStore');
	},
  template: '<App/>',
  components: { App }
});