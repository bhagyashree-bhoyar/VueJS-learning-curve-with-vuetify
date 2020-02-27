<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list flat>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <router-link :to="item.route" title="List" class="list-item">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{item.text}}
                </v-list-item-title>
              </v-list-item-content>
            </router-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>  
    </v-navigation-drawer>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      >
      </v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer
      app
      color="blue lighten-3"
      height="40px"
    >
    </v-footer>
  </v-app>
</template>

<script>
  import { store } from './store/store';

  export default {
    name: 'App',

    data: () => ({
      drawer: null,
      items: [
        { text: 'List', icon: 'mdi-view-list', route: '/list' },
        { text: 'Add', icon: 'mdi-account-plus', route: '/add' },
        { text: 'Update', icon: 'mdi-update', route: '/update' },
      ],
  }),
  };
store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
});

</script>

<style scoped>

  .list-item {
    display: flex;
    text-decoration: none;
    width: 100%
  }

</style>
