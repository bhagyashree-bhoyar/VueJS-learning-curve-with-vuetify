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
        }
    },
    mutations: {
        initialiseStore(state) {
			if(localStorage.getItem('store')) {
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
		},
        addEntry (state, entry) {
            state.entrys = [...state.entrys, entry];
        },
        updateEnttrys (state, preveousEntrys) {
            state.entrys = preveousEntrys;
        }  
    }
});