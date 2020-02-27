<template>
  <v-card >
    <v-list flat  id="entry-list">
      <v-subheader class="sub-header">List</v-subheader>
      <v-list-item-group
        v-model="item"
        color="primary"
        class="list"
      >
        <v-list-item
          class="list-item"
          v-for="entry in entrys" :key="entry"
        >
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Name: {{ entry.name }},  Email: {{ entry.email }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>

  export default {
    name: 'List',
    data: () => ({
    }),
    computed: {
      entrys(){
        return this.$store.state.entrys
      },
    }
  }

</script>

<style scoped>
  #entry-list {
    background: #e8e0b4;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    padding: 15px 25px;
  }
  .list {
    padding: 0;
  }
  .list-item {
    margin-right: 10px;
    margin-top: 10px;
    padding: 10px;
    background: rgba(255,255,255,0.7);
  }
  .sub-header {
    font-size: 25px;
    padding: 0;
  }

</style>