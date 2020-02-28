import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        entrys: []
    },
    actions: {
        addEntry({ commit }, entry) {
            commit('addEntry', entry);
        },
        updateEnttrys({ commit }, preveousEntrys) {
            commit('updateEnttrys', preveousEntrys);
        },
        initialiseStore({ commit }) {
          commit('initialiseStore');
      }
    },
    mutations: {
       /**
         * Set the browser local store value into application store.
         * @param{state} store state
         */
      initialiseStore(state) {
			if(localStorage.getItem('store')) {
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
    },
     /**
         * Add entry into store entrys.
         * @param{object} store state
         * @param{object} new entry
         */
        addEntry (state, entry) {
            state.entrys = [...state.entrys, entry];
        },
         /**
         * Updated store entrys.
         * @param{sate} store state
         * @param{Array} updated entrys
         */
        updateEnttrys (state, preveousEntrys) {
            state.entrys = preveousEntrys;
        }  
    }
});